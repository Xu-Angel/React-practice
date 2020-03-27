## JSX

要记住几个点：

JSX 是 JavaScript 语言的一种语法扩展，长得像 HTML，但并不是 HTML。
React.js 可以用 JSX 来描述你的组件长什么样的。
JSX 在编译的时候会变成相应的 JavaScript 对象描述。
react-dom 负责把这个用来描述 UI 信息的 JavaScript 对象变成 DOM 元素，并且渲染到页面上。

## JSX 可放什么

JSX 的 {} 内可以嵌入任何表达式，{{}} 就是在 {} 内部用对象字面量返回一个对象而已。
JSX 的表达式插入可以在标签属性上使用。所以其实可以把任何类型的数据作为组件的参数，包括字符串、数字、对象、数组、甚至是函数等等

## 自定义组件 

自定义的组件都必须要用大写字母开头，普通的 HTML 标签都用小写字母开头。

## 组件内容编写顺序推荐

1. static 开头的类属性，如 defaultProps、propTypes。
2. 构造函数，constructor。
3. getter/setter（还不了解的同学可以暂时忽略）。
4. 组件生命周期。
5. _ 开头的私有方法。
6. 事件监听方法，handle*。
7. render*开头的方法，有时候 render() 方法里面的内容会分开到不同函数里面进行，这些函数都以 render* 开头。
8. render() 方法。

