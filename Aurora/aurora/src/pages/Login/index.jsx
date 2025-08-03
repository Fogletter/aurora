import {
    useRef,
    useState
} from 'react'
import {
    useUserStore
} from '@/store/user'
import {
    useNavigate
} from 'react-router-dom'
import styles from './login.module.css'

const Login = () => {
    const usernameRef = useRef(null)
    const passwordRef = useRef(null)
    const navigate = useNavigate()
    const { login } = useUserStore()
    const [isLoading, setIsLoading] = useState(false)
    
    const handleLogin = async (e) => {
        e.preventDefault();
        const username = usernameRef.current.value
        const password = passwordRef.current.value
        if(!username || !password) {
            alert('请输入用户名和密码')
            return;
        }
        
        setIsLoading(true) // 开始登录，设置loading状态
        
        try {
            await login({username, password});
            // 只有登录成功才导航到首页
            navigate('/')
        } catch (error) {
            // 登录失败时显示错误信息
            alert('用户名或密码错误，请重试')
            setIsLoading(false) // 登录失败，重置loading状态
        }
    }
    return (
        <div className={styles.pageContainer}>
            <form onSubmit={handleLogin} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="username" className={styles.label}>用户名：</label>
                    <input
                        type="text"
                        id="username"
                        ref={usernameRef}
                        className={styles.input}
                        placeholder="请输入用户名"
                        disabled={isLoading}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.label}>密码：</label>
                    <input
                        type="password"
                        id="password"
                        ref={passwordRef}
                        className={styles.input}
                        placeholder="请输入密码"
                        disabled={isLoading}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <button 
                        type="submit" 
                        className={styles.submitButton}
                        disabled={isLoading}
                    >
                        {isLoading ? '登录中...' : '登录'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Login