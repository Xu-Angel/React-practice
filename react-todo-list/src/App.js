// https://zh-hans.react.dev/learn/scaling-up-with-reducer-and-context
import AddTask from './AddTask.js'
import TaskList from './TaskList.js'
import { TasksProvider } from './TasksContext.js'
import Canvas from './Pointer'
export default function TaskApp() {
  return (
    <TasksProvider>
      <h1>Day off in Kyoto</h1>
      <AddTask />
      <TaskList />
      <Canvas />
    </TasksProvider>
  )
}
