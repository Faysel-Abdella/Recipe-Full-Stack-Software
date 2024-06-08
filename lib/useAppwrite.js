import { useState, useEffect } from "react";

import { Alert } from "react-native";

// This is a custom hook for fetching data from appwrite and return the data
// Since we fetch data in many areas(home screen, searching screen) it's better to use a custom hook where the custom hook
// accepts the function which is responsible for fetching data then executes the function inside the custom hook

// Custom hook is just a function with the name starts with 'use' and uses the react hooks inside it

const useAppwrite = (fn) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fn();

      setData(response);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Execute the fetchData function for the first time
  useEffect(() => {
    fetchData();
  }, []);

  // Execute the fetchData function when the refetch is called
  const refetch = () => fetchData();

  return { data, isLoading, refetch };
};

export default useAppwrite;
