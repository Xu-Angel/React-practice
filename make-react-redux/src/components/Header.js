import React, { Component } from 'react'
import PropTypes from 'prop-types'
/**
 * dump组件，它除了依赖 React.js 什么都不依赖
 */
export default class Header extends Component {
  static propTypes = {
    themeColor: PropTypes.string
  }

  render () {
    return (
      <h1 style={{ color: this.props.themeColor }}>React.js 小书</h1>
    )
  }
}