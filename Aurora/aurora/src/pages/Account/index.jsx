import useTitle from '@/hooks/useTitle'
import {
    useState
} from 'react'
import {
    Image,
    Cell,
    CellGroup,
    ActionSheet,
    Loading,
    Overlay,
    Button  // 添加Button组件
} from 'react-vant';
import {
    ServiceO,
    FriendsO,
    StarO,
    SettingO
} from '@react-vant/icons';
import {
  useNavigate
} from 'react-router-dom'
import styles from './account.module.css'
import { generateAvatar } from '@/llm'
import { useUserStore } from '@/store/user'  // 导入用户状态管理

const Account = () => {
    const [userInfo, setUserInfo] = useState({
        nickname: 'fog',
        level: '5级',
        slogan: '晚来天欲雪，能饮一杯无',
        avatar: 'https://ts3.tc.mm.bing.net/th/id/OIP-C.vjVWU-xhr-3fIWgECOr6agHaHN?r=0&cb=thvnextc2&rs=1&pid=ImgDetMain&o=7&rm=3'
    })
    useTitle('我的')
    const navigate = useNavigate()
    const { logout } = useUserStore()  // 获取logout方法
    const [showActionSheet, setShowActionSheet] = useState(false)
    const [isGenerating, setIsGenerating] = useState(false)  // 添加生成状态
    
    // 处理退出登录
    const handleLogout = () => {
        logout()  // 调用store中的logout方法清除用户状态和token
        navigate('/login')  // 导航到登录页
    }
    
    const handleAction = async (e) => {
        if(e.type === 1) {
            // AI生成头像
            setIsGenerating(true)  // 设置生成中状态
            const text = `
            昵称：${userInfo.nickname}
            签名：${userInfo.slogan}
            `
            try {
                const newAvatar = await generateAvatar(text)
                setUserInfo({
                    ...userInfo,
                    avatar: newAvatar
                })
            } catch (error) {
                console.error('生成头像失败:', error)
            } finally {
                setIsGenerating(false)  // 无论成功失败都关闭生成中状态
            }
        } else if (e.type === 2) {
            // 图片上传
        }
        setShowActionSheet(false)
    }
    const actions = [
        {
            name: 'AI生成头像',
            color: '#ee0a24',
            type: 1
        },
        {
            name: '上传头像',
            color: '#007aff',
            type: 2
        }
    ]
    return (
        <div className={styles.container}>
            <div className={styles.user}>
                <Image
                    round
                    width='64px'
                    height='64px'
                    src={userInfo.avatar}
                    style={{cursor: 'pointer'}}
                    onClick={() => setShowActionSheet(true)}
                />
                <div className='ml4'>
                    <div className={styles.nickname}>昵称：{userInfo.nickname}</div>
                    <div className={styles.level}>等级：{userInfo.level}</div>
                    <div className={styles.slogan}>签名：{userInfo.slogan}</div>
                </div>
            </div>
            <div className='mt3'>
                <CellGroup inset>
                    <Cell title='服务' icon={<ServiceO />} isLink onClick={() => navigate('/assistant')} />
                </CellGroup>
                <CellGroup inset className='mt2'>
                    <Cell title="收藏" icon={<StarO />} isLink />
                </CellGroup>
                <CellGroup inset className='mt2'>
                    <Cell title="社区" icon={<FriendsO />} isLink onClick={() => navigate('/community')} />
                </CellGroup>
                <CellGroup inset className='mt2'>
                    <Cell title="设置" icon={<SettingO />} isLink onClick={() => navigate('/account/setting')} />
                </CellGroup>
                
                {/* 添加退出登录按钮 */}
                <div className={styles.logoutButtonContainer}>
                    <Button 
                        color="#ee0a24"
                        block
                        onClick={handleLogout}
                    >
                        退出登录
                    </Button>
                </div>
            </div>
            <ActionSheet
                visible={showActionSheet}
                actions={actions}
                cancelText='取消'
                duration={300}  // 添加动画持续时间，单位为毫秒
                onCancel={() => setShowActionSheet(false)}
                onSelect={e => handleAction(e)}
            >
            </ActionSheet>
            
            {/* 添加生成中的遮罩层 */}
            <Overlay visible={isGenerating} duration={300}>
                <div className={styles.overlayContent}>
                    <Loading type="spinner" color="#fff" />
                    <div className={styles.loadingText}>正在生成中...</div>
                </div>
            </Overlay>
        </div>
    )
}

export default Account