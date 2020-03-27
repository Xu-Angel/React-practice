[生命周期中willMount 已被推荐到DidMount](https://fb.me/react-unsafe-component-lifecycles)
```
Warning: componentWillMount has been renamed, and is not recommended for use. See https://fb.me/react-unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 17.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.
```

一般来说，所有关于组件自身的状态的初始化工作都会放在 constructor 里面去做

一些组件启动的动作，包括像 Ajax 数据的拉取操作、一些定时器的启动等，就可以放在 ~~componentWillMount~~ componentDidMount里面进行，例如 Ajax

~~我们一般会把组件的 state 的初始化工作放在 constructor 里面去做；在 componentWillMount 进行组件的启动工作，例如 Ajax 数据拉取、定时器的启动；组件从页面上销毁的时候，有时候需要一些数据的清理，例如定时器的清理，就会放在 componentWillUnmount 里面去做。~~

~~说一下本节没有提到的 componentDidMount 。一般来说，有些组件的启动工作是依赖 DOM 的，例如动画的启动，而 componentWillMount 的时候组件还没挂载完成，所以没法进行这些启动工作，这时候就可以把这些操作放在 componentDidMount 当中。componentDidMount 的具体使用我们会在接下来的章节当中结合 DOM 来讲~~

## 更新阶段的组件生命周期

从之前的章节我们了解到，组件的挂载指的是将组件渲染并且构造 DOM 元素然后插入页面的过程。_这是一个从无到有的过程_，React.js 提供一些生命周期函数可以给我们在这个过程中做一些操作。

除了挂载阶段，还有一种“更新阶段”。说白了就是 `setState` 导致 React.js 重新渲染组件并且把组件的变化应用到 DOM 元素上的过程，_这是一个组件的变化过程_。而 React.js 也提供了一系列的生命周期函数可以让我们在这个组件更新的过程执行一些操作。

这些生命周期在深入项目开发阶段是非常重要的。而要完全理解更新阶段的组件生命周期是一个需要经验和知识积累的过程，你需要对 Virtual-DOM 策略有比较深入理解才能完全掌握，但这超出了本书的目的。_本书的目的是为了让大家快速掌握 React.js 核心的概念，快速上手项目进行实战_。所以对于组件更新阶段的组件生命周期，我们简单提及并且提供一些资料给大家。

这里为了知识的完整，补充关于更新阶段的组件生命周期：

1.  `shouldComponentUpdate(nextProps, nextState)`：你可以通过这个方法控制组件是否重新渲染。如果返回 `false` 组件就不会重新渲染。这个生命周期在 React.js 性能优化上非常有用。
2.  `componentWillReceiveProps(nextProps)`：组件从父组件接收到新的 `props` 之前调用。
3.  `componentWillUpdate()`：组件开始重新渲染之前调用。
4.  `componentDidUpdate()`：组件重新渲染并且把更改变更到真实的 DOM 以后调用。

大家对这更新阶段的生命周期比较感兴趣的话可以查看[官网文档](https://facebook.github.io/react/docs/react-component.html)。

_但这里建议大家可以先简单了解 React.js 组件是有更新阶段的，并且有这么几个更新阶段的生命周期即可_。然后在深入项目实战的时候逐渐地掌握理解他们，现在并不需要对他们放过多的精力。

有朋友对 Virtual-DOM 策略比较感兴趣的话，可以参考这篇博客：[深度剖析：如何实现一个 Virtual DOM 算法](https://github.com/livoras/blog/issues/13) 。对深入理解 React.js 核心算法有一定帮助。
