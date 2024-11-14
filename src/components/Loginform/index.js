import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Loginform extends Component {
  state = {username: '', password: '', showmsg: false, error: ''}

  passwordchanged = event => {
    this.setState({password: event.target.value})
  }

  usernamechanged = event => {
    this.setState({username: event.target.value})
  }

  successful = jwt => {
    Cookies.set('jwt_token', jwt, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  fail = error => {
    this.setState({error, showmsg: true})
  }

  formsubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const option = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, option)
    const data = await response.json()
    if (response.ok) {
      this.successful(data.jwt_token)
    } else {
      this.fail(data.error_msg)
    }
  }

  getform = () => {
    const {username, password, showmsg, error} = this.state
    return (
      <form onSubmit={this.formsubmit}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="logo"
        />
        <div className="label">
          <label htmlFor="username">USERNAME</label>
          <input
            id="username"
            type="text"
            value={username}
            placeholder="Username"
            onChange={this.usernamechanged}
          />
        </div>
        <div className="label">
          <label htmlFor="password">PASSWORD</label>
          <input
            id="password"
            type="password"
            value={password}
            placeholder="Password"
            onChange={this.passwordchanged}
          />
        </div>
        <button type="submit" className="loginbtn">
          Login
        </button>
        {showmsg && <p className="errormsg">*{error}</p>}
      </form>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return <div className="bg">{this.getform()}</div>
  }
}
export default Loginform
