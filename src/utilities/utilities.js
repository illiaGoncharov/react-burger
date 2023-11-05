import { useState } from "react";

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

export const wsActionsCreater = (
  connectStart,
  onOpen,
  onMessage,
  onClose,
  onError,
  connectStop
) => ({
  connectStart: connectStart,
  onOpen: onOpen,
  onMessage: onMessage,
  onClose: onClose,
  onError: onError,
  connectStop: connectStop,
});

export const extractAltFromURL = (url) => {
  const parts = url.split('/');
  const alt = parts[parts.length - 1].split('.')[0]; // Берем последний сегмент и удаляем расширение файла
  return alt;
}

// export const calculateTotalPrice = (ingredientsData, orderElement) => {
//   // console.log(ingredientsData);
//   console.log(orderElement.ingredients);

//   if (!ingredientsData || !orderElement) {
//     return 0;
//   }
//   return ingredientsData.reduce((accumulator, item) => {
//     const ingredient = orderElement.ingredients.find((el) => el === item._id);
//     if (ingredient) {
//       return item.price + accumulator;
//     }
//     return accumulator;
//   }, 0);
// };
