import React from 'react'
class Clock extends React.Component {
  constructor () {
    super()
    this.state = {
      date: new Date()
    }
  }
  /**Warning: componentWillMount has been renamed, and is not recommended for use. See https://fb.me/react-unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 17.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.**/

  // componentWillMount() {
  //   this.timer = setInterval(() => {
  //     this.setState({ date: new Date() })
  //   }, 1000)
  // }
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ date: new Date() })
    }, 1000)
  }
  componentWillUnmount() {
    /* 
   index.js:1 Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
    in Clock (at Index.jsx:28)
    */
    clearInterval(this.timer)
  }
  render () {
    return (
      <div>
        <h1>
          <p>现在的时间是</p>
          {this.state.date.toLocaleTimeString()}
        </h1>
      </div>
    )
  }
}

export default Clock