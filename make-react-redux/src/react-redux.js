import React, { Component } from 'react'
import PropTypes from 'prop-types'
/**
 * 连接函数
 * 整合组件state,dispatch通过HOC 进行与store 统一交互，返回新组件
 * @param {*} mapStateToProps 
 * @param {*} mapDispatchToProps 
 */
export const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
  class Connect extends Component {
    static contextTypes = {
      store: PropTypes.object
    }
    constructor() {
      super()
      this.state = { allProps: {} }
    }
    componentWillMount() {
      const { store } = this.context
      this._updateProps()
      store.subscribe(() => this._updateProps())
    }
    _updateProps() {
      const { store } = this.context
      let stateProps = mapStateToProps ? mapStateToProps(store.getState(), this.props) : {}
      let dispatchProps = mapDispatchToProps ? mapDispatchToProps(store.dispatch, this.props) : {}
      this.setState({
        allProps: {
          ...stateProps,
          ...dispatchProps,
          ...this.props
        }
      })
    }
    render() {
      // const { store } = this.context
      // let stateProps = mapStateToProps(store.getState())
      // {...stateProps} 意思是把这个对象里面的属性全部通过 `props` 方式传递进去
      return <WrappedComponent { ...this.state.allProps }
      />
    }
  }
  return Connect
}
/**
 * context + store 包装
 * 容器组件
 */
export class Provider extends Component {
  static propTypes = {
    store: PropTypes.object,
    children: PropTypes.any
  }
  static childContextTypes = {
    store: PropTypes.object
  }
  getChildContext() {
    return {store: this.props.store}
  }

  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}