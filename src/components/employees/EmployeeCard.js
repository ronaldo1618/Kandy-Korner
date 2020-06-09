import React from 'react';
import { Button, Card } from 'react-bootstrap';

const EmployeeCard = ({obj, objURL, history, employeeId, deleteObj}) => {
  return (
    <Card className="text-center m-2" style={{width: `18rem`}}>
      <Card.Body>
        <Card.Title>{obj.firstName} {obj.lastName}</Card.Title>
        <Card.Text>Username: {obj.username}</Card.Text>
        <Button className="m-3" type="button" onClick={() => {
          history.push(`/${objURL}/${obj.id}/details`)
        }}>Details</Button>
        { employeeId === 1 ? <Button className="m-3" variant="danger" type="button" onClick={() => deleteObj(obj.id)}>Fired!</Button> : null }
      </Card.Body>
    </Card>
  )
}

export default EmployeeCard;