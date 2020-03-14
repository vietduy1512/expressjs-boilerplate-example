import React, { Component } from 'react'
import axios from 'axios';

class SignupForm extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',

    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log('sign-up-form, email: ');
    console.log(this.state.email);
    axios.post('/auth/register', {
      email: this.state.email,
      password: this.state.password
    })
      .then(response => {
        console.log(response)
        if (!response.data.errmsg) {
          console.log('successful signup')
          this.setState({
            redirectTo: '/login'
          })
        } else {
          console.log('email already taken')
        }
      })
  }
  render() {

    return (
      <div className="SignupForm">
        <h4>Sign up</h4>
        <form className="justify-content-center">
          <div className="form-group">
            <div className="col-12">
              <input className="form-input"
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-12">
              <input className="form-input"
                placeholder="password"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-12"></div>
            <button
              className="btn btn-primary col-1 col-mr-auto"
              onClick={this.handleSubmit}
              type="submit"
            >Sign up</button>
          </div>
        </form>
      </div>
    )
  }
}

export default SignupForm