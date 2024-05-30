import React, { createContext, useContext, useState } from 'react';

export const RestaurantContext = createContext();

export const useRestaurant = () => useContext(RestaurantContext);

export const RestaurantProvider = ({ children }) => {
  const [restaurantData, setRestaurantData] = useState(null);
  const [restaurantName, setRestaurantName] = useState('');

  const updateRestaurantData = (data) => {
    setRestaurantData(data);
    updateRestaurantName(data.name);
  };

  const updateRestaurantName = (name) => {
    setRestaurantName(name);
  }

  return (
    <RestaurantContext.Provider value={{ restaurantData, restaurantName, updateRestaurantData }}>
      {children}
    </RestaurantContext.Provider>
  );
};
