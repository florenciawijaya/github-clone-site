import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import ReactMarkdownWithHtml from 'react-markdown/with-html'
import './RepositoryDetails.css'

const RepositoryDetails = (props) => {
    const [readmeApi, setReadmeApi] = useState()
    const [readme, setReadme] = useState()

    const repoDetails = props.location.state.repoDetails.res
    let contentsUrl = repoDetails.url + '/contents/'

    const getReadmeApi = useCallback(() => {
        axios.get(contentsUrl)
        .then(res => {
            const contents = res.data.find((element) => {return element.name.toLowerCase() === 'readme.md'}).download_url
            setReadmeApi(contents)
        })
    })

    useEffect(() => {
        getReadmeApi()
        if(readmeApi !== undefined) {
            axios.get(readmeApi)
            .then(res => {
                const readmeText = res.data
                setReadme(readmeText)
            })
        }
    }, [getReadmeApi])

    return (
        <React.Fragment>
            <div className = "image">
                <img src="/git_logo.png" id="git-logo" style={{width: "50px", height: "50px"}}/>
            </div>

            <div className = "header-repo">
                <h1 className = "repo-name">{props.location.state.repoDetails.res.full_name}</h1>
            </div>
            
            <div className = "split">
                <div className = "div-readme top-200">
                    <b>README.md</b>
                    <div className = "markdown-readme">
                        <ReactMarkdownWithHtml source={readme} allowDangerousHtml={true} escapeHtml={false}/>
                    </div>
                </div>
            
                <div className = "div-others top-200">
                    <h2>About</h2>
                    <br/>
                    <div>{props.location.state.repoDetails.res.description}</div>
                    <br/>
                    <div>
                        <img src="/license.jpg" id="license-logo" style={{width: "30px", height: "30px"}}/>
                        <p id="license">{props.location.state.repoDetails.res.license.name}</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default RepositoryDetails