import React, { useState } from 'react';
import NavigationBar from './nav/NavBar';
import ApplicationViews from './ApplicationViews';

const KandyKorner = () => {
  const isAuthenticated = () => sessionStorage.getItem("credentials") !== null;
  const [hasEmployee, setHasEmployee] = useState(isAuthenticated());

  const clearEmployee = () => {
    sessionStorage.clear();
    setHasEmployee(isAuthenticated());
  }

  const setEmployee = employee => {
    sessionStorage.setItem("credentials", JSON.stringify(employee));
    setHasEmployee(isAuthenticated());
  }

  return (
    <>
      <NavigationBar hasEmployee={hasEmployee} clearEmployee={clearEmployee}/>
      <ApplicationViews hasEmployee={hasEmployee} setEmployee={setEmployee}/>
    </>
  )
}

export default KandyKorner;