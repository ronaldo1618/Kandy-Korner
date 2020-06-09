import React, { useState, useEffect } from 'react';
import DataManager from '../../modules/DataManager';
import EmployeeCard from './EmployeeCard';

const EmployeeList = props => {
  const [employees, setEmployees] = useState([]);

  const getEmployees = () => {
    return DataManager.get("employees").then(employeesFromAPI => { setEmployees(employeesFromAPI)});
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div>
      <div>
        {
          employees.map(employee => <EmployeeCard key={employee.id} obj={employee} objURL={"employees"} history={props.history} {...props}/>)
        }
      </div>
    </div>
  )
}

export default EmployeeList;