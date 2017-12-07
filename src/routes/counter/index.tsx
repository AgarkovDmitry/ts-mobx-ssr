import * as React from 'react'
import { observer, inject } from 'mobx-react'
import Store from 'store'

const styles = require('./style.css')

interface IProps {
  store?: Store
}

@inject('store')
@observer
export default class Counter extends React.Component<IProps> {
  render() {
    const { store } = this.props

    return (
      <div className={styles.counter}>
        <h4>Counter Example</h4>
        <button
          name='incBtn'
          onClick={store.counter.increment}
        >
          INCREMENT
        </button>
        <button
          name='decBtn'
          onClick={store.counter.decrement}
          disabled={store.counter.count < 1}
        >
          DECREMENT
        </button>
        <p>{store.counter.count}</p>
      </div>
    )
  }
}