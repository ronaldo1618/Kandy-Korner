const remoteURL = 'http://localhost:5002'

export default {
  getById(collection, id) {
    return fetch(`${remoteURL}/${collection}/${id}`)
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
  post(collection, obj) {
    return fetch(`${remoteURL}/${collection}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    }).then(data => data.json())
  },
  delete(collection, id) {
    return fetch(`${remoteURL}/${collection}/${id}`, {
      method: 'DELETE'
    }).then(data => data.json());
  },
  getEmployeeByIdWithLocation(employeeId) {
    return fetch(`${remoteURL}/employees/${employeeId}?_expand=location`).then(data => data.json())
  },
  getAllProductsWithType() {
    return fetch(`${remoteURL}/products/?_expand=productType`)
      .then(data => data.json())
  },
  getProductsWithType(id) {
    return fetch(`${remoteURL}/productTypes/${id}?_embed=products`)
      .then(data => data.json());
  },
  getProductLocations(productId) {
    return fetch(`${remoteURL}/productLocations/?productId=${productId}&_expand=location`)
    .then(data => data.json());
  },
}