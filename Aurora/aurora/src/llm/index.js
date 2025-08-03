// chat 聊天
const DEEPSEEK_CHAT_API_URL = 'https://api.deepseek.com/chat/completions'
const KIMI_CHAT_API_URL = 'https://api.moonshot.cn/v1/chat/completions'

export const chat = async (
    messages, // {role,content}
    api_url = DEEPSEEK_CHAT_API_URL,
    api_key = import.meta.env.VITE_DEEPSEEK_API_KEY,
    model = 'deepseek-chat'
) => {
    try {
        const res = await fetch(api_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${api_key}`
            },
            body: JSON.stringify({
                model,
                messages,
                stream: false,
            })
        })
        const data = await res.json()
        return {
            code: 0,
            data: {
                role: 'assistant',
                content: data.choices[0].message.content
            }
        }
    } catch (err) {
        return {
            code: 0,
            msg: '出错了...'
        }
    }
}

export const kimiChat = async (messages) => {
    const res = await chat(
        messages,
        KIMI_CHAT_API_URL,
        import.meta.env.VITE_KIMI_API_KEY,
        'moonshot-v1-auto'
    )
    return res
}

export const generateAvatar = async (text) => {
    // 设计prompt
    const prompt = `
    你是一个专业的头像描述大师，
    你的任务是根据用户的描述创造一个头像的描述。
    一个基于名字${text.nickname}和签名${text.slogan}设计的水墨头像，
    风格：中国风白描，配色：墨黑+朱砂红。   
    整体要求：留白意境，避免写实人脸。
    返回你对这张图片的描述即可
    `
    const res = await chat([{
        role: 'user',
        content: prompt
    }])
    // 根据掘金学到的ds生成图片方法再次进行调用
    const prompt2 = `
    你将作为一个AI图片生成的提示词润色大师，
    根据图片的内容描述，你需要充分发挥你的想象力去描绘图片的细节并转换为英文填充到下面的url占位符中：
    https://image.pollinations.ai/prompt/{description}?width={width}&height={height}&nologo=true
    - {description} = {sceneDetailed}、{adjective1}、{charactersDetailed}、{adjective2}、{visualStyle1}、{visualStyle2}、{visualStyle3}、{genre}、{artistReference}
    - 确保URL中的提示已编码，不要将生成的Markdown内容用引号括起来，也不要将其放在代码框中
    图片的内容描述：${res.data.content}
    `
    const res2 = await chat([{
        role: 'user',
        content: prompt2
    }])
    return res2.data.content
}
