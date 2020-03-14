import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios';

class RegisterForm extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      errorMessage: ''
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
    axios.post('/auth/register', {
      email: this.state.email,
      password: this.state.password
    }).then(response => {
        if (!response.data.errmsg) {
          this.setState({
            redirectTo: '/login'
          })
        } else {
          this.setState({
            errorMessage: 'Email is already taken'
          })
        }
      })
      .catch(error => {
        this.setState({
          errorMessage: error.response.data.message
        })
      })
  }
  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {
      return (
        <div className="row"> 
          <div className="card offset-4 col-4 p-0 text-center">
            <div className="card-header">Register</div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <input className="form-control"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <input className="form-control"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <button
                    className="btn btn-primary"
                    onClick={this.handleSubmit}
                    type="submit"
                  >Sign up</button>
                </div>
                <p className="text-danger">{this.state.errorMessage}</p>
              </form>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default RegisterForm;