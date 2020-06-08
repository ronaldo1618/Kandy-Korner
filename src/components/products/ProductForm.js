import React, { useState, useEffect } from 'react';
import DataManager from '../../modules/DataManager';

const ProductForm = props => {
  const [product, setProduct] = useState({name: "", price: 0, productTypeId: ""})
  const [isLoading, setIsLoading] = useState(false);
  const [productTypes, setProductTypes] = useState([]);
  const [locations, setLocations] = useState([]);

  const getType = () => {
    DataManager.get("productTypes")
      .then(productTypes => setProductTypes(productTypes));
    };
    
  const getLocation = () => {
    DataManager.get("locations")
      .then(locations => setLocations(locations));
  }

  useEffect(() => {
    getType()
    getLocation()
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
      id: props.match.params.animalId,
      name: product.name,
      price: product.price,
      productTypeId: product.productTypeId
    };
    DataManager.update("products", editedProduct)
      .then(() => {
        DataManager.postProductLocations("productLocations", )
        props.history.push("/products")
      })
  }


  //

  
  // Need to update ProductLocation


  //
  useEffect(() => {
    DataManager.getById("products", props.match.params.productId)
      .then(product => {
        setProduct(product);
        setIsLoading(false);
      });
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
              {productTypes.map(productType => 
              <option key={productType.id} value={productType.id}>{productType.name}</option>
              )}
            </select>
            <label htmlFor="locations">Locations</label>
            {
              locations.map(location => <div key={location.id}><label htmlFor="location">{location.name}</label>
              <input type="checkbox" key={location.id}></input></div>)
            }
          </div>
          <div className="alignRight">
            <button
              type="button" disabled={isLoading}
              onClick={updateProduct}
              className="btn btn-primary"
            >Submit</button>
          </div>
        </fieldset>
      </form>
    </>
  );
}

export default ProductForm;