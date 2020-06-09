import React from 'react';
import { Card } from 'react-bootstrap';

const LocationCard = ({obj, objURL, history}) => {
  return (
    <Card className="text-center m-2" style={{width: `18rem`}}>
      <Card.Body>
        <Card.Title>{obj.name}</Card.Title>
        <Card.Text>{obj.phone}</Card.Text>
        <Card.Text>{obj.address}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default LocationCard;