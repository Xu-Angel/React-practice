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

/* 
不同的模块（组件）之间确实需要共享数据，这些模块（组件）还可能需要修改这些共享数据，就像上一节的“主题色”状态（themeColor）。这里的矛盾就是：“模块（组件）之间需要共享数据”，和“数据可能被任意修改导致不可预料的结果”之间的矛盾。

让我们来想办法解决这个问题，我们可以学习 React.js 团队的做法，把事情搞复杂一些，提高数据修改的门槛：模块（组件）之间可以共享数据，也可以改数据。但是我们约定，这个数据并不能直接改，你只能执行某些我允许的某些修改，而且你修改的必须大张旗鼓地告诉我。
*/

// v1.0 只能通过dispatch  中间人 来进行修改state
// function dispatch(action) {
//   switch (action.type) {
//   case 'UPDATE_TITLE_TEXT':
//     appState.title.text = action.text
//     break
//   case 'UPDATE_TITLE_COLOR':
//     appState.title.color = action.color
//     break
//   default:
//     break
//   }
// }
// const appState = {
//   title: {
//     text: 'React.js 小书',
//     color: 'red',
//   },
//   content: {
//     text: 'React.js 小书内容',
//     color: 'blue'
//   }
// }

// function renderApp(appState) {
//   renderTitle(appState.title)
//   renderContent(appState.content)
// }

// function renderTitle(title) {
//   const titleDOM = document.getElementById('title')
//   titleDOM.innerHTML = title.text
//   titleDOM.style.color = title.color
// }

// function renderContent(content) {
//   const contentDOM = document.getElementById('content')
//   contentDOM.innerHTML = content.text
//   contentDOM.style.color = content.color
// }

// renderApp(appState)
// setTimeout(() => {
//   dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' })
//   dispatch({ type: 'UPDATE_TITLE_TEXT', text: 'dispatch chagen you' })
//   renderApp(appState)
// }, 3000)

// v1.5 通过store 工厂来实现

// let appState = {
//   title: {
//     text: 'React.js 小书',
//     color: 'red',
//   },
//   content: {
//     text: 'React.js 小书内容',
//     color: 'blue'
//   }
// }
// const store = createStore(appState, stateChanger)

// store.subscribe(() => renderApp(store.getState())) // 监听数据变化

// renderApp(store.getState()) // 首次渲染页面
// setTimeout(() => {
//   store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' }) // 修改标题文本
//   store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }) // 修改标题颜色
//   // renderApp(store.getState()) 通过subscribe 来实现监听数据变化
// }, 3000)

// function createStore(state, stateChanger) {
//   const listeners = []
//   const subscribe = listener => listeners.push(listener)
//   const getState = () => state
//   const dispatch = action => {
//     stateChanger(state, action)
//     listeners.forEach(listener => listener())
//   }
//   return { getState, dispatch, subscribe }
// }

// function stateChanger(state, action) {
//   switch (action.type) {
//   case 'UPDATE_TITLE_TEXT':
//     state.title.text = action.text
//     break
//   case 'UPDATE_TITLE_COLOR':
//     state.title.color = action.color
//     break
//   default:
//     break
//   }
// }

// function renderApp(appState) {
//   renderTitle(appState.title)
//   renderContent(appState.content)
// }

// function renderTitle(title) {
//   const titleDOM = document.getElementById('title')
//   titleDOM.innerHTML = title.text
//   titleDOM.style.color = title.color
// }

// function renderContent(content) {
//   const contentDOM = document.getElementById('content')
//   contentDOM.innerHTML = content.text
//   contentDOM.style.color = content.color
// }
// v1.6 优化性能

function createStore (state, stateChanger) {
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  const dispatch = (action) => {
    state = stateChanger(state, action) // 覆盖原对象
    listeners.forEach((listener) => listener())
  }
  return { getState, dispatch, subscribe }
}

function renderApp (newAppState, oldAppState = {}) { // 防止 oldAppState 没有传入，所以加了默认参数 oldAppState = {}
  if (newAppState === oldAppState) return // 数据没有变化就不渲染了
  console.log('render app...')
  renderTitle(newAppState.title, oldAppState.title)
  renderContent(newAppState.content, oldAppState.content)
}

function renderTitle (newTitle, oldTitle = {}) {
  if (newTitle === oldTitle) return // 数据没有变化就不渲染了
  console.log('render title...')
  const titleDOM = document.getElementById('title')
  titleDOM.innerHTML = newTitle.text
  titleDOM.style.color = newTitle.color
}

function renderContent (newContent, oldContent = {}) {
  if (newContent === oldContent) return // 数据没有变化就不渲染了
  console.log('render content...')
  const contentDOM = document.getElementById('content')
  contentDOM.innerHTML = newContent.text
  contentDOM.style.color = newContent.color
}

let appState = {
  title: {
    text: 'React.js 小书',
    color: 'red',
  },
  content: {
    text: 'React.js 小书内容',
    color: 'blue'
  }
}

function stateChanger (state, action) {
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      return { // 构建新的对象并且返回
        ...state,
        title: {
          ...state.title,
          text: action.text
        }
      }
    case 'UPDATE_TITLE_COLOR':
      return { // 构建新的对象并且返回
        ...state,
        title: {
          ...state.title,
          color: action.color
        }
      }
    default:
      return state // 没有修改，返回原来的对象
  }
}

const store = createStore(appState, stateChanger)
let oldState = store.getState() // 缓存旧的 state
store.subscribe(() => {
  const newState = store.getState() // 数据可能变化，获取新的 state
  renderApp(newState, oldState) // 把新旧的 state 传进去渲染
  oldState = newState // 渲染完以后，新的 newState 变成了旧的 oldState，等待下一次数据变化重新渲染
})

renderApp(store.getState()) // 首次渲染页面
store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' }) // 修改标题文本
store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }) // 修改标题颜色