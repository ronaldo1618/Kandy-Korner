import React, { useState, useEffect } from 'react';
import DataManager from '../../modules/DataManager';

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
    <>
      <form>
        <fieldset>
          <div className="formgrid">
            <label htmlFor="name">Product name</label>
            <input type="text" required className="form-control" onChange={handleFieldChange} id="name" value={product.name}
            />
            <label htmlFor="price">Price</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="price"
              value={product.price}
            />
            <label htmlFor="productTypeId">Product Type</label>
            <select className="form-control" id="productTypeId" value={product.Id} onChange={handleFieldChange}>
              <option className="hide-option" value=''></option>
              {productTypes.map(productType => 
              <option key={productType.id} value={productType.id}>{productType.name}</option>
              )}
            </select>
            <div>
              {
                locations.map(location => (
                  <label key={location.id}>
                      {location.name}
                      <input type="checkbox" id={location.id} name={location.name} checked={checkedItems[location.name]} onChange={e => setCheckedItems({...checkedItems, [e.target.id] : e.target.checked})} />
                  </label>
                ))
              }
          </div>
          </div>
          <div className="alignRight">
          <button type="button" onClick={() => props.history.push('/products')}>Cancel</button>
          {
            props.match.params.productId ?
            <button
              type="button" disabled={isLoading}
              onClick={updateProduct}
              className="btn btn-primary"
            >Submit</button>
            : <button
              type="button" disabled={isLoading}
              onClick={createNewProduct}
              className="btn btn-primary"
            >Submit</button>
          }
          </div>
        </fieldset>
      </form>
    </>
  );
}

export default ProductForm;