import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import axios from 'axios';

const RegisterForm = () => {

  const { addToast } = useToasts();

  const [form, setForm] = useState({
    email: '',
    fullname: '',
    password: '',
    confirmPassword: ''
  });
  const [errorMessage, setErrorMessage] = useState([]);
  const [redirectTo, setRedirectTo] = useState(null);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/auth/register', form).then(response => {
        if (!response.data.errmsg) {
          setRedirectTo('/login');
          addToast("Register successfully!", { appearance: 'success', autoDismiss: true, });
        } else {
          setErrorMessage(['Email is already taken']);
        }
      })
      .catch(error => {
        if (!error.response || !error.response.data) {
          setErrorMessage(['Something went wrong']);
          return;
        }

        switch (error.response.status) {
          case 401:
            setErrorMessage(error.response.data.errors.map(err => err.msg));
            break;
          case 400:
            setErrorMessage(error.response.data.errors.map(err => err.msg));
            break;
          default:
            break;
        }
      })
  }

  if (redirectTo) {
    return <Redirect to={{ pathname: redirectTo }} />
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
                  type="text"
                  name="fullname"
                  placeholder="Fullname"
                  value={form.fullname}
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
                  autoComplete="on"
                />
              </div>
              <div className="form-group">
                <input className="form-control"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  autoComplete="on"
                />
              </div>
              <div className="form-group">
                <button
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  type="submit"
                >Sign up</button>
              </div>
              <div className="text-danger">{errorMessage.map(msg => <p>{msg}</p>)}</div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default RegisterForm;