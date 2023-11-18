import { useState } from "react";

export function useForm(inputValues={}) {
  // Используем useState для создания состояния, хранящего значения полей формы
  const [values, setValues] = useState(inputValues);

  // Функция handleChange вызывается при изменении значения в любом поле формы
  const handleChange = (event) => {
    const {value, name} = event.target;
    setValues({...values, [name]: value});
  };

  // Обновляем состояние, используя spread для сохранения предыдущих значений
  return {values, handleChange, setValues};
}