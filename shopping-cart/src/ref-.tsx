import {useState, useEffect, useRef, useCallback} from 'react'
import React from 'react';
export function Counter() {
  let [count, setCount] = useState(0);
  // ，useRef() 比 ref 属性更有用。它可以很方便地保存任何可变值，其类似于在 class 中使用实例字段的方式。「ref」 对象是一个 current 属性可变且可以容纳任意值的通用容器，类似于一个 class 的实例属性。
  /* 
  为它创建的是一个普通 Javascript 对象。而 useRef() 和自建一个 {current: ...} 对象的唯一区别是，useRef 会在每次渲染时返回同一个 ref 对象。

  请记住，当 ref 对象内容发生变化时，useRef 并不会通知你。变更 .current 属性不会引发组件重新渲染。如果想要在 React 绑定或解绑 DOM 节点的 ref 时运行某些代码，则需要使用回调 ref 来实现。

  */
  const prevCountRef: {current: number | undefined} = useRef();
  useEffect(() => {
    prevCountRef.current = count;
  });
  const prevCount = prevCountRef.current;
  const click = () => {
    setCount(count++)
  }
  return (
    <>
      <button onClick={click}>xxx</button>
      <h1>Now: {count}, before: {prevCount}</h1>
    </>
  )
}

export function MeasureExample() {
  const [height, setHeight] = useState(0)
  // !  请记住，当 ref 对象内容发生变化时，useRef 并不会通知你。变更 .current 属性不会引发组件重新渲染。如果想要在 React 绑定或解绑 DOM 节点的 ref 时运行某些代码，则需要使用回调 ref 来实现。
  // 获取 DOM 节点的位置或是大小的基本方式是使用 callback ref。每当 ref 被附加到一个另一个节点，React 就会调用 callback。
  const measureRef = useCallback(node => {
    console.log(node)
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height)
    }
  }, [])
  return (
    <>
      <h1 ref={measureRef}>hello</h1>
      <h2>hello 's height {Math.round(height)} px tall</h2>
    </>
  )
}
