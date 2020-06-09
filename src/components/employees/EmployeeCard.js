import React from 'react';

const EmployeeCard = ({obj, objURL, history}) => {
  return (
    <>
    <h3>{obj.firstName} {obj.lastName}</h3>
    <p>{obj.username}</p>
    <button type="button" onClick={() => {
      history.push(`/${objURL}/${obj.id}/details`)
    }}>Details</button>
    </>
  )
}

export default EmployeeCard;