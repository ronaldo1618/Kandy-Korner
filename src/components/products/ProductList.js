import React, { useState, useEffect } from 'react';
import DataManager from '../../modules/DataManager';
import ProductCard from '../products/ProductCard';

const ProductList = (props) => {
  const [products, setProducts] = useState([]);

  const getProducts = () => {
    return DataManager.getAllProductsWithType().then(productsFromAPI => {
      setProducts(productsFromAPI);
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProduct = id => {
    DataManager.delete("products", id)
    .then(() => DataManager.getAllProductsWithType().then(setProducts));
  };

  return (
    <>
      <section className="section-content">
        <button type="button" className="btn" onClick={() => {props.history.push("./form")}}>Add Product</button>
      </section>
      <div className="container-cards">
        {products.map(product => <ProductCard key={product.id} product={product} objURL={"product"} deleteObj={deleteProduct} history={props.history} {...props}/>)}
      </div>
    </>
  );
};

export default ProductList;