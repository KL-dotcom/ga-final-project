import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'


import Register from './components/authentication/Register'
import Login from './components/authentication/Login'
import Navbar from './components/common/Navbar'
import Home from './components/common/Home'
import Footer from './components/common/Footer'
import Profile from './components/user/Profile'
import EventShow from './components/events/EventShow'
import EventIndex from './components/events/EventIndex'
import EventNew from './components/events/EventNew'
import EventEdit from './components/events/EventEdit'
import ErrorPage from './components/common/Error'


const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path="/events/new" component={EventNew} />
        <Route path="/events/:id/edit" component={EventEdit} />
        <Route path="/events/:id" component={EventShow} />
        <Route path="/events" component={EventIndex} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={Profile} />
        <Route path="/*" component={ErrorPage} />
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

export default App
