const appConfig = require('../../config/main')

import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Route, Switch } from 'react-router'

import Header from 'components/header'

const styles = require('./style.css')

import Bundle from './bundle'

const Home = () => <Bundle load={cb => require.ensure([], () => cb(require('./home')), 'HomePage')}/>
const About = () => <Bundle load={cb => require.ensure([], () => cb(require('./about')), 'AboutPage')}/>
const Counter = () => <Bundle load={cb => require.ensure([], () => cb(require('./counter')), 'CounterPage')}/>
const Stars = () => <Bundle load={cb => require.ensure([], () => cb(require('./stars')), 'StarsPage')}/>

export default class App extends React.Component {
  render() {
    return (
      <section className={styles.appContainer}>
        <Helmet {...appConfig.app} {...appConfig.app.head}/>
        <Header/>
        <Switch>
          <Route exact={true} path='/' component={Home}/>
          <Route path='/about' component={About}/>
          <Route path='/counter' component={Counter}/>
          <Route path='/stars' component={Stars}/>
        </Switch>
      </section>
    )
  }
}
