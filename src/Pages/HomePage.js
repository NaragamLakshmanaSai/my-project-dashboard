import React from "react"

const HomePage = () => {
    return(
        <>
            <h1>Welcome To My Full-Stack Application</h1>
            <h3>
                I am creating this site from my learnings as a Full-Stack Developer Intern at BioBazaar.<br></br> <br></br>BioBazaar is a B2B pharmaceutical supply-chain technology startup working with a vision to become India's biggest pharmaceuticals company. Being a part of the core team, I worked as a full stack developer and built E-Commerce platform and an ERP from scratch. We shipped our MVP (ERP and 2 android applications) within 6 months to make 3cr+ in revenue 3000 skus by serving 1000+ retailers.
                <br></br><br></br>
                I designed schemas for new features, developed key APIs, created web UI and ran database migrations for corresponding requirements.
            </h3>
            <br></br>
            <h1>My Resume</h1>
            <img src={require('./MyResume.png')} alt="Resume" style={{height: '1500px', width: '1000px'}}></img>
        </>
    )
}

export default HomePage