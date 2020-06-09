import React, { useState, useEffect } from 'react';
import DataManager from '../../modules/DataManager';
import { Container, Jumbotron, Button } from 'react-bootstrap'

const EmployeeDetail = props => {
  const [employee, setEmployee] = useState({})
  const [location, setLocation] = useState({})

  useEffect(() => {
    DataManager.getById("employees", props.match.params.employeeId)
      .then(employee => {
        setEmployee(employee)
        DataManager.getById("locations", employee.locationId).then(location => {
          setLocation(location)
        })
      })
  }, [props.match.params.employeeId])

  const deleteObj = id => {
    DataManager.delete("employees", id)
      .then(props.history.push('/employees'));
  };

  return (
    <Container className="mt-4 text-center d-flex justify-content-center">
      <Jumbotron style={{width: '30rem'}}>
        <h3>{employee.firstName} {employee.lastName}</h3>
        <p>{employee.address}</p>
        <p>{employee.phone}</p>
        <p>{location.name}</p>
        <p>{location.address}</p>
        <p>{location.phone}</p>
        { props.employeeId === 1 ? <Button variant="danger" type="button" onClick={() => deleteObj(props.match.params.employeeId)}>Fired!</Button> : null }
      </Jumbotron>
    </Container>
  )
}

export default EmployeeDetail;