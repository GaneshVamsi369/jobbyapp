import Cookies from 'js-cookie'
import {Route, Redirect} from 'react-router-dom'

const Protectedroute = props => {
  const jwt = Cookies.get('jwt_token')
  if (jwt === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}
export default Protectedroute
