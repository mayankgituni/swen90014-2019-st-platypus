/**************************************************************************
 * Author: Mayank Tomar
 * These are the custom hooks that manages the https request.
 *************************************************************************/
import React, {useEffect, useState} from 'react';

const useHttp = (url, dependencies) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    setIsLoading(true);
    fetch(url)
    .then(response => {
      if (!response.ok) {
        setError("error")
        return
      }
      return response.json();
    })
    .then(data => {
      setIsLoading(false);
      setData(data);
    })
    .catch(err => {
      console.log(err);
      setIsLoading(false);
      setError(err)
    });
  }, dependencies);

  return [data, isLoading, error];
}

const usePostHttp = (url, bodyData, dependencies) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null)
  useEffect(() => {
    setIsLoading(true);
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(bodyData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        setError("error")
        return;
      }
      return response.json();
    })
    .then(data => {
      setIsLoading(false);
      setData(data);
    })
    .catch(err => {
      console.log(err);
      setIsLoading(false);
      setError(err)
    });
  }, dependencies);

  return [data, isLoading, error];
}

const usePutHttp = (url, bodyData,dependencies) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null)
  useEffect(() => {
    setIsLoading(true);
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(bodyData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        setError("error")
        return;
      }
      return response.json();
    })
    .then(data => {
      setIsLoading(false);
      setData(data);
    })
    .catch(err => {
      console.log(err);
      setIsLoading(false);
      setError(err)
    });
  }, dependencies);

  return [data, isLoading, error];
}

export default useHttp
export {usePostHttp, usePutHttp}