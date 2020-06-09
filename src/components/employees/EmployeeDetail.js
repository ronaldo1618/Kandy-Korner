import React, { useState, useEffect } from 'react';
import DataManager from '../../modules/DataManager';

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

  return (
    <div>
      <div>
        <h3>{employee.firstName} {employee.lastName}</h3>
        <p>{employee.address}</p>
        <p>{employee.phone}</p>
        <p>{location.name}</p>
        <p>{location.address}</p>
        <p>{location.phone}</p>
      </div>
    </div>
  )
}

export default EmployeeDetail;