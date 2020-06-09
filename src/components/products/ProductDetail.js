import React, { useState, useEffect } from "react";
import DataManager from '../../modules/DataManager';
import { Container, Jumbotron, Button } from 'react-bootstrap';

const ProductDetail = (props) => {
  const [product, setProduct] = useState({});
  const [productType, setProductType] = useState({});
  const [productLocations, setProductLocations] = useState([]);

  useEffect(() => {
    DataManager.getById("products", props.match.params.productId)
    .then(product => {
      setProduct({
        name: product.name,
        price: product.price,
      });
      return DataManager.getById("productTypes", product.productTypeId)
    })
    .then(productType => {
      setProductType({name: productType.name})
      return DataManager.getProductLocations(props.match.params.productId)
    })
    .then(productLocations => {
      setProductLocations(productLocations)
    })
  }, [props.match.params.productId]);

  const deleteLocation = id => {
    DataManager.delete("productLocations", id)
      .then(() => DataManager.getProductLocations(props.match.params.productId).then(setProductLocations));
  };
  const deleteProduct = id => {
    DataManager.delete("products", id)
      .then(() => props.history.push('/products'));
  };

  return (
    <Container className="mt-4 text-center d-flex justify-content-center">
      <Jumbotron style={{width: '30rem'}}>
        <h3 className="product-name">{product.name}
        </h3>
        <p className="product-price">Price: ${ product.price}</p>
        <p className="product-type">Product Type: {productType.name || "not assigned"}</p>
        <p className="product-locations">Product Locations</p>
        <hr/>
        {productLocations.map(location => 
          <div key={location.location.id}>
          <p>{location.location.name}</p>
          <p>{location.location.address}</p>
          <p>{location.location.phone}</p>
          <Button variant="outline-danger" className="m-3" type="button" onClick={() => deleteLocation(location.id)}>Out of Stock</Button>
          <hr/>
          </div>
        )}
        <Button className="m-3" type="submit" onClick={() => props.history.push(`/products/productForm/${props.match.params.productId}`)}>Edit</Button>
        <Button variant="danger" className="m-3" type="button" onClick={() => deleteProduct(props.match.params.productId)}>Remove Product</Button>
      </Jumbotron>
    </Container>
  );
};
export default ProductDetail;