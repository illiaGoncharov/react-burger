import { useState } from "react";

export function useForm(inputValues={}) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event) => {
    const {value, name} = event.target;
    setValues({...values, [name]: value});
  };
  return {values, handleChange, setValues};
}

// export const usePasswordInput = () => {
//     const [type, setType] = useState("password");
//     const [icon, setIcon] = useState("HideIcon");

//     const togglePasswordVisibility = () => {
//         setType((prevType) => (prevType === "password" ? "text" : "password"));
//         setIcon((prevIcon) => (prevIcon === "HideIcon" ? "ShowIcon" : "HideIcon"));
//     };

//     return { type, icon, togglePasswordVisibility };
// };