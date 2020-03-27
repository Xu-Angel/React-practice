import React from 'react'
import Comment from './Comment'
import PropTypes from 'prop-types'
class CommentList extends React.Component {
  static defaultProps = {
    comments: PropTypes.arrat,
    onDeleteComment: PropTypes.func
  }
  static defaultProps = {
    comments: []
  }
  handleDeleteComment (index) {
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(index)
    }
  }
  render() {
    return (
      <div>
        {this.props.comments.map((comment, i) =>
          <Comment comment={comment} key={i}
          onDeleteComment={this.handleDeleteComment.bind(this)}/>
        )}
      </div>)
  }
}
export default CommentList