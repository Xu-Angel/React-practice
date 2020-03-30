import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import {connect} from './react-redux'
import { connect } from 'react-redux'
class Header extends Component {
  static contextTypes = { // 定义context
    store: PropTypes.object
  }
  // constructor() {
  //   super()
  //   this.state = {themeColor: ''}
  // }
  // componentWillMount() {
  //   this._updateThemeColor()
  // }
  // _updateThemeColor() {
  //   const { store } = this.context
  //   const state = store.getState()
  //   console.log(state);
  //   this.setState({themeColor: state.themeColor})
  // }
  render () {
    return (
      <h1 style={{color: this.props.themeColor}}>React-redux</h1>
    )
  }
}
const mapStateToProps = state => {
  return {
    themeColor: state.themeColor
  }
}
Header = connect(mapStateToProps)(Header)
export default Header