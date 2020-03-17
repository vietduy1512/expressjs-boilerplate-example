import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';

const RegisterForm = () => {
  
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    errorMessage: ''
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/auth/register', {
      email: form.email,
      password: form.password
    }).then(response => {
        if (!response.data.errmsg) {
          setForm({
            redirectTo: '/login'
          })
          toast.success("Register successfully!");
        } else {
          setForm({
            errorMessage: 'Email is already taken'
          })
        }
      })
      .catch(error => {
        setForm({
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
          <div className="card-header">Register</div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <input className="form-control"
                  type="email"
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
                <button
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  type="submit"
                >Sign up</button>
              </div>
              <p className="text-danger">{form.errorMessage}</p>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default RegisterForm;