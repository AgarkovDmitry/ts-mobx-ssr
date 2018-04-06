import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'

import Stars from './stars'
import Counter from './couter'
import Locale from './locale'

export default class Store{
  stars: Stars = new Stars()
  counter: Counter = new Counter()
  locale: Locale = new Locale()
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

  initPage = (url) => {
    if (url == '/stars')
      return 'StarsPage'
    if (url == '/counter')
      return 'CounterPage'
    if (url == '/about')
      return 'AboutPage'
    if (url == '/')
      return 'HomePage'
  }
}

declare global{
  class IRootStore extends Store{}
}