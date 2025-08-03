import './App.css'
import {
  Suspense,
  lazy
} from 'react'
import {
  Route,
  Routes,
  Navigate
} from 'react-router-dom'
import MainLayout from '@/components/MainLayout'
import BlankLayout from '@/components/BlankLayout'
import Loading from '@/components/Loading'

const Home = lazy(() => import('@/pages/Home'))
const Mall = lazy(() => import('@/pages/Mall'))
const Community = lazy(() => import('@/pages/Community'))
const Assistant = lazy(() => import('@/pages/Assistant'))
const Account = lazy(() => import('@/pages/Account'))
const Search = lazy(() => import('@/pages/Search'))
const Detail = lazy(() => import('@/pages/Detail'))
const Menu = lazy(() => import('@/pages/Menu'))
const SmartAudio = lazy(() => import('@/pages/SmartAudio'))
const RequireAuth = lazy(() => import('@/components/RequireAuth'))
const Login = lazy(() => import('@/pages/Login'))

function App() {


  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<RequireAuth><MainLayout /></RequireAuth>}>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/mall" element={<Mall />} />
            <Route path="/community" element={<Community />} />
            <Route path="/assistant" element={<Assistant />} />
            <Route path="/account" element={<Account />} />
          </Route>
          <Route element={<RequireAuth><BlankLayout /></RequireAuth>}>
            <Route path="/search" element={<Search />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/smart-audio" element={<SmartAudio />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default App
