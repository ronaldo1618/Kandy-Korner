import React from 'react';

const LocationCard = ({obj, objURL, history}) => {
  return (
    <>
      <h3>{obj.name}</h3>
      <p>{obj.phone}</p>
      <p>{obj.address}</p>
    </>
  )
}

export default LocationCard;