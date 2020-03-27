import React from 'react'
import Header from './Header'
import Clock from './Clock'
class Index extends React.Component {
  constructor() {
    super()
    this.state = {
      isShowHeader: true,
      isShowClock: true
    }
  }

  handleShowOrHide () {
    this.setState({
      isShowHeader: !this.state.isShowHeader,
      isShowClock: !this.state.isShowClock
    })
  }

  render () {
    return (
      <div>
        {/* 
        Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
    in Clock (at Index.jsx:24)
        */} 内存泄漏
        {this.state.isShowHeader ? <Header /> : null}
        {this.state.isShowClock ? <Clock /> : null}
        <button onClick={this.handleShowOrHide.bind(this)}>
          显示或者隐藏标题
        </button>
      </div>
    )
  }
}
export default Index