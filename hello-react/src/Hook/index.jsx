import React, {useState} from 'react'
import { useEffect } from 'react'
const Example = () => {
  /* 
  useState 会返回一对值：当前状态和一个让你更新它的函数，你可以在事件处理函数中或其他一些地方调用这个函数。它类似 class 组件的 this.setState，但是它不会把新的 state 和旧的 state 进行合并。
  */
  const [count, setCount] = useState(0)

  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    document.title = `you clicked ${count} times`
    // document.title = `you`
    return () => {
      console.log('this is calback to do sth when you fire useEffect');
    }
  })

  return (
    <div>
       <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  )
}

/* 
Hook 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数。Hook 不能在 class 组件中使用 —— 这使得你不使用 class 也能使用 React。（我们不推荐把你已有的组件全部重写，但是你可以在新组件里开始使用 Hook。）
*/
const HookRoot = () => {
  return (
    <div>
      <Example/>
    </div>
    )
}
export default HookRoot

