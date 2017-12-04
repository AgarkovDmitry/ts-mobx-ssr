import { observable, action } from 'mobx'

export default class Counter{
  @observable count: number = 0

  @action increment = () => this.count = this.count + 1

  @action decrement = () => this.count = this.count > 0 ? this.count - 1 : this.count
}