import { Route, Redirect } from 'react-router-dom';
import React from 'react';
import Login from './auth/Login';
import ProductList from './products/ProductList';
import ProductDetail from './products/ProductDetail';
import ProductForm from './products/ProductForm';
import LocationList from './locations/LocationList';
import EmployeeList from './employees/EmployeeList';
import EmployeeDetail from './employees/EmployeeDetail';

const ApplicationViews = props => {
  const hasEmployee = props.hasEmployee;
  const setEmployee = props.setEmployee;
  let employeeId = ""
  if(hasEmployee) {
    employeeId = JSON.parse(sessionStorage.getItem("credentials")).id
  }
  return (
    <>
      <Route path='/login' render={props => {
        return <Login setEmployee={setEmployee} {...props}/>
      }}
      />
      <Route exact path='/' render={props => {
        if(hasEmployee) {
          return <ProductList setEmployee={setEmployee} {...props}/>
        } else {
          return <Redirect to="/Login"/>
        }
      }}
      />
      <Route exact path='/products' render={props => {
        if(hasEmployee) {
          return <ProductList employeeId={employeeId} {...props}/>
        } else {
          return <Redirect to="Login"/>
        }
      }}
      />
      <Route path="/products/:productId(\d+)/details" render={props => {
        if(hasEmployee) {
          return <ProductDetail {...props}/>
        } else {
          return <Redirect to="/Login"/>
        }
      }}
      />
      <Route exact path="/products/productForm/:productId(\d+)" render={
        props => {
          if(hasEmployee) {
            return <ProductForm {...props}/>
          } else {
            return <Redirect to="/Login"/>
          }
        }}
      />
      <Route exact path="/products/productForm" render={
        props => {
          if(hasEmployee) {
            return <ProductForm {...props}/>
          } else {
            return <Redirect to="/Login"/>
          }
        }}
      />
      <Route exact path="/locations" render={
        props => {
          if(hasEmployee) {
            return <LocationList {...props}/>
          } else {
            return <Redirect to="/Login"/>
          }
        }}
      />
      <Route exact path="/employees" render={
        props => {
          if(hasEmployee) {
            return <EmployeeList {...props}/>
          } else {
            return <Redirect to="/Login"/>
          }
        }}
      />
      <Route path="/employees/:employeeId(\d+)/details" render={props => {
        if(hasEmployee) {
          return <EmployeeDetail {...props}/>
        } else {
          return <Redirect to="/Login"/>
        }
      }}
      />
    </>
  )
}

export default ApplicationViews;