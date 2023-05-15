import { CPagination, CPaginationItem } from "@coreui/react"
import axios from "axios"
import React, {useState, useEffect} from "react"
import { Link, useSearchParams } from "react-router-dom"

const ApproveArticlesPage = () => {
    const [articles, setArticles] = useState([])
    const [articlesType, setArticlesType] = useState("")
    const [searchParams, setSearchParams] = useSearchParams()
    const [filter, setFilter] = useState("")

    const [pageNo, setPageNo] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [pageSize, setPageSize] = useState(2)

    const handleClick = (nextArticlesType) => {
        if(nextArticlesType===articlesType)
        return

        setArticlesType(nextArticlesType)
        if(nextArticlesType!==searchParams.get('type')){
            searchParams.set('type', nextArticlesType)
            setSearchParams(searchParams)
            setPageNo(1)
        }
    }

    useEffect(() => {
        if(!searchParams.get('type')){
            searchParams.set('type', "educational")
            setSearchParams(searchParams)
        }
        else if(searchParams.get('type')!==articlesType){
            handleClick(searchParams.get('type'))
        }

        const getArticles = async() => {
            const articlesResponse = await axios.post(`http://localhost:3020/articles/${articlesType}/?approved=${false}&pageNo=${pageNo}&pageSize=${pageSize}`,{filter})
            setArticles(articlesResponse.data.articles)
            setTotalPages(articlesResponse.data.totalPages)
        }

        getArticles()
    },[articlesType, searchParams, filter, pageNo])

    return(
        <>            
            <div className="btn-group">
                <button className={articlesType === "educational" ? "active" : "btn"} 
                    onClick={() => handleClick("educational")}> Educational </button>
                <button className={articlesType === "spiritual" ? "active" : "btn"}
                    onClick={() => handleClick("spiritual")}> Spiritual </button>
                <button className={articlesType === "fitness" ? "active" : "btn"} 
                    onClick={() => handleClick("fitness")}> Fitness </button>
            </div>
            <input type="text" placeholder="search article" onChange={(e)=>{setFilter(e.target.value)}} />
            <h1>{articlesType.toUpperCase()} ARTICLES</h1>
            {articles?.map(article => {
                return(
                    <div key={article.title}>
                        <Link key={article.name} to={`/articles/${articlesType}/${article.name}`}>
                            <h3>{article.title}</h3>
                            <p>{article.content[0].substring(0,150)}....</p>
                        </Link>
                    </div>
                )
            })
            
            }
            <br></br>
            <span style={{position: 'absolute', alignSelf: 'flex-end'}}>
                <CPagination>
                    <CPaginationItem onClick={() => {setPageNo(1)}} disabled={pageNo<=1}>
                    <span aria-hidden="true">&laquo;</span>
                    </CPaginationItem>
                    <CPaginationItem onClick={() => {setPageNo(pageNo - 1)}} disabled={pageNo < 2}>
                    <span aria-hidden="true">&lt;</span>
                    </CPaginationItem>
                    {[...Array(totalPages).keys()]?.map((_, item) => (
                    <CPaginationItem key={item + 1} onClick={() => {setPageNo(item + 1)}}
                                    active={item === pageNo - 1}>{item + 1}</CPaginationItem>
                    ))}
                    <CPaginationItem onClick={() => {setPageNo(pageNo + 1)}}
                                    disabled={pageNo > totalPages-1}>
                    <span aria-hidden="true">&gt;</span>
                    </CPaginationItem>
                    <CPaginationItem onClick={() => {setPageNo(totalPages)}}
                                    disabled={pageNo >= totalPages}>
                    <span aria-hidden="true">&raquo;</span>
                    </CPaginationItem>
                </CPagination>
            </span>
        </>
    )
}

export default ApproveArticlesPage