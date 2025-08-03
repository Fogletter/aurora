import styles from './smartaudio.module.css'
import {
    useRef,
    useState
} from 'react'

const SmartAudio = () => {
    const uploadUrl = 'https://api.coze.cn/v1/files/upload';
    const workflowUrl = 'https://api.coze.cn/v1/workflow/run';
    const workflow_id = '7533922894758871092';
    const patToken = import.meta.env.VITE_PAT_TOKEN;

    const uploadImageRef = useRef(null)
    const [imgPreview, setImgPreview] = useState('https://res.bearbobo.com/resource/upload/W44yyxvl/upload-ih56twxirei.png');
    const [style, setStyle] = useState('写实');
    const [star, setStar] = useState('周杰伦');
    const [audioUrl, setAudioUrl] = useState('');
    const [status, setStatus] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const updateImageData = () => {
        const input = uploadImageRef.current;
        // console.log(uploadImageRef.current)
        if (!input.files || input.files.length === 0) { return; }
        const file = input.files[0];
        // console.log(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            // base64格式图片
            setImgPreview(e.target?.result)
            // imgPreview.value = e.target?.result as string; 
        };
    }
    const generate = async () => {
        if (isGenerating) return; // 如果正在生成，直接返回
        
        setIsGenerating(true);
        setStatus("图片上传中...");
        
        try {
            const file_id = await uploadFile();
            if (!file_id) {
                setIsGenerating(false);
                return;
            }
            
            setStatus("图片上传成功，正在生成...")
            const parameters = {
                picture: JSON.stringify({ file_id }),
                style: style,
                star: star
            };
            
            const res = await fetch(workflowUrl, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${patToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ workflow_id, parameters, }),
            });
            
            const ret = await res.json();
            
            if (ret.code !== 0) { 
                setStatus(ret.msg); 
                setIsGenerating(false);
                return; 
            }
            
            try {
                const data = JSON.parse(ret.data); 
                setStatus(''); 
                setAudioUrl(data.output);
            } catch (error) {
                console.error('Failed to parse response data:', error);
                setStatus('解析响应数据失败');
            }
        } catch (error) {
            console.error('Generation failed:', error);
            setStatus('生成失败，请重试');
        } finally {
            setIsGenerating(false);
        }
    }
    const uploadFile = async () => {
        // 请求体对象
        const formData = new FormData();
        const input = uploadImageRef.current;
        if (!input.files || input.files.length <= 0) return;
        // 二进制文件
        formData.append('file', input.files[0]);

        const res = await fetch(uploadUrl, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${patToken}`, },
            body: formData,
        });

        const ret = await res.json();

        if (ret.code !== 0) { setStatus(ret.msg); return; }

        return ret.data.id;
    }
    return (
        <div className={styles.container}>
            <div className={styles.input}>
                <div className={styles.fileInput}>
                    <input
                        ref={uploadImageRef}
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        required
                        onChange={updateImageData}
                        style={{ display: 'none' }}
                    />
                    <label htmlFor="image">
                        <img
                            src={imgPreview}
                            alt="preview"
                            className={styles.preview}
                        />
                    </label>
                </div>
                <div className="settings">
                    <div className={styles.selection}>
                        <label>风格:</label>
                        <select value={style} onChange={(e) => setStyle(e.target.value)}>
                            <option value="古风">古风</option>
                            <option value="流行">流行</option>
                            <option value="中国风">中国风</option>
                            <option value="摇滚">摇滚</option>
                            <option value="说唱">说唱</option>
                            <option value="民谣">民谣</option>
                        </select>
                    </div>
                    <div className={styles.selection}>
                        <label>偏向歌手歌词风格:</label>
                        <select value={star} onChange={(e) => setStar(e.target.value)}>
                            <option value="周杰伦">周杰伦</option>
                            <option value="林俊杰">林俊杰</option>
                            <option value="邓紫棋">邓紫棋</option>
                            <option value="薛之谦">薛之谦</option>
                            <option value="李荣浩">李荣浩</option>
                            <option value="陈奕迅">陈奕迅</option>
                        </select>
                    </div>
                </div>
                <div className={styles.generate}>
                    <button 
                        onClick={generate} 
                        disabled={isGenerating}
                        style={{
                            opacity: isGenerating ? 0.6 : 1,
                            cursor: isGenerating ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {isGenerating ? '生成中...' : '生成'}
                    </button>
                </div>
            </div>
            <div className={styles.output}>
                <div className={styles.generated}>
                    <span className={styles.span}>根据图片智能生成歌曲</span>
                    {audioUrl && (
                        <audio 
                            src={audioUrl} 
                            controls 
                            autoPlay={false}
                        />
                    )}
                    {status && <div style={{ marginTop: '16px', textAlign: 'center',fontSize:'20px' }}>{status}</div>}
                </div>
            </div>

        </div>
    )
}

export default SmartAudio