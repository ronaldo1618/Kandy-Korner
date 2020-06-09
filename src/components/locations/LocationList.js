import React, { useState, useEffect } from 'react';
import DataManager from '../../modules/DataManager';
import LocationCard from './LocationCard';

const LocationList = props => {
  const [locations, setLocations] = useState([]);

  const getLocations = () => {
    return DataManager.get("locations").then(locationsFromAPI => { setLocations(locationsFromAPI)});
  };

  useEffect(() => {
    getLocations();
  }, []);

  return (
    <div>
      <div>
        {
          locations.map(location => <LocationCard key={location.id} obj={location} objURL={"locations"} history={props.history} {...props}/>)
        }
      </div>
    </div>
  )
}

export default LocationList;