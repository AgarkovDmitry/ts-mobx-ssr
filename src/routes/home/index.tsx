import * as React from 'react'
const style = require('./style.css')

export default class Home extends React.Component {
  render() {
    return (
      <div className={style.Home}>
        <img src={require('./barbar.png')} />
        <p>Hello!</p>
      </div>
    )
  }
}
