import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { toast } from 'react-toastify';
import { AppState } from '../../constants'
import axios from 'axios'

const LoginForm = (props) => {

  const [form, setForm] = useState({
    email: '',
    password: '',
    redirectTo: null,
    errorMessage: ''
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    axios.post('/auth/login', {
        email: form.email,
        password: form.password
      }).then(response => {
        if (response.status === 200) {
          props.updateUser(AppState.AUTHENTICATED, {
            email: response.data.email
          })
          setForm({
            ...form,
            redirectTo: '/'
          })
          toast.success("Login successfully!");
        }
      }).catch(error => {
        console.log(form);
        setForm({
          ...form,
          errorMessage: error.response.data.message
        })
      })
  }

  if (form.redirectTo) {
    return <Redirect to={{ pathname: form.redirectTo }} />
  } else {
    return (
      <div className="row m-0"> 
        <div className="card offset-4 col-4 p-0 text-center">
          <div className="card-header">Login</div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <input className="form-control"
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input className="form-control"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <div className="col-7"></div>
                <button
                  className="btn btn-primary"

                  onClick={handleSubmit}
                  type="submit">Login</button>
              </div>
              <p className="text-danger">{form.errorMessage}</p>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginForm
