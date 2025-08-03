import {
    useParams,
    useNavigate
} from 'react-router-dom'
import {
    Skeleton,
    Swiper,
    Image
} from 'react-vant'
import {
    useEffect,
    memo
} from 'react'
import useDetailStore from '@/store/useDetailStore'
import useTitle from '@/hooks/useTitle'
import {
    ArrowLeft,
    Cart,
    ShopO,
    ServiceO,
    StarO,
    Logistics,
    LikeO,
    Description
} from '@react-vant/icons'
import styles from './detail.module.css'

const BottomBar = memo(() => {
    return (
        <div className={styles.bottomBar}>
            <div className={styles.left}>
                <div className={styles.iconBlock}>
                    <ShopO />
                    <span>店铺</span>
                </div>
                <div className={styles.iconBlock}>
                    <ServiceO />
                    <span>客服</span>
                </div>
                <div className={styles.iconBlock}>
                    <StarO />
                    <span>收藏</span>
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.cartBtn}>加入购物车</div>
                <div className={styles.buyBtn}>立即购买</div>
            </div>
        </div>
    )
})

const Detail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { detail, loading, setDetail } = useDetailStore()
    useEffect(() => {
        setDetail(id)
    }, [])
    useEffect(() => {
        useTitle(detail.title)
    }, [detail])
    if (loading) {
        return <Skeleton />
    }

    return (
        <>
            <nav className={styles.nav}>
                <ArrowLeft
                    fontSize={36}
                    onClick={() => navigate(-1)}
                    style={{ cursor: 'pointer' }}
                />
                <Cart
                    fontSize={36}
                    onClick={() => navigate('/cart')}
                    style={{ cursor: 'pointer' }}
                />
            </nav>

            {/* 幻灯片 */}
            <div className={styles.container}>
                <Swiper>
                    {
                        detail.images.map((item, index) => (
                            <Swiper.Item key={index}>
                                <Image lazyload src={item.url} />
                            </Swiper.Item>
                        ))
                    }
                </Swiper>
                <div className={styles.priceRow}>
                    <div className={styles.price}>￥{detail.price}</div>
                </div>
                <div className={styles.titleRow}>
                    <span className={styles.tag}>IFASHION</span>
                    <span className={styles.title}>{detail.title}</span>
                </div>
                <div className={styles.deliveryRow}>
                    <Logistics className={styles.icon} fontSize={30} />
                    <span className={styles.deliveryText}>
                        预计24小时内发货
                    </span>
                    <br />
                    <span className={styles.extraInfo}>上海 · 快递 · 免运费</span>
                </div>
                <div className={styles.row}>
                    <LikeO className={styles.icon} />
                    <span>7天无理由退货</span>
                </div>
                <div className={styles.row}>
                    <Description className={styles.icon} />
                    <span>风格 是否可播放 是否为实体物品</span>
                </div>
            </div >
            <BottomBar />
        </>
    )
}

export default Detail