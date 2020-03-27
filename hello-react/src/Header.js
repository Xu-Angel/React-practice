import React from 'react'
class Header extends React.Component {
  constructor () {
    super()
    console.log('construct')
  }

  componentWillMount () {
    console.log('component will mount')
  }

  componentDidMount () {
    console.log('component did mount')
  }
  componentWillUnmount() {
    console.log('component will unmount')
  }
  render () {
    console.log('render')
    return (
      <div>
        <h1 className='title'>Header</h1>
      </div>
    )
  }
}

export default Header