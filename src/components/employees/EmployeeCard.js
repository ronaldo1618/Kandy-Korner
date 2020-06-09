import React from 'react';

const EmployeeCard = ({obj, objURL, history, employeeId, deleteObj}) => {
  return (
    <>
    <h3>{obj.firstName} {obj.lastName}</h3>
    <p>{obj.username}</p>
    <button type="button" onClick={() => {
      history.push(`/${objURL}/${obj.id}/details`)
    }}>Details</button>
    { employeeId === 1 ? <button type="button" onClick={() => deleteObj(obj.id)}>Fired!</button> : null }
    </>
  )
}

export default EmployeeCard;