import { Route, Redirect } from 'react-router-dom';
import Login from './auth/Login';

const ApplicationViews = props => {
  const hasUser = props.hasUser;
  const setUser = props.setUser;
  let userId = ""
  if(hasUser) {
    userId = JSON.parse(sessionStorage.getItem("credentials")).id
  }
  return (
    <>
      <Route path='/login' render={props => {
        return <Login setUser={setUser} {...props}/>
      }}
      />
      <Route exact path='/products' render={props => {
        if(hasUser) {
          return <ProductList userId={userId} {...props}/>
        } else {
          return <Redirect to="Login"/>
        }
      }}
      />
    </>
  )
}