import SearchBox from "@/components/SearchBox"
import useSearchStore from "@/store/useSearchStore"
import styles from './search.module.css'
import {
    useState,
    useEffect,
    memo,
    useCallback
} from 'react'

const HotListItems = memo((props) => {
    const { hotList } = props
    return (
        <div className={styles.hot}>
            <h1>热门推荐</h1>
            {
                hotList.map(item => (
                    <div key={item.id} className={styles.item}>
                        {item.city}
                    </div>
                ))
            }
        </div>
    )
})

const Search = () => {
    const [query, setQuery] = useState('')
    const {
        suggestList,
        setSuggestList,
        hotList,
        setHotList
    } = useSearchStore()

    useEffect(() => {
        setHotList()
    }, [])

    // 单向数据流
    // 反复生成 useCallback
    const handleQuery = useCallback((query) => {
        // api 请求
        // console.log(query)
        setQuery(query)
        if (!query) {
            return
        }
        setSuggestList(query)
    }, [setSuggestList])
    const suggestListStyle = {
        display: query === "" ? 'none' : 'block'
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <SearchBox handleQuery={handleQuery} />
                <HotListItems hotList={hotList} />
                <div className={styles.list} style={suggestListStyle}>
                    {
                        suggestList.map(item => (
                            <div key={item} className={styles.item}>
                                {item}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Search