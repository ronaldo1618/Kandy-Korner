import React, { useState, useEffect } from 'react';
import DataManager from '../../modules/DataManager';
import ProductCard from '../products/ProductCard';

const ProductList = (props) => {
  const [products, setProducts] = useState([]);
  const [productTypes, setProductTypes] = useState([])

  const getType = () => {
    DataManager.get("productTypes")
      .then(productTypes => setProductTypes(productTypes));
    };

  useEffect(() => {
    getType()
  }, []);

  const getProducts = () => {
    return DataManager.getAllProductsWithType().then(productsFromAPI => {
      setProducts(productsFromAPI);
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleFieldChange = e => {
    DataManager.getProductsWithType(e.target.value).then((products) => {
      setProducts(products.products)
    })
  };

  return (
    <>
      <label htmlFor="productTypeId">Product Type</label>
            <select className="form-control" id="productTypeId" value={productTypes.Id} onChange={handleFieldChange}>
              <option className="hide-option" value=''></option>
              {productTypes.map(productType => 
              <option key={productType.id} value={productType.id}>{productType.name}</option>
              )}
            </select>
      <section className="section-content">
      {}
        <button type="button" className="btn" onClick={() => {props.history.push(`/products/productForm`)}}>Add Product</button>
      </section>
      <div className="container-cards">
        {products.map(product => <ProductCard key={product.id} product={product} objURL={"product"} history={props.history} {...props}/>)}
      </div>
      
    </>
  );
};

export default ProductList;