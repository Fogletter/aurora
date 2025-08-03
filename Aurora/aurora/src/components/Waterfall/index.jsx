import styles from './waterfall.module.css'
import {
    useRef,
    useEffect
} from 'react'
import ImageCard from '@/components/ImageCard'

const Waterfall = (props) => {
    const loader = useRef(null)
    const {
        articles,
        fetchMore
    } = props

    useEffect(() => {
        // ref 出现在视窗了 intersectionObserver 
        // 观察者模式
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                fetchMore()
            }
        })
        if (loader.current) observer.observe(loader.current)
        return () => observer.disconnect()
    }, [])

    return (
        <>
        <div className={styles.wrapper}>
            <div className={styles.column}>
                {
                    articles.filter((_, i) => i % 2 === 0).map(article => (
                        <ImageCard key={article.id} {...article} />
                    ))
                }
            </div>
            <div className={styles.column}>
                {
                    articles.filter((_, i) => i % 2 !== 0).map(article => (
                        <ImageCard key={article.id} {...article} />
                    ))
                }
            </div>
            <div ref={loader} className={styles.loader}>加载中...</div>
        </div>
        </>
    )
}

export default Waterfall