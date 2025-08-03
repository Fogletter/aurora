import {
    useEffect,
    useState
} from 'react'
import {
    Tabbar
} from 'react-vant';
import {
    HomeO,
    BagO,
    FriendsO,
    ServiceO,
    UserO,
} from '@react-vant/icons';
import {
    Outlet,
    Link,
    useLocation
} from 'react-router-dom'

// 菜单栏配置
const tabs = [
    { icon: <HomeO />, title: '首页', path: '/home' },
    { icon: <BagO  />, title: '商城', path: '/mall' },
    { icon: <FriendsO />, title: '社区', path: '/community' },
    { icon: <ServiceO />, title: '服务', path: '/assistant' },
    { icon: <UserO />, title: '我的', path: '/account' },
]

const MainLayout = () => {
    const [active, setActive] = useState(0)
    const location = useLocation()
    useEffect(() => {
        // es6的使用power
        const index = tabs.findIndex(
            tab => location.pathname.startsWith(tab.path)
        )
        setActive(index)
    }, [location])
    return (
        <div 
        className='flex flex-col h-screen'
        style={{paddingBottom: '50px'}}
        >
            <div className='flex-1'>
                <Outlet />
            </div>
            <Tabbar value={active} onChange={
                (key) => {
                    setActive(key)
                }
            }>
                {tabs.map((tab, index) => (
                    <Tabbar.Item
                        key={index}
                        icon={tab.icon}
                    >
                        <Link to={tab.path}>{tab.title}</Link>
                        {/* 此处的Link组件仅支持移动端跳转，PC端需要使用navigate */}
                    </Tabbar.Item>
                ))}
            </Tabbar>
        </div>
    )
}

export default MainLayout