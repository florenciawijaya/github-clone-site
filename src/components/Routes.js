import React from 'react'
import {Switch, Route} from 'react-router-dom'
import RepositorySearch from './RepositorySearch'
import RepositoryDetails from './RepositoryDetails'

function Router() {
    return (
        <Switch>
            <Route exact path='/' component={RepositorySearch}/>
            <Route exact path='/:repoName/:repoOwner' component={RepositoryDetails}/>
        </Switch>
    )
}

export default Router;