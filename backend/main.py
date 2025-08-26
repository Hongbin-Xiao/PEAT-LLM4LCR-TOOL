from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
import os
import re
from methods.auto_check_contract import check_contract
from openai import OpenAI
from typing import List, Optional

app = FastAPI()

# 允许前端跨域访问
app.add_middleware(
       CORSMiddleware,
       allow_origins=["*"],
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
)

encodings = ['utf-8', 'gbk', 'gb2312', 'latin-1']

def parse_review_file(file_path):
    """解析审核文件，提取审核条款"""
    # 尝试不同的编码方式读取文件
    content = None
    
    for encoding in encodings:
        try:
            with open(file_path, 'r', encoding=encoding) as f:
                content = f.read()
                break
        except UnicodeDecodeError:
            continue
    
    if content is None:
        return []
    
    # 处理\n未换行问题
    content=content.replace('\\n','\n')

    # 使用正则表达式分割审核条款
    # 匹配模式：审核条款编号:####数字####
    sections = re.split(r'审核条款编号:####\d+####', content)
    
    review_items = []
    for section in sections[1:]:  # 跳过第一个空元素
        if not section.strip():
            continue
            
        # 提取审核目标 - 使用更灵活的正则表达式
        target_match = re.search(r'审核目标[：:]\s*(.*?)(?=\n|$)', section, re.DOTALL)
        target = target_match.group(1).strip() if target_match else ""
        
        # 提取建议 - 改进的提取逻辑
        # 找到"建议："后面的所有内容，直到下一个审核条款编号或文件结束
        suggestion_start = re.search(r'建议[：:]\s*', section)
        if suggestion_start:
            # 从"建议："开始，获取到下一个审核条款编号之前的所有内容
            start_pos = suggestion_start.end()
            # 查找下一个审核条款编号的位置
            next_section_match = re.search(r'\n\n审核条款编号', section[start_pos:])
            if next_section_match:
                end_pos = start_pos + next_section_match.start()
            else:
                end_pos = len(section)
            
            suggestion = section[start_pos:end_pos].strip()
        else:
            suggestion = ""
        
        # 如果建议包含NO或N/A，跳过这个条款
        if suggestion and ("NO" in suggestion.upper() or "N/A" in suggestion.upper()):
            continue
            
        # 如果建议为空，也跳过
        if not suggestion:
            continue
            
        # 如果审核目标为空，也跳过
        if not target:
            continue
        
        # 处理建议文本格式：保留换行符，删除多余的空行
        # 将连续的多个换行符替换为单个换行符
        suggestion = re.sub(r'\n\s*\n\s*\n+', '\n\n', suggestion)
        # 删除开头和结尾的空白字符
        suggestion = suggestion.strip()
        
        # 解析建议内容中的三个子字段
        description = ""
        original_text = ""
        final_suggestion = ""
        
        # 检查是否包含三个子字段
        if "存在问题：" in suggestion and "问题所在原文：" in suggestion and "修改建议：" in suggestion:
            # 提取"存在问题："
            problem_match = re.search(r'存在问题[：:]\s*(.*?)(?=\n问题所在原文|$)', suggestion, re.DOTALL)
            description = problem_match.group(1).strip() if problem_match else ""
            
            # 提取"问题所在原文："
            original_match = re.search(r'问题所在原文[：:]\s*(.*?)(?=\n修改建议|$)', suggestion, re.DOTALL)
            original_text = original_match.group(1).strip() if original_match else ""
            
            # 提取"修改建议：" - 修改正则表达式以匹配到下一个审核条款编号或文件结尾
            suggestion_match = re.search(r'修改建议[：:]\s*(.*?)(?=\n审核条款编号|$)', suggestion, re.DOTALL)
            final_suggestion = suggestion_match.group(1).strip() if suggestion_match else ""
        else:
            # 如果不包含三个子字段，直接将内容放到suggestion
            final_suggestion = suggestion
            description = ""
            original_text = ""
        
        review_items.append({
            "target": target,
            "description": description,
            "original_text": original_text,
            "suggestion": final_suggestion
        })
    
    return review_items

@app.post('/contractReview')
async def contractReview(file:UploadFile = File(...)):
    # 读取文件内容
    file_content = await file.read()
    
    # 尝试不同的编码方式解码文件内容
    file_text = None
    for encoding in encodings:
        try:
            file_text = file_content.decode(encoding)
            break
        except UnicodeDecodeError:
            continue
    
    if file_text is None:
        # 如果所有编码都失败，使用utf-8并忽略错误
        file_text = file_content.decode('utf-8', errors='ignore')
    
    # 进行文件文本审查
    check_contract(file_text,'qwen-turbo')

    
    # 定义4个文件路径（使用绝对路径）
    file_paths = [
        os.path.join(os.path.dirname(__file__),'审核建议.txt'), 
        os.path.join(os.path.dirname(__file__), '辅助审核款项.txt'),
        os.path.join(os.path.dirname(__file__), '知识产权审核建议.txt'),
        os.path.join(os.path.dirname(__file__), '审核分项建议.txt'),
    ]
    
    # 处理4个文件
    all_review_items = []
    current_id = 1
    
    for file_path in file_paths:
        if os.path.exists(file_path):
            file_items = parse_review_file(file_path)
            file_review_items = []
            
            for item in file_items:
                file_review_items.append({
                    "id": str(current_id),
                    "type": "warning",
                    "title": item["target"],
                    "description": item["description"],
                    "original_text": item["original_text"],
                    "suggestion": item["suggestion"]
                })
                current_id += 1
            
            all_review_items.append(file_review_items)
        else:
            # 如果文件不存在，添加空数组
            all_review_items.append([])
    
    return {
        "fileText": file_text,
        "reviewItems": all_review_items
    }


# 请求模型
class TemplateRequest(BaseModel):
    filePath: str

class DownloadRequest(BaseModel):
    filePath: str
    fileName: str

class ReviewResult(BaseModel):
    title: str
    description: str
    original_text: str
    suggestion: Optional[str] = None

class AIChatRequest(BaseModel):
    userQuestion: str
    originalText: str
    reviewResults: List[ReviewResult]

# 模板预览接口
@app.post('/previewTemplate')
async def preview_template(request: TemplateRequest):
    try:
        # 构建完整的文件路径
        file_path = os.path.join(os.path.dirname(__file__), request.filePath.lstrip('/'))
        
        # 检查文件是否存在
        if not os.path.exists(file_path):
            raise HTTPException(status_code=404, detail="模板文件不存在")
        
        # 读取文件内容
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 将内容转换为HTML格式（简单的格式转换）
        html_content = content.replace('\n', '<br>').replace(' ', '&nbsp;')
        
        return {"content": html_content}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"预览失败: {str(e)}")

# 模板下载接口
@app.post('/downloadTemplate')
async def download_template(request: DownloadRequest):
    try:
        # 构建完整的文件路径
        file_path = os.path.join(os.path.dirname(__file__), request.filePath.lstrip('/'))
        
        # 检查文件是否存在
        if not os.path.exists(file_path):
            raise HTTPException(status_code=404, detail="模板文件不存在")
        
        # 返回文件
        return FileResponse(
            path=file_path,
            filename=request.fileName,
            media_type='text/plain'
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"下载失败: {str(e)}")

# AI对话接口
@app.post('/aiChat')
async def ai_chat(request: AIChatRequest):
    try:
        # 初始化OpenAI客户端，使用通义千问API
        api_key = ''
        client = OpenAI(api_key)
        client.base_url = 'https://dashscope.aliyuncs.com/compatible-mode/v1'
        
        # 构建审查结果概览
        review_summary = []
        for i, result in enumerate(request.reviewResults):
            if result.description:
                review_summary.append(f"{i+1}. {result.title}: {result.description}")
            else:
                review_summary.append(f"{i+1}. {result.title}")
        
        # 构建完整的提示词
        prompt = f"""
你是一个专业的合同审查AI助手。请基于以下信息回答用户的问题：

合同原文：
{request.originalText}

审查结果概览：
{chr(10).join(review_summary)}

用户问题：{request.userQuestion}

请作为合同审查助手，基于以上信息专业、准确地回答用户的问题。回答要简洁明了，突出重点。
        """.strip()
        
        # 调用通义千问API
        completion = client.chat.completions.create(
            model='qwen-turbo',
            messages=[{"role": "user", "content": prompt}]
        )
        
        # 获取AI回复
        ai_response = completion.choices[0].message.content
        
        return {"response": ai_response}
        
    except Exception as e:
        print(f"AI对话错误: {str(e)}")
        raise HTTPException(status_code=500, detail=f"AI对话失败: {str(e)}")

if __name__ == '__main__':
    file_paths = [
        os.path.join(os.path.dirname(__file__),'审核建议.txt'), 
        os.path.join(os.path.dirname(__file__), '辅助审核款项.txt'),
        os.path.join(os.path.dirname(__file__), '知识产权审核建议.txt'),
        os.path.join(os.path.dirname(__file__), '审核分项建议.txt'),
    ]
    print(file_paths)

'''

'''