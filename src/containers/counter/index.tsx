import * as React from 'react'
import { observable, computed } from 'mobx'
import { observer, inject } from 'mobx-react'

interface IProps{
  message: string
}

@inject('store')
@observer
export default class Counter extends React.Component<IProps> {
  @observable private store: IRootStore

  @computed get mappedProps() {
    return {
      count: this.store.counter.count,
      increment: this.store.counter.increment,
      decrement: this.store.counter.decrement
    }
  }

  constructor(props: IProps & { store: IRootStore }) {
    super(props)
    this.store = props.store
  }

  render() {
    return (
      <div>
        { this.props.message }
        <h4>Counter Example</h4>
        <button
          name='incBtn'
          onClick={this.mappedProps.increment}
        >
          INCREMENT
        </button>
        <button
          name='decBtn'
          onClick={this.mappedProps.decrement}
          disabled={this.mappedProps.count < 1}
        >
          DECREMENT
        </button>
        <p>{this.mappedProps.count}</p>
      </div>
    )
  }
}