import { observable, action } from 'mobx'
import axios from 'axios'

export default class Stars{
  @observable isFetching: boolean = false
  @observable count: number = null
  @observable message: any = null

  constructor(stars?) {
    if (stars) {
      this.count = stars.count
    }
  }

  @action loadStars = async() => {
    if (!this.count) {
      this.isFetching = true

      try {
        const res = await axios.get('https://api.github.com/repos/barbar/vortigern')

        if (res.statusText == 'OK') {
          this.count = res.data.stargazers_count
          this.isFetching = false
        }
      }
      catch (err) {
        this.message = err
        this.isFetching = false
      }
    }
  }
}