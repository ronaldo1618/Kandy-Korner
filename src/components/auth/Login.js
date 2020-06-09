import React, { useState } from 'react';
import DataManager from '../../modules/DataManager';
import { Form, Button, FormGroup, Jumbotron, Container } from 'react-bootstrap';

const Login = props => {
  const [credentials, setCredentials] = useState();

  const handleFieldChange = e => {
    const stateToChange  = { ...credentials };
    stateToChange[e.target.id] = e.target.value;
    setCredentials(stateToChange);
  }

  const handleLogin = e => {
    e.preventDefault();
    DataManager.get("employees")
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
    <Container className="w-50 p-5">
      <Jumbotron>
        <Form onSubmit={handleLogin}>
            <h3 className="display-4">Kandy Korner </h3>
            <h3 className="display-6">Employee Sign In</h3>
            <hr/>
            <FormGroup>
              <Form.Label htmlFor="inputUsername">Username</Form.Label>
              <Form.Control className="w-100" required onChange={handleFieldChange} type="username" id="username" placeholder="Username"/>
            </FormGroup>
            <FormGroup>
              <Form.Label htmlFor="inputPassword">Password</Form.Label>
              <Form.Control className="w-100" required onChange={handleFieldChange} type="password" id="password" placeholder="Password"/>
            </FormGroup>
            <Button type="submit">Sign In</Button>
        </Form>
      </Jumbotron>
    </Container>
  )
}

export default Login;