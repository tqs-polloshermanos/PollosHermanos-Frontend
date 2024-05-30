import React, { createContext, useContext, useEffect, useState } from 'react';

export const RestaurantContext = createContext();

export const useRestaurant = () => useContext(RestaurantContext);

export const RestaurantProvider = ({ children }) => {
  const [restaurantData, setRestaurantData] = useState(() => {
    const restaurantData = localStorage.getItem('restaurantData');
    return restaurantData ? JSON.parse(restaurantData) : [];
  });

  useEffect(() => {
    localStorage.setItem('restaurantData', JSON.stringify(restaurantData));
  }
  , [restaurantData]);

  const updateRestaurantData = (data) => {
    setRestaurantData(data);
  };

  const getRestaurantData = () => {
    return restaurantData;
  }

  return (
    <RestaurantContext.Provider value={{ restaurantData, updateRestaurantData, getRestaurantData }}>
      {children}
    </RestaurantContext.Provider>
  );
};
