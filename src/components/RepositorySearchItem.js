import React from 'react'
import {Link} from 'react-router-dom'
import './RepositorySearchItem.css'

const RepositorySearchItem = (props) => {
    return (
        <div className = "repository-item">
            <Link to={{
                pathname: `/${props.res.name}/${props.res.owner.login}`,
                state: {repoDetails: props}
            }}> {props.res.full_name} </Link>

            <p className = "repository-description">
                {props.res.description}
            </p>

            <p className = "repository-star">
                {props.res.stargazers_count}
            </p>

            <p className = "repository-language">
                {props.res.language}
            </p>

            {props.res.license && 
                <p className = "repository-license">
                    {props.res.license.name}
                </p>
            }
        </div>
    )
}

export default RepositorySearchItem