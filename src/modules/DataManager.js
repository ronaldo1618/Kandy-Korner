const remoteURL = 'http://localhost:5002'

export default {
  getEmployees() {
    return fetch(`${remoteURL}/employees`)
      .then(data => data.json());
  },
  getAllProductsWithType() {
    return fetch(`${remoteURL}/products/?_expand=productType`)
      .then(data => data.json())
  },
  getById(collection, id) {
    return fetch(`${remoteURL}/${collection}/${id}`)
      .then(data => data.json());
  },
  getProductLocations(productId) {
    return fetch(`${remoteURL}/productLocations/?productId=${productId}&_expand=location`)
      .then(data => data.json());
  },
  get(collection) {
    return fetch(`${remoteURL}/${collection}`)
      .then(data => data.json());
  },
  update(collection, obj) {
    return fetch(`${remoteURL}/${collection}/${obj.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    }).then(data => data.json())
  },
  postProductLocation(collection, obj) {
    return fetch(`${remoteURL}/${collection}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    }).then(data => data.json())
  },
  fetchProductLocations() {
    return fetch(`${remoteURL}/productLocations`)
      .then(data => data.json());
  }
}