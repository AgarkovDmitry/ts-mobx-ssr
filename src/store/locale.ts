import { observable, action, ObservableMap } from 'mobx'
import axios from 'axios'

export default class Locale{
  @observable dictionary: ObservableMap<string>

  @action loadDictionary = async(tokens: string[], language: string) => {
    const res = await axios.get('/api/translation', { params: { tokens, language } })

    this.dictionary = new ObservableMap(res.data)
  }
}