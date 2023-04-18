import axios from "axios"
import React, {useState, useEffect} from "react"
import { Link, useSearchParams } from "react-router-dom"

const ApproveArticlesPage = () => {
    const [articles, setArticles] = useState([])
    const [articlesType, setArticlesType] = useState("")
    const [searchParams, setSearchParams] = useSearchParams()
    const [filter, setFilter] = useState("")

    const handleClick = (nextArticlesType) => {
        if(nextArticlesType===articlesType)
        return

        setArticlesType(nextArticlesType)
        if(nextArticlesType!==searchParams.get('type')){
            searchParams.set('type', nextArticlesType)
            setSearchParams(searchParams)
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
            const articlesResponse = await axios.post(`http://localhost:3020/articles/${articlesType}/?approved=${false}`,{filter})
            setArticles(articlesResponse.data)
        }

        getArticles()
    },[articlesType, searchParams, filter])

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
            })}
        </>
    )
}

export default ApproveArticlesPage