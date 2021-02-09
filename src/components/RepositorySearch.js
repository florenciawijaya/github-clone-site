import React, {useState} from 'react'
import axios from 'axios'
import RepositorySearchItem from './RepositorySearchItem'
import './RepositorySearch.css'

const RepositorySearch = () => {
    const [keyword, setKeyword] = useState('')
    const [repos, setRepos] = useState([])
    const [pageCount, setPageCount] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoaded, setIsLoaded] = useState(false)

    const handleSubmit = e => {
        e.preventDefault()

        let searchUrl = `https://api.github.com/search/repositories?q=${keyword}&sort=stars&order=desc&page=1&per_page=10`
        axios.get(searchUrl)
        .then(res => {
            const reposData = res.data.items
            const reposCount = res.data.total_count
            setRepos(reposData)
            setIsLoaded(true)
            reposCount <= 10000 ? setPageCount(reposCount/10) : setPageCount(100)
        })
        .catch(error => console.log('Error: ', error))
    }

    const handleFetch = (n) => {
        let searchUrl = `https://api.github.com/search/repositories?q=${keyword}&sort=stars&order=desc&page=${n}&per_page=10`
        axios.get(searchUrl)
        .then(res => {
            const reposData = res.data.items
            setRepos(reposData)
        })
        .catch(error => console.log('Error: ', error))
    }

    const handleClickPrevious = () => {
        let n = currentPage-1
        setCurrentPage(n)
        handleFetch(n)
    }

    const handleClickNext = () => {
        let n = currentPage+1
        setCurrentPage(n)
        handleFetch(n)
    }

    return(
        <React.Fragment>
            <section className = "header">
                <img src="/git_logo.png" id="git-logo" style={{width: "50px", height: "50px"}}/>
                <form onSubmit={handleSubmit} id="search-form">
                    <input type = "text"
                    value = {keyword}
                    onChange = {e => setKeyword(e.target.value)}
                    placeholder = "Search"/>
                </form>
            </section>

            {isLoaded ? 
            (<React.Fragment> 
                <div className = "div-search">
                    {repos.map((item) => {return (
                        <RepositorySearchItem 
                        key = {item.id} 
                        res = {item}
                        />
                        )
                    })}
                </div>

            <button className="pagination btn-prev" onClick={handleClickPrevious}>Previous</button>
            <button className="pagination btn-next" onClick={handleClickNext}>Next</button>
            </React.Fragment>) 
            
            : <div></div>}
        </React.Fragment>
    )
}

export default RepositorySearch