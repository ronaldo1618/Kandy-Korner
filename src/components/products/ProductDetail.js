import React, { useState, useEffect } from "react";
import DataManager from '../../modules/DataManager';

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

  return (
    <div className="card">
      <div className="card-content">
        <h3>
          Name: <span style={{ color: "darkslategrey" }}>{product.name}</span>
        </h3>
        <p>Price: {product.price}</p>
        <p>Product Type: {productType.name || "not assigned"}</p>
        <p>Product Locations: </p>{productLocations.map(location => 
          <div key={location.location.id}>
          <p>{location.location.name}</p>
          <p>{location.location.address}</p>
          <p>{location.location.phone}</p>
          </div>
        )}
        <button type="submit" onClick={() => props.history.push(`/products/productForm/${props.match.params.productId}`)}>Edit</button>
      </div>
    </div>
  );
};
export default ProductDetail;