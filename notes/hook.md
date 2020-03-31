# -

Hook 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数。**Hook 不能在 class 组件中使用 —— 这使得你不使用 class 也能使用 React。**（我们不推荐把你已有的组件全部重写，但是你可以在新组件里开始使用 Hook。）

## useState

useState 会返回一对值：当前状态和一个让你更新它的函数，你可以在事件处理函数中或其他一些地方调用这个函数。它类似 class 组件的 this.setState，但是它不会把新的 state 和旧的 state 进行合并。

```js
const [count, setCount] = useState(0)
```
## Effect Hook

在 React 组件中执行过数据获取、订阅或者手动修改过 DOM。我们统一把这些操作称为“副作用”，或者简称为“作用”。

useEffect 就是一个 Effect Hook，给函数组件增加了操作副作用的能力。**它跟 class 组件中的 componentDidMount、componentDidUpdate 和 componentWillUnmount 具有相同的用途，只不过被合并成了一个 API。**

调用 useEffect 时，就是在告诉 React 在完成对 DOM 的更改后运行你的“副作用”函数。默认情况下，React 会在每次渲染后调用副作用函数 —— **包括第一次渲染的时候**。

副作用函数还可以通过返回一个函数来指定如何“清除”副作用,不过在第一次渲染的时候不会调用。