import { useEffect } from 'react';
import styles from './mall.module.css';
import {
  useMallStore
} from '@/store/useMallStore'
import {
  useNavigate
} from 'react-router-dom'

const Mall = () => {
  const navigate = useNavigate()
  const {
    products,
    fetchMall
  } = useMallStore()
  const categories = [
    {
      title: '实体音乐',
      image: 'https://ai-public.mastergo.com/ai/img_res/81815ed825561fc49cec2fd3766f4202.jpg'
    },
    {
      title: '乐器设备',
      image: 'https://ai-public.mastergo.com/ai/img_res/5214c5ad3d2336762629e8b19dab26fe.jpg'
    },
    {
      title: '潮流周边',
      image: 'https://ai-public.mastergo.com/ai/img_res/7549493a7df368a76839e7a8fe21dd12.jpg'
    },
    {
      title: '定制服务',
      image: 'https://ai-public.mastergo.com/ai/img_res/bbf2a023ce2e1e2042aa0e9d385075bd.jpg'
    }
  ]
  useEffect(() => {
    fetchMall()
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>

        {/* Banner */}
        <div className={styles.banner}>
          <img
            src="https://ai-public.mastergo.com/ai/img_res/7e894537b6068feda9f5f097d5179488.jpg"
            alt="Music Mall Banner"
            className={styles.bannerImage}
          />
        </div>

        {/* 分类区域 */}
        <div className={styles.categorySection}>
          <div className={styles.categoryGrid}>
            {categories.map((category, index) => (
              <div 
                key={index} 
                className={styles.categoryItem}
                // 此处预留分类页的跳转
                onClick={() => navigate('/mall')}
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className={styles.categoryImage}
                />
                <span className={styles.categoryTitle}>
                  {category.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 商品列表 */}
        <div className={styles.productSection}>
          <h2 className={styles.productTitle}>热门商品</h2>
          <div className={styles.productList}>
            {products.map(product => (
              <div 
                key={product.id} 
                className={styles.productCard}
                onClick={() => navigate(`/detail/${product.id}`)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className={styles.productImage}
                />
                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <div className={styles.productActions}>
                    <span className={styles.productPrice}>¥ {product.price}</span>
                    <button 
                      className={styles.buyButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        // 这里可以添加购买逻辑
                      }}
                    >
                      立即购买
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Mall;