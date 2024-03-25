// src/components/TodoInput.js

import { useState } from 'react'

function TodoInput(props) {
  const { addTodo } = props
  function addTodoHandler() {
    addTodo('some text')
  }

  const [count, setCount] = useState(0)
  function increase() {
    setCount(count + 1) //【注意】这里不能写 count++ ，必须执行 setCount 函数，并传入最新的值
  }
  return (
    <div>
      <button onClick={increase}>{count}</button>
      <p onClick={addTodoHandler}>todo input</p>
    </div>
  )
}
export default TodoInput
