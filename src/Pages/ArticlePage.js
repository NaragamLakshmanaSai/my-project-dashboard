import axios from "axios"
import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import UseAuth from "../hooks/UserAuth"
import { useSelector } from 'react-redux';
import store from '../store';

const ArticlePage = () => {
    const [article, setArticle] = useState({title: "NA", content: ["no content loaded", "check api call"]})
    const [addComment, setAddComment] = useState("")
    const [refreshPage, setRefreshPage] = useState(false)
    const { type, id } = useParams()
    const navigate = useNavigate();

    const user = useSelector((state) => state);
    useEffect(() => {
        const getArticle = async() => {
            const articleResponse = await axios.get(`http://localhost:3020/articles/${type}/${id}`)
            setArticle(articleResponse.data)
        }

        getArticle()
    },[id, refreshPage, user])


    return(
        <>
        <h1 style={{display:'inline', marginRight: '20px'}}>{article.title}</h1>
        { user?.accesses?.map(a => a).includes("publish_article") && <button style={{backgroundColor: 'red'}} onClick={async()=>{await axios.put(`http://localhost:3020/articles/${type}/${id}/delete`); navigate('/articles')}}>Delete Article</button> }
        { user?.accesses?.map(a => a).includes("publish_article") && article?.approved == "false" && <button style={{backgroundColor: 'green'}} onClick={async()=>{await axios.put(`http://localhost:3020/articles/${type}/${id}/like_comment_approve`, {approved: "true"});setRefreshPage(!refreshPage)}}>Approve Article</button> }
        <br></br>
        {article.content.map((par, i) => <p key={i}>{par}</p>)}
        <br></br>
        <button onClick={async()=>{await axios.put(`http://localhost:3020/articles/${type}/${id}/like_comment_approve`, {like: 1}); setRefreshPage(!refreshPage)}}>Like</button>
        <br></br>
        <p>This article has {article?.likes || 0} like(s)</p>
        <h3>Add Comment</h3>
        <div id="add-comment-form">
            <label> Posting as:
            <p>{user?.name}</p>
            <br/>
            </label>
            <label> Comment:
            <textarea type="text" value={addComment} onChange={(e) => setAddComment(e.target.value)} />
            </label>
            <button onClick={async() => {await axios.put(`http://localhost:3020/articles/${type}/${id}/like_comment_approve`, {comment: addComment, userName: user.name}); setAddComment(""); setRefreshPage(!refreshPage)}}>Post Comment</button>
        </div>
        <h3>Comments</h3>
        {article?.comments?.map((commentObj)=> <div className="comment"> <h4>{commentObj.userName}</h4> <p>{commentObj.comment}</p></div>)}
        </>
    )
}

export default ArticlePage