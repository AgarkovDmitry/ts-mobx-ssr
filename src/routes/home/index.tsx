import * as React from 'react'
import Counter from 'containers/counter'
const styles = require('./style.css')

export default class Home extends React.Component {
  render() {
    return (
      <div className={styles.home}>
        <img src={require('./barbar.png')} />
        <p>Hello!</p>
        <Counter message='hello !'/>
      </div>
    )
  }
}
