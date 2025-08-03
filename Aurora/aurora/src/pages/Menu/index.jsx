import useTitle from '@/hooks/useTitle'
import {
    StarO,
    BagO,
    CartO,
    ChatO,
    ServiceO,
    MedalO,
    Search,
    HomeO,
    UserO
} from '@react-vant/icons';
import styles from './menu.module.css'
import {
    useNavigate
} from 'react-router-dom'

const Menu = () => {
    useTitle('菜单')
    const navigate = useNavigate()
    const gridData = [
        { icon: <HomeO />, text: '首页', url: '/home' },
        { icon: <BagO  />, text: '商城', url: '/mall' },
        { icon: <ChatO />, text: '社区', url: '/community' },
        { icon: <ServiceO  />, text: '小助手', url: '/assistant' },
        { icon: <UserO />, text: '我的', url: '/account' },
        { icon: <Search />, text: '搜索', url: '/search' },
        { icon: <CartO />, text: '购物车'},
        { icon: <StarO />, text: '收藏'},
        { icon: <MedalO  />, text: '音画', url: '/smart-audio' }
        // 当前版本暂不打算做 购物车 和 收藏 ，故去掉url防止误触
    ];
    const handleItemClick = (url) => {
        if (url) {
            navigate(url);
        }
    };
    return (
        <div className={styles.gridContainer}>
            {
                gridData.map((item, index) => (
                    <div 
                    className={styles.gridItem} 
                    key={index}
                    onClick={() => handleItemClick(item.url)}
                    >
                        <div className={styles.icon}>{item.icon}</div>
                        <div className={styles.text}>{item.text}</div>
                    </div>
                ))
            }
        </div>
    )
}

export default Menu