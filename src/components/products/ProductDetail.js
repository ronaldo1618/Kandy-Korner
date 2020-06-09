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

  const deleteLocation = id => {
    DataManager.delete("productLocations", id)
      .then(() => DataManager.getProductLocations(props.match.params.productId).then(setProductLocations));
  };
  const deleteProduct = id => {
    DataManager.delete("products", id)
      .then(() => props.history.push('/products'));
  };

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
          <button type="button" onClick={() => deleteLocation(location.id)}>Out of Stock</button>
          </div>
        )}
        <button type="submit" onClick={() => props.history.push(`/products/productForm/${props.match.params.productId}`)}>Edit</button>
        <button type="button" onClick={() => deleteProduct(props.match.params.productId)}>Remove Product</button>
      </div>
    </div>
  );
};
export default ProductDetail;