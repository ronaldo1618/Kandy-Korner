import React, { useState, useEffect } from 'react';
import DataManager from '../../modules/DataManager';
import { Form, Jumbotron, Container, Button } from 'react-bootstrap';

const ProductForm = props => {
  const [product, setProduct] = useState({name: "", price: 0, productTypeId: ""})
  const [isLoading, setIsLoading] = useState(false);
  const [productTypes, setProductTypes] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [locations, setLocations] = useState([])

  const getType = () => {
    DataManager.get("productTypes")
      .then(productTypes => setProductTypes(productTypes));
    };

  const getLocations = () => {
    DataManager.get("locations")
      .then(locations => setLocations(locations))
  }

  useEffect(() => {
    getType()
    getLocations()
  }, []);

  const handleFieldChange = e => {
    const stateToChange = { ...product };
    stateToChange[e.target.id] = e.target.value;
    setProduct(stateToChange);
  };

  const updateProduct = e => {
    e.preventDefault()
    setIsLoading(true);
    const editedProduct = {
      id: props.match.params.productId,
      name: product.name,
      price: product.price,
      productTypeId: parseInt(product.productTypeId)
    };
    DataManager.update("products", editedProduct).then(() => updateProductLocations())
  }

  const updateProductLocations = (newProduct) => {
    let productId = ""
    if(props.match.params.productId) {
      productId = parseInt(props.match.params.productId)
    } else {
      productId = newProduct.id
    }
    // find a better solution for this
    for (let i = 0; i <= locations.length; i++) { 
      if(checkedItems[i] === true) {
        DataManager.get("productLocations").then((productLocations) => {
          const check = productLocations.find(existingProductLocation => existingProductLocation.productId === productId && existingProductLocation.locationId === i)
          if(!check) DataManager.post("productLocations", {
            productId: productId,
            locationId: i
          })
        })
      }
    }
    props.history.push("/products")           
  }

  const createNewProduct = e => {
    e.preventDefault();
    if(product.name === "" || product.price === "" || product.productTypeId === "") {
      return alert('Please fill out all fields')
    } else {
      setIsLoading(true);
      product.productTypeId = parseInt(product.productTypeId)
      DataManager.post("products", product)
        .then(newProduct => updateProductLocations(newProduct))
    }
  }

  useEffect(() => {
    if(props.match.params.productId) {
      DataManager.getById("products", props.match.params.productId)
        .then(product => {
          setProduct(product);
          setIsLoading(false);
        });
    }
  }, [props.match.params.productId]);

  return (
    <Container className="p-5">
      <Jumbotron>
        <Form>
          <Form.Group>
            <Form.Label htmlFor="name">Product name</Form.Label>
            <Form.Control type="text" required className="form-control" onChange={handleFieldChange} id="name" value={product.name}
            />
            </Form.Group>
            <Form.Group>
            <Form.Label htmlFor="price">Price</Form.Label>
            <Form.Control
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="price"
              value={product.price}
            />
          </Form.Group>
          <Form.Group>
            <select className="form-control" id="productTypeId" value={product.Id} onChange={handleFieldChange}>
              <option className="hide-option" value=''>Product Type</option>
              {productTypes.map(productType => 
              <option key={productType.id} value={productType.id}>{productType.name}</option>
              )}
            </select>
          </Form.Group>
          <hr/>
          <Form.Group id="checkbox-locations" className="d-flex text-center">
            {
            locations.map(location => (
              <Form.Label className="m-3" key={location.id}>
                <Form.Check type="checkbox" id={location.id} name={location.name} checked={checkedItems[location.name]} onChange={e => setCheckedItems({...checkedItems, [e.target.id] : e.target.checked})} />
                {location.name}
              </Form.Label>
            ))
            }
          </Form.Group>
          <hr/>
          <Container className="text-center">
            <Button className="mr-3" variant="danger" type="button" onClick={() => props.history.push('/products')}>Cancel</Button>
            {
              props.match.params.productId ?
              <Button
                type="button" disabled={isLoading}
                onClick={updateProduct}
                className="btn btn-primary"
              >Submit</Button>
              : <Button
                type="button" disabled={isLoading}
                onClick={createNewProduct}
                className="btn btn-primary"
              >Submit</Button>
            }
          </Container>
        </Form>
      </Jumbotron>
    </Container>
  );
}

export default ProductForm;