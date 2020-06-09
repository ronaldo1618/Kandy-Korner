import React, { useState, useEffect } from 'react';
import DataManager from '../../modules/DataManager';
import EmployeeCard from './EmployeeCard';

const EmployeeList = props => {
  const [employees, setEmployees] = useState([]);

  const getEmployees = () => {
    console.log(props.employeeId)
    return DataManager.get("employees").then(employeesFromAPI => { setEmployees(employeesFromAPI)});
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const deleteObj = id => {
    DataManager.delete("employees", id)
      .then(() => DataManager.get("employees").then(setEmployees));
  };

  return (
    <div>
      <div>
        {
          employees.map(employee => <EmployeeCard key={employee.id} obj={employee} employeeId={props.employeeId} deleteObj={deleteObj} objURL={"employees"} history={props.history} {...props}/>)
        }
      </div>
    </div>
  )
}

export default EmployeeList;