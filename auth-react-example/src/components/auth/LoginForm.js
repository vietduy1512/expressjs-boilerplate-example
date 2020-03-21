import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import { connect } from 'react-redux';
import { login } from 'actions/appAction'
import axios from 'axios'

const LoginForm = (props) => {

  const { addToast } = useToasts();

  const [form, setForm] = useState({
    email: '',
    password: ''
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
    event.preventDefault()
    axios.post('/auth/login', {
        email: form.email,
        password: form.password
      }).then(response => {
        if (response.status === 200) {
          let user = response.data;
          props.login(user);
          setRedirectTo('/');
          addToast('Login successfully!', { appearance: 'success', autoDismiss: true, });
        }
      }).catch(error => {
        // TODO
        if (!error.response || !error.response.data || !error.response.data) {
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
                  autoComplete="on"
                />
              </div>
              <div className="form-group">
                <div className="col-7"></div>
                <button
                  className="btn btn-primary"

                  onClick={handleSubmit}
                  type="submit">Login</button>
              </div>
              <div className="text-danger">{errorMessage.map(msg => <p>{msg}</p>)}</div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  appState: state.app.state,
  currentUser: state.app.user
});

export default connect(mapStateToProps, { login })(LoginForm);