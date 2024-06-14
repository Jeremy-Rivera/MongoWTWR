import { useState } from "react";
const location = { latitude: 27.964157, longitude: -82.452606 };
const APIKey = "d2fb9c478e73e2c885b0d6aaa2b2c422";
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "http://localhost:3000",
  Accept: "application/json",
};

export function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (evt) => {
    const { value, name } = evt.target;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export { location, APIKey, headers, emailRegex };
