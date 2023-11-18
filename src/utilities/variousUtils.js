import { useState } from "react";

// Хук для управления отображением пароля (скрыт/открыт)
export const usePasswordShow = () => {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState("HideIcon");
  const showPassword = () => {
    return type === "password"
      ? (setType("text"), setIcon("ShowIcon"))
      : (setType("password"), setIcon("HideIcon"));
  };
  return { type, icon, showPassword };
};

// Функция для извлечения альтернативного текста из URL
export const extractAltFromURL = (url) => {
  const parts = url.split('/');
  const alt = parts[parts.length - 1].split('.')[0]; 
  return alt;
}

