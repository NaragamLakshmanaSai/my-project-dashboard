import axios from "axios"
import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import UseAuth from "../hooks/UserAuth"

const ArticlePage = () => {
    const [article, setArticle] = useState({title: "jeelo", content: ["ajlf", "fkjdflk"]})
    const [addComment, setAddComment] = useState("")
    const [userName, setUserName] = useState("")
    const [refreshPage, setRefreshPage] = useState(false)
    const { type, id } = useParams()

    const { user } = UseAuth()
    console.log(">>>>>>user", user);

    useEffect(() => {
        const getArticle = async() => {
            const articleResponse = await axios.get(`http://localhost:3020/articles/${type}/${id}`)
            setArticle(articleResponse.data)
        }

        getArticle()
    },[id, refreshPage, user])


    return(
        <>
        <h1>{article.title}</h1>
        {article.content.map((par, i) => <p key={i}>{par}</p>)}
        <button onClick={async()=>{await axios.put(`http://localhost:3020/articles/${type}/${id}/like_and_comment`, {like: 1}); setRefreshPage(!refreshPage)}}>Like</button>
        <p>This article has {article.likes} like(s)</p>
        <h3>Add Comment</h3>
        <div id="add-comment-form">
            <label> Posting as:
            <p>{user?.email}</p>
            <br/>
            </label>
            <label> Comment:
            <textarea type="text" value={addComment} onChange={(e) => setAddComment(e.target.value)} />
            </label>
            <button onClick={async() => {await axios.put(`http://localhost:3020/articles/${type}/${id}/like_and_comment`, {comment: addComment, userName}); setAddComment(""); setUserName(""); setRefreshPage(!refreshPage)}}>Post Comment</button>
        </div>
        <h3>Comments</h3>
        {article.comments?.map((commentObj)=> <div className="comment"> <h4>{commentObj.userName}</h4> <p>{commentObj.comment}</p></div>)}
        </>
    )
}

export default ArticlePage