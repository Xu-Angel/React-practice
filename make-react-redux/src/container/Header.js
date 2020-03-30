import { connect } from 'react-redux'
import Header from '../components/Header'
/* 
我们规定：所有的 Dumb 组件都放在 components/ 目录下，所有的 Smart 的组件都放在 containers/ 目录下，这是一种约定俗成的规则。
*/
/* 
这样我们就把 Dumb 组件抽离出来了，现在 src/components/Header.js 可复用性非常强，别的同事可以随意用它。而 src/containers/Header.js 则是跟业务相关的，我们只用在特定的应用场景下。我们可以继续用这种方式来重构其他组件。
*/
/**
 * smart组件 和context 扯上关系，不仅仅依赖react
 * @param {*} state 
 */
const mapStateToProps = (state) => {
  return {
    themeColor: state.themeColor
  }
}
export default connect(mapStateToProps)(Header)