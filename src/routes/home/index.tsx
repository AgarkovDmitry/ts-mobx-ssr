import * as React from 'react'
const styles = require('./style.css')

export default class Home extends React.Component {
  render() {
    return (
      <div className={styles.home}>
        <img src={require('./barbar.png')} />
        <p>Hello!</p>
      </div>
    )
  }
}
