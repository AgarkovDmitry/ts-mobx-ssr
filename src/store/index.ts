import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'

import Stars from './stars'
import Counter from './couter'

export default class Store{
  stars: Stars = new Stars()
  counter: Counter = new Counter()
  routing: RouterStore = new RouterStore()

  constructor(history, initState?) {
    syncHistoryWithStore(history, this.routing)
    if (initState) {
      this.stars = new Stars(initState.stars)
    }
  }

  initFetch = async(url) => {
    if (url == '/stars')
      await this.stars.loadStars()
  }
}