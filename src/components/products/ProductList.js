import React, { useState, useEffect } from 'react';
import DataManager from '../../modules/DataManager';
import ProductCard from '../products/ProductCard';
import { Button, Container, Row, Col, Jumbotron } from 'react-bootstrap';

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
    <div>
      <Container className="mt-5 mb-5 d-flex justify-content-center">

        <Row>
          <Col style={{width: '13rem'}}>
            <select className="form-control" id="productTypeId" value={productTypes.Id} onChange={handleFieldChange}>
              <option className="hide-option" value=''>Product Type</option>
              {productTypes.map(productType => 
              <option key={productType.id} value={productType.id}>{productType.name}</option>
              )}
            </select>
          </Col>
          <Col>
            <Button type="button" className="btn" onClick={() => {props.history.push(`/products/productForm`)}}>Add Product</Button>
          </Col>
        </Row>
      </Container>
      <div className="container-cards">
        {products.map(product => <ProductCard key={product.id} product={product} objURL={"product"} history={props.history} {...props}/>)}
      </div>
    </div>
  );
};

export default ProductList;