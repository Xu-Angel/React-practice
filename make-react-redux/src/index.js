// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import Header from './Header'
import Content from './Content'
import './index.css'
// import {Provider} from "./react-redux"
import { createStore } from 'redux'
import { Provider } from 'react-redux'
// function createStore(reducer) {
//   let state = null
//   const listeners = []
//   const subscribe = listener => listeners.push(listener)
//   const getState = () => state
//   const dispatch = action => {
//     state = reducer(state, action)
//     listeners.forEach(listener => listener())
//   }
//   dispatch({})
//   return{getState, dispatch, subscribe}
// }
const themeReducer = (state, action) => {
  if (!state) return {
    themeColor: 'red'
  }
  switch (action.type) {
    case 'CHANGE_COLOR': 
      return{...state, themeColor: action.themeColor}
    default:
      return state
  }
}
const store = createStore(themeReducer)
// class Index extends Component {
//   static childContextTypes = { // 定组件的context
//     store: PropTypes.object
//   }
//   getChildContext () { // 子组件的context
//     return {store}
//   }
//   render () {
//     return (
//       <div>
//         <Header />
//         <Content />
//       </div>
//     )
//   }
// }
class Index extends Component {
  render() {
    return (
            <div>
        <Header />
        <Content />
      </div>
    )
  }
}
ReactDOM.render(
  <Provider store={store}>
    <Index />
  </Provider>
  ,
  document.getElementById('root')
)