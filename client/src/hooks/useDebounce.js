import { useEffect, useState } from "react";

// Delays updating the returned value until the input stops changing
// for `delay` ms — used to avoid firing an API request on every keystroke.
export default function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
