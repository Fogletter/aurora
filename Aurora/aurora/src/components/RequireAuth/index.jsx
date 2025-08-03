import {
    useUserStore
} from '@/store/user'
import {
    useEffect
} from 'react'
import {
    useNavigate,
    useLocation
} from 'react-router-dom'

const RequireAuth = ({ children }) => {
    const navigate = useNavigate()
    const {pathname} = useLocation()
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/login',{ from: pathname })
        }
    }, [])
    
    return (
        <>
            {children}
        </>
    )
}

export default RequireAuth