import React,{useContext} from 'react';
import { Route, Navigate } from 'react-router-dom';
import withAuth from './withAuth';
import {AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ component: Component,children, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);

  // return (
  //   <Route
  //     {...rest}
  //     element={(props) =>
  //       isAuthenticated ? (
  //         <Component {...props} />
  //       ) : (
  //         <Navigate to={{ pathname: '/login', state: { from: props.location } }} />
  //       )
  //     }
  //   />
  // );
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;