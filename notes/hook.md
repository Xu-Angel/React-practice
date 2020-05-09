# -

Hook 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数。**Hook 在 class 内部是不起作用的。但你可以使用它们来取代 class。** 如果你在编写函数组件并意识到需要向其添加一些 state，以前的做法是必须将其它转化为 class。现在你可以在现有的函数组件中使用 Hook。

## Hook使用规则

只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。

只能在 React 的函数组件中调用 Hook。不要在其他 JavaScript 函数中调用。（还有一个地方可以调用 Hook —— 就是自定义的 Hook 中

[linter 插件](https://www.npmjs.com/package/eslint-plugin-react-hooks)

## 自定义 Hook

有时候我们会想要在组件之间重用一些状态逻辑。目前为止，有两种主流方案来解决这个问题：高阶组件和 render props。自定义 Hook 可以让你在不增加组件的情况下达到同样的目的。

自定义 Hook 更像是一种约定而不是功能。如果函数的名字以 “use” 开头并调用其他 Hook，我们就说这是一个自定义 Hook

自定义 Hook 解决了以前在 React 组件中无法灵活共享逻辑的问题。你可以创建涵盖各种场景的自定义 Hook，如表单处理、动画、订阅声明、计时器，甚至可能还有其他我们没想到的场景。更重要的是，创建自定义 Hook 就像使用 React 内置的功能一样简单。

## useState

一种在函数调用时保存变量的方式

useState 会返回一对值：当前状态和一个让你更新它的函数，你可以在事件处理函数中或其他一些地方调用这个函数。它类似 class 组件的 this.setState，但是它不会把新的 state 和旧的 state 进行合并。

不必使用多个 state 变量。State 变量可以很好地存储对象和数组，因此，你仍然可以将相关数据分为一组。然而，不像 class 中的 this.setState，更新 state 变量总是替换它而不是合并它

- 参数  useState() 方法里面唯一的参数就是初始 state。不同于 class 的是，我们可以按照需要使用数字或字符串对其进行赋值，而不一定是对象。

- 返回值 当前 state 以及更新 state 的函数。
这与 class 里面 this.state.count 和 this.setState 类似

  ```js
    const [count, setCount] = useState() // 数组解构出参数
  ```

- 合并更新对象

  与 class 组件中的 setState 方法不同，useState 不会自动合并更新对象。你可以用函数式的 setState 结合展开运算符来达到合并更新对象的效果。

    ```js
    setState(prevState => {
    // 也可以使用 Object.assign
    return {...prevState, ...updatedValues};
  });
    ```

  useReducer 是另一种可选方案，它更适合用于管理包含多个子值的 state 对象。
- 惰性初始 state

  initialState 参数只会在组件的初始渲染中起作用，后续渲染时会被忽略。如果初始 state 需要通过复杂计算获得，则可以传入一个函数，在函数中计算并返回初始的 state，此函数只在初始渲染时被调用：
  ```js
  const [state, setState] = useState(() => {
    const initialState = someExpensiveComputation(props);
    return initialState;
  });
  ```
## Effect Hook

[hooks-effect](https://react.docschina.org/docs/hooks-effect.html)

在 React 组件中执行过数据获取、订阅或者手动修改过 DOM。我们统一把这些操作称为“副作用”，或者简称为“作用”。

*在 React 的 class 组件中，render 函数是不应该有任何副作用的。一般来说，在这里执行操作太早了，我们基本上都希望在 React 更新 DOM 之后才执行我们的操作,这就是为什么在 React class 中，我们把副作用操作放到 componentDidMount 和 componentDidUpdate 函数中。*

useEffect 就是一个 Effect Hook，给函数组件增加了操作副作用的能力。**它跟 class 组件中的 componentDidMount、componentDidUpdate 和 componentWillUnmount 具有相同的用途，只不过被合并成了一个 API。**

调用 useEffect 时，就是在告诉 React 在完成对 DOM 的更改后运行你的“副作用”函数。组件加载和更新时执行同样的操作。默认情况下，React 会在每次渲染后调用副作用函数 —— **包括第一次渲染的时候**。

与 componentDidMount 或 componentDidUpdate 不同，使用 useEffect 调度的 effect 不会阻塞浏览器更新屏幕

**副作用函数还可以通过返回一个函数来指定如何“清除”副作用,不过在第一次渲染的时候不会调用。** effect 的清除机制可以避免 componentDidUpdate 和 componentWillUnmount 中的重复，同时让相关的代码关联更加紧密，帮助我们避免一些 bug。我们还看到了我们如何根据 effect 的功能分隔他们，这是在 class 中无法做到的。

- 作用

  告诉 React 组件需要在渲染后执行某些操作。React 会保存你传递的函数（我们将它称之为 “effect”），并且在执行 DOM 更新之后调用它

- 为何要在内部进行useEffect 

  将 useEffect 放在组件内部让我们可以在 effect 中直接访问 count state 变量（或其他 props），Hook 使用了 JavaScript 的闭包机制，不用在 JavaScript 已经提供了解决方案的情况下，还引入特定的 React API

- useEffect 会在每次渲染后都执行吗

  是的，默认情况下，它在第一次渲染之后和每次更新之后都会执行。（我们稍后会谈到如何控制它。）你可能会更容易接受 effect 发生在“渲染之后”这种概念，不用再去考虑“挂载”还是“更新”。React 保证了每次运行 effect 的同时，DOM 都已经更新完毕。

- 通过跳过 Effect 进行性能优化

  在某些情况下，每次渲染后都执行清理或者执行 effect 可能会导致性能问题。**在 class 组件中，我们可以通过在** componentDidUpdate 中添加对 prevProps 或 prevState 的比较逻辑解决

  ```
      componentDidUpdate(prevProps, prevState) {
      if (prevState.count !== this.state.count) {
        document.title = `You clicked ${this.state.count} times`;
      }
    }
  ```
  hook中，只要传递数组作为 useEffect 的第二个可选参数即可：
    ```js
    useEffect(() => {
      document.title = `You clicked ${count} times`;
    }, [count]); // 仅在 count 更改时更新
    ```

  依赖数组中必须包含在 callback 内部用到的所有**参与 React 数据流的值**(没有变化的将可以不用管)，比如 state、props 以及它们的衍生物。如果有遗漏，可能会造成 bug。这其实就是 JS 闭包问题，对闭包不清楚的同学可以自行 google，这里就不展开了。
    ```js
    function Example({id, name}) {
      useEffect(() => {
        // 由于依赖数组中不包含 name，所以当 name 发生变化时，无法打印日志
        console.log(id, name); 
      }, [id]);
    }
    ```

    - 依赖数组依赖的值最好不要超过 3 个，否则会导致代码会难以维护。
    - 如果发现依赖数组依赖的值过多，我们应该采取一些方法来减少它。
      - 去掉不必要的依赖。
      - 将 Hook 拆分为更小的单元，每个 Hook 依赖于各自的依赖数组。
      - 通过合并相关的 state，将多个依赖值聚合为一个。
      - 通过 setState 回调函数获取最新的 state，以减少外部依赖。
      - 通过 ref 来读取可变变量的值，不过需要注意控制修改它的途径。

- effect 的执行时机

  与 componentDidMount、componentDidUpdate 不同的是，在浏览器完成布局与绘制之后，传给 useEffect 的函数会延迟调用。这使得它适用于许多常见的副作用场景，比如设置订阅和事件处理等情况，因此不应在函数中执行阻塞浏览器更新屏幕的操作。

  然而，并非所有 effect 都可以被延迟执行。例如，在浏览器执行下一次绘制前，用户可见的 DOM 变更就必须同步执行，这样用户才不会感觉到视觉上的不一致。（概念上类似于被动监听事件和主动监听事件的区别。）**React 为此提供了一个额外的 useLayoutEffect Hook 来处理这类 effect**。它和 useEffect 的结构相同，区别只是调用时机不同。

  虽然 useEffect 会在浏览器绘制后延迟执行，但会保证在任何新的渲染前执行。React 将在组件更新前刷新上一轮渲染的 effect。



## Hook 规则

[Hook 规则](https://react.docschina.org/docs/hooks-rules.html)

- 最顶层调用，不要在循环，条件或嵌套函数中调用 Hook， 确保总是在你的 React 函数的最顶层调用他们。遵守这条规则，你就能确保 Hook 在每一次渲染中都按照同样的顺序被调用。这让 React 能够在多次的 useState 和 useEffect 调用之间保持 hook 状态的正确。

- 单个组件中使用多个 Hook

    ```js
    function Form() {
      // 1. Use the name state variable
      const [name, setName] = useState('Mary');

      // 2. Use an effect for persisting the form
      useEffect(function persistForm() {
        localStorage.setItem('formData', name);
      });

      // 3. Use the surname state variable
      const [surname, setSurname] = useState('Poppins');

      // 4. Use an effect for updating the title
      useEffect(function updateTitle() {
        document.title = name + ' ' + surname;
      });

      // ...
    }
    ```
  React 靠的是 Hook 调用的顺序。因为我们的示例中，Hook 的调用顺序在每次渲染中都是相同的

     ```js
     // ------------
    // 首次渲染
    // ------------
    useState('Mary')           // 1. 使用 'Mary' 初始化变量名为 name 的 state
    useEffect(persistForm)     // 2. 添加 effect 以保存 form 操作
    useState('Poppins')        // 3. 使用 'Poppins' 初始化变量名为 surname 的 state
    useEffect(updateTitle)     // 4. 添加 effect 以更新标题
    // -------------
    // 二次渲染
    // -------------
    useState('Mary')           // 1. 读取变量名为 name 的 state（参数被忽略）
    useEffect(persistForm)     // 2. 替换保存 form 的 effect
    useState('Poppins')        // 3. 读取变量名为 surname 的 state（参数被忽略）
    useEffect(updateTitle)     // 4. 替换更新标题的 effect
    ```

## Hook API

*   [基础 Hook](#basic-hooks)
    
    *   [`useState`](#usestate)
    *   [`useEffect`](#useeffect)
    *   [`useContext`](#usecontext)
*   [额外的 Hook](#additional-hooks)
    
    *   [`useReducer`](#usereducer)
    *   [`useCallback`](#usecallback)
    *   [`useMemo`](#usememo)
    *   [`useRef`](#useref)
    *   [`useImperativeHandle`](#useimperativehandle)
    *   [`useLayoutEffect`](#uselayouteffect)
    *   [`useDebugValue`](#usedebugvalue)

## FAQ

[FAQ](https://react.docschina.org/docs/hooks-faq.html)