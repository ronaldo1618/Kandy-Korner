import React from 'react';
import { Button, Card } from 'react-bootstrap';

const ProductCard = ({product, history}) => {
  return (
    <Card className="text-center m-2" style={{width: `18rem`}}>
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>${product.price}</Card.Text>
        <Card.Text>Click on details to see locations that carry this candy!</Card.Text>
        <hr/>
        <Button variant="outline-info" size="sm" type="button" onClick={() => {
          history.push(`/products/${product.id}/details`)
        }}>Details</Button>
      </Card.Body>
    </Card>
  )
}

export default ProductCard;