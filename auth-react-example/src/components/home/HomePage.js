import React, { Component } from 'react'
import axios from 'axios'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      dataList: null
    };
  }

  componentDidMount() {
    axios.get('/data').then(res => {
      this.setState({
        title: res.title,
        dataList: res.data
      })
    })
  }

  render() {
    return (
      <div className="text-center">
        <p>Home Page</p>
        <p>{this.state.title}</p>
      </div>
    )
  }
}

export default Home
