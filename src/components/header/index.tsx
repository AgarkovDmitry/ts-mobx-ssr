import * as React from 'react'
import { Link } from 'react-router-dom'

const styles = require('./style.css')

export default class Header extends React.Component{
  render() {
    return (
      <nav>
        <ul className={styles.nav}>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/about'>About</Link></li>
          <li><Link to='/counter'>Counter</Link></li>
          <li><Link to='/stars'>Stars</Link></li>
        </ul>
      </nav>
    )
  }
}
