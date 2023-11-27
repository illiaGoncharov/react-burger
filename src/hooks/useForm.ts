import { ChangeEvent, useState } from "react";
import { TUseForm } from "../utils/types";

// Кастом хук useForm: способ управления значениями формы && inputValues - Начальные значения формы
export const useForm = <T extends TUseForm>(inputValues: T) => {
  const [values, setValues] = useState(inputValues);
  // Обработчик изменения значения
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Деструктуризация свойств из event.target.
    const { value, name }: { value: string; name: keyof T } = event.target;
    // Обновление состояния с новым значением поля.
    setValues({ ...values, [name]: value });
  };

  // Возвращаем значения, обработчик изменения и функцию установки значений.
  return { values, handleChange, setValues };
};
