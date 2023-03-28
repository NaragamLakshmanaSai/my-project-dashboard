import axios from "axios"
import React, { useState } from "react"
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const PublishArticlePage = () => {
    const [type, setType] = useState("")
    const [name, setName] = useState("")
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [refreshPage, setRefreshPage] = useState(true)

    const options = [
        { value: 'educational', label: 'Educational' },
        { value: 'spiritual', label: 'Spiritual'},
        { value: 'fitness', label: 'Fitness'}
      ];

    return(
        <div>
            <h1>Please Write Your Article To Publish</h1>
            <Dropdown options={options} onChange={(e)=>{setType(e.value)}} value={type} placeholder=" Select Artilce Type" /> <br/>
            <label> Name
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />  
            </label>
            <label> Title:
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: '700px' }}/>
            </label>
            <label> Content:
            <textarea type="text" value={content} onChange={(e) => setContent(e.target.value)} style={{height: '310px', width: '700px', resize: 'none'}}/>
            </label>
            <button onClick={async() => { console.log(type); await axios.put(`http://localhost:3020/publish-article`, {type, name, title, content}); setName(""); setTitle(""); setContent(""); setRefreshPage(!refreshPage)}}>Publish Article</button>
        </div>
    )
}

export default PublishArticlePage