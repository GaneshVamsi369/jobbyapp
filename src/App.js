import {Switch, Route, Redirect} from 'react-router-dom'
import Loginform from './components/Loginform'
import Protectedroute from './components/Protectedroute'
import Home from './components/Home'
import Jobs from './components/Jobs'
import JobItemDetails from './components/JobItemDetails'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Loginform} />
    <Protectedroute exact path="/" component={Home} />
    <Protectedroute exact path="/jobs" component={Jobs} />
    <Protectedroute exact path="/jobs/:id" component={JobItemDetails} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
