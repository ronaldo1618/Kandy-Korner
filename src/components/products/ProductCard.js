import React from 'react';

const ProductCard = ({product, objURL, history}) => {
  return (
    <>
    <h3>{product.name}</h3>
    <p>{product.price}</p>
    <button type="button" onClick={() => {
      history.push(`/products/${product.id}/details`)
    }}>Details</button>
    </>
  )
}

export default ProductCard;