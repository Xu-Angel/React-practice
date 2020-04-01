import React, {useState} from 'react'
import { useEffect } from 'react'
// import { createStore } from 'redux'
// import { Provider } from 'react-redux'
import App from './useContext'
import reducer from './useReducer'
// import CounterReducer from './useReducer'
// const store = createStore(reducer)

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

/**
 * 等价的class
 */
class ExampleClass extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }
  componentDidMount() {
    this._updateTitle()
  }
  componentDidUpdate() {
    this._updateTitle()
  }
  _updateTitle() {
    document.title = `you clicked ${this.state.count} times`
    // document.title = `you`
    return () => {
      console.log('this is calback to do sth when you fire useEffect');
    }
  }
  render() {
    return (
      <div>
      <p>You clicked {this.state.count} times</p>
      <button onClick={() => this.setState({ count: this.state.count + 1 })}>
        Click me
      </button>
    </div>
    )
  }
}

function Counter({ initialCount }) {
  console.log(initialCount)
  const [count, setCount] = useState(initialCount);
  /* 复杂计算初始化的时候可以通过cb来实现 */
  // const [state, setState] = useState(() => {
  //   const initialState = someExpensiveComputation(props);
  //   return initialState;
  // });
  
  /* 
  与 class 组件中的 setState 方法不同，useState 不会自动合并更新对象。你可以用函数式的 setState 结合展开运算符来达到合并更新对象的效果。
  */
//  setState(prevState => {
//   // 也可以使用 Object.assign
//   return {...prevState, ...updatedValues};
// });
  /* React Hook "useEffect" is called conditionally. React Hooks must be called in the exact same order in every component render  react-hooks/rules-of-hooks */
  // if (count > 10) {
  //   useEffect(() => {
  //     document.title = 'hhh'
  //   })
  // }
  /* 正确用法 */
  useEffect(() => {
    if (count > 5) {
      document.title = 'hhh'
    }
  })
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      {/* 函数式更新state */}
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
    </>
  );
}

/* 
Hook 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数。Hook 不能在 class 组件中使用 —— 这使得你不使用 class 也能使用 React。（我们不推荐把你已有的组件全部重写，但是你可以在新组件里开始使用 Hook。）
*/
const HookRoot = () => {
  return (
    <div>
      <Example />
      <ExampleClass />
      <Counter initialCount={5} />
      <App />
      </div>
    )
}
export default HookRoot

