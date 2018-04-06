import * as React from 'react'

interface IProps{
  load: Function
}

interface IState{
  Component: any
}

export default class Bundle extends React.Component<IProps, IState> {
  state = {
    Component: null
  }

  componentWillMount() {
    this.load(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps)
    }
  }

  load(props) {
    this.setState({ Component: null })
    props.load(mod => this.setState({ Component: mod.default ? mod.default : mod }))
  }

  render() {
    const Component = this.state.Component
    return Component ? <Component/> : null
  }
}