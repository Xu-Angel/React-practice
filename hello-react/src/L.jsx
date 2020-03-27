
import React from "react";

class L extends React.Component {
  static defaultProps = {
    words: {
      likedText: '取消',
      unlikedText: '点赞'
    }
  }
  constructor() {
    super()
    this.state = { isLiked: false }
  }
  handleClick() {
    this.setState({ isLiked: !this.state.isLiked })
    if (this.props.onClick) {
      this.props.onClick()
    }
    this.props.words.likedText = '--------' // 这种改变props 里面的具体val  不报错（这里没有修改到props下的值）
    // this.props.words = {likedText: 'iii',unlikedText: 'yyy0'} 这种直接改变props 的会报错
  }
  render() {
    // console.log(this.props);
    const likedText = this.props.words.likedText
    const unlikedText = this.props.words.unlikedText
    if (this.props.onClick) {
      this.props.onClick()
    }
    return (
      <button onClick={(e) => { this.handleClick(e) }}>
        {this.state.isLiked ? likedText : unlikedText} 👍
      </button>
    )
  }
}
export default L