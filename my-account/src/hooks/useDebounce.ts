import { useEffect, useState } from 'react';

const useDebounce = <T = any>(value: T, delay = 800) => {
  const [debuoncedValue, setDebuoncedValue] = useState<T>(value);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebuoncedValue(value);
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay, value]);
  return debuoncedValue;
};

export default useDebounce;
