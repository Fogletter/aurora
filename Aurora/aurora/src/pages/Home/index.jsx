import {
  Swiper
} from 'react-vant';
import styles from './home.module.css';
import {
  useNavigate
} from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: 'https://ai-public.mastergo.com/ai/img_res/309715078f2fc5b9b7b6911246e3c404.jpg',
      title: '商城',
      desc: '精选好物',
      url: 'mall'
    },
    {
      icon: 'https://ai-public.mastergo.com/ai/img_res/e7686a1dcd3c8ced991bd8ad050b7873.jpg',
      title: '社区',
      desc: '分享生活',
      url: 'community'
    },
    {
      icon: 'https://ai-public.mastergo.com/ai/img_res/ec7be50b375d1bb02e7d3cd12abb22f7.jpg',
      title: '服务',
      desc: '贴心服务',
      url: 'assistant'
    },
    {
      icon: 'https://ai-public.mastergo.com/ai/img_res/12dc207f97ecf26ad4a650bbaccc97cb.jpg',
      title: '音画',
      desc: '视听盛宴',
      url: 'smart-audio'
    },
    {
      icon: 'https://ai-public.mastergo.com/ai/img_res/7338e28e2f3b6e46e613037e0a32f7dc.jpg',
      title: '搜索',
      desc: '全站搜索',
      url: 'search'
    },
    {
      icon: 'https://ai-public.mastergo.com/ai/img_res/48f881a300f677864742d8d652eb935c.jpg',
      title: '菜单',
      desc: '快速导航',
      url: 'menu'
    }
  ];

  const swiperItems = [
    'https://img.tukuppt.com/png_preview/00/45/55/nro2FwWC7W.jpg!/fw/780',
    'https://img95.699pic.com/photo/50107/4999.jpg_wh860.jpg',
    'https://img.shetu66.com/2023/07/11/1689066325291390.png'
  ];

  return (
    <div className={styles.container}>
      <div className={styles.swiperContainer}>
        <Swiper
          autoplay={3000}
          className={styles.swiper}
        >
          {swiperItems.map((item, index) => (
            <Swiper.Item key={index}>
              <img
                src={item}
                className={styles.swiperImage}
                alt="首页轮播"
              />
            </Swiper.Item>
          ))}
        </Swiper>
      </div>

      {/* 功能导航区 */}
      <div className={styles.featuresContainer}>
        <div className={styles.featuresGrid}>
          {features.map((item, index) => (
            <div
              key={index}
              className={styles.featureCard}
              onClick={() => navigate(`/${item.url}`)}
            >
              <div className={styles.featureIconContainer}>
                <img src={item.icon} alt={item.title} className={styles.featureIcon} />
              </div>
              <div className={styles.featureTitle}>{item.title}</div>
              <div className={styles.featureDesc}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Home;