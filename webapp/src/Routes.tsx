import React, { ReactElement } from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './components/Home'
import Stats from './components/Stats'

interface Props {
    
}

export default function Routes({}: Props): ReactElement {
    return (
        <Switch>
        <Route path="/compression">
          <Stats type="compression" />
        </Route>
        <Route path="/protocol">
          <Stats type="protocol" />
        </Route>
        <Route path="/ip_version">
          <Stats type="ip_version" />
        </Route>
        <Route path="/ssg">
          <Stats type="ssg" />
        </Route>
        <Route path="/images">
          <Stats type="images" />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    )
}
