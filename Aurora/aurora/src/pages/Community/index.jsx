import {
  useArticleStore
} from '@/store/useArticleStore'
import {
  useEffect
} from 'react'
import Waterfall from '@/components/Waterfall'

const Community = () => {
  const {
      articles,
      fetchMore,
      overview
  } = useArticleStore()
  useEffect(() => {
      fetchMore()
  }, [])
  return (
      <div className='bgc-gray'>
          <div className="next-view-c"></div>
          <Waterfall articles={articles} fetchMore={fetchMore} overview={overview} />
      </div>
  )
}

export default Community