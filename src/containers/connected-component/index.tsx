import * as React from 'react'
import { observable, computed } from 'mobx'
// import { observer } from 'mobx-react';


// @inject('store')
// @observer
class ConnectedComponent<P = {}, S = {}> extends React.Component<P, S>{
  @observable protected store: IRootStore

  @computed get mappedProps() {
    return this.store || {}
  }

  constructor(props) {
    super(props)
    this.store = props.store
  }

  componentDidMount() {
    this.store = (this.props as any).store
  }
}

export default ConnectedComponent