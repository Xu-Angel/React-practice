import React from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
import WrapWithData from './WrapWithData'
// 我们遵循一个原则：如果一个文件导出的是一个类，那么这个文件名就用大写开头。四个组件类文件导出都是类，所以都是大写字母开头。
// 我们先铺垫一些基础代码，让组件之间的关系清晰起来。遵循“自顶而下，逐步求精”的原则，我们从组件的顶层开始，再一步步往下构建组件树
class CommentApp extends React.Component {
  constructor() {
    super()
    this.state = {
      comments: []
    }
  }
  /* 通过HOC  （设计模式中的装饰者模式） */
  // componentDidMount() {
  //   this._loadComments()
  // }
  // _loadComments () {
  //   let comments = localStorage.getItem('comments')
  //   if (comments) {
  //     comments = JSON.parse(comments)
  //     this.setState({ comments })
  //   }
  // }
  // _saveComments (comments) {
  //   localStorage.setItem('comments', JSON.stringify(comments))
  // }
  handleDeleteComment (index) {
    const comments = this.state.comments
    comments.splice(index, 1)
    // this.setState({ comments })
    // this._saveComments(comments)
  }
  handleSubmitComment(c) {
    if (!c) return
    if (!c.username) return alert('请输入用户名')
    if (!c.content) return alert('请输入评论内容')
    const {comments} = this.state
    comments.push(c)
    this.setState({
      comments
    })
    // this.setState({ comments })
    // this._saveComments(comments)
  }
  render() {
    return (
      <div className='wrapper'>
        <CommentInput onSubmit={this.handleSubmitComment.bind(this)}></CommentInput>
        {/* 当某个状态被多个组件依赖或者影响的时候，就把该状态提升到这些组件的最近公共父组件中去管理，用 props 传递数据或者函数来管理这种依赖或着影响的行为。遇到这种情况，我们将这种组件之间共享的状态交给组件最近的公共父节点保管，然后通过 props 把状态传递给子组件，这样就可以在组件之间共享数据了。 */}
        <CommentList comments={this.state.comments} onDeleteComment={this.handleDeleteComment.bind(this)}></CommentList>
      </div>
    )
  }
}
CommentApp = WrapWithData(CommentApp, 'comments')
export default CommentApp