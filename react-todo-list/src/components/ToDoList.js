function ToDOInput(props) {
  const { addTodo } = props // 解构出事件 addTodo
  function addTodoHandler() {
    addTodo('some text') // 执行事件 addTodo ，随便传入参数
  }

  return (
    <div>
      <p onClick={addTodoHandler}>todo list</p>
    </div>
  )
}
export default ToDOInput
