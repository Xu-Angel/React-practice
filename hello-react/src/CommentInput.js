import React from 'react'
import propTypes from 'prop-types'
class CommentInput extends React.Component {
  static propTypes = {
    onSubmit: propTypes.func
  }
  constructor() {
    super()
    this.state = {
      username: '',
      content: ''
    }
  }
  componentDidMount() {
    this._loadUsername()
    this.textarea.focus()
  }
  // componentWillMount() {
  // }
  /* 
  类似于 <input />、<select />、<textarea> 这些元素的 value 值被 React.js 所控制、渲染的组件，在 React.js 当中被称为受控组件（Controlled Component）。对于用户可输入的控件，一般都可以让它们成为受控组件，这是 React.js 所推崇的做法。
  */
  handleUsernameChange(e) {
    this.setState({
      username: e.target.value
    })
  }
  handleContentChange(e) {
    this.setState({
      content: e.target.value
    })
  }
  _loadUsername () {
    const username = localStorage.getItem('username')
    if (username) {
      this.setState({ username })
    }
  }
  handleUsernameBlur(e) {
    localStorage.setItem('username', e.target.value)
  }
  handleSubmit() {/* 子组件通过函数回调传递数据给父组件 */
    if (this.props.onSubmit) {
      const {username, content} = this.state
      this.props.onSubmit({ username, content, createdTime: +new Date() })
      this.setState({content: ''})
    }
  }
  render() {
    return (
      <div className='comment-input'>
      <div className='comment-field'>
        <span className='comment-field-name'>用户名：</span>
        <div className='comment-field-input'>
            <input value={this.state.username} onChange={(e) => { this.handleUsernameChange(e) }} onBlur={this.handleUsernameBlur.bind(this)}/>
        </div>
      </div>
      <div className='comment-field'>
        <span className='comment-field-name'>评论内容：</span>
        <div className='comment-field-input'>
            <textarea ref={(textarea) => this.textarea = textarea} value={this.state.content} onChange={(e) => {this.handleContentChange(e)}}/>
        </div>
      </div>
      <div className='comment-field-button'>
        <button onClick={this.handleSubmit.bind(this)}>
          发布
        </button>
      </div>
    </div>
    )
  }
}
export default CommentInput