import * as React from 'react'
const styles = require('./style.css')

export default class About extends React.Component {
  render() {
    return (
      <div className={styles.about}>
        <h4>About</h4>
        <input type='text' onKeyPress={e => console.log(e.key)}/>
      </div>
    )
  }
}
