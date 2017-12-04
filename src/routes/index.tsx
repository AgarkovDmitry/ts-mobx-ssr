const appConfig = require('../../config/main')

import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Route, Switch } from 'react-router'

import Header from 'components/header'
import Home from './home'
import About from './about'
import Counter from './counter'
import Stars from './stars'

const style = require('./style.css')

export default class App extends React.Component {
  render() {
    return (
      <section className={style.AppContainer}>
        <Helmet {...appConfig.app} {...appConfig.app.head}/>
        <Header />
        <Switch>
          <Route exact={true} path='/' component={Home} />
          <Route path='/about' component={About} />
          <Route path='/counter' component={Counter} />
          <Route path='/stars' component={Stars} />
        </Switch>
      </section>
    )
  }
}
