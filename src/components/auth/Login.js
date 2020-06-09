import React, { useState } from 'react';
import DataManager from '../../modules/DataManager';

const Login = props => {
  const [credentials, setCredentials] = useState();

  const handleFieldChange = e => {
    const stateToChange  = { ...credentials };
    stateToChange[e.target.id] = e.target.value;
    setCredentials(stateToChange);
  }

  const handleLogin = e => {
    e.preventDefault();
    DataManager.getEmployees()
      .then(employees => {
        const employee = employees.find(employee => employee.username === credentials.username && employee.password === credentials.password)
        if(!employee) return alert('employee not found')
        const stateToChange = { ...credentials }
        stateToChange.employeeId = employee.id
        setCredentials(stateToChange)
        props.setEmployee(employee)
        props.history.push('/')
      })
  }

  return (
    <form onSubmit={handleLogin}>
      <fieldset>
        <h3>Please Sign In</h3>
        <div className="formgrid">
          <input required onChange={handleFieldChange} type="username" id="username" placeholder="Username"/>
          <label htmlFor="inputUsername">Username</label>
          <input required onChange={handleFieldChange} type="password" id="password" placeholder="Password"/>
          <label htmlFor="inputPassword">Password</label>
        </div>
        <button type="submit">Sign In</button>
      </fieldset>
    </form>
  )
}

export default Login;