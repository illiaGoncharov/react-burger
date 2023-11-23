// Типы для авторизации
export type TAuthorization = HeadersInit & {
  authorization?: string | null;
};

// Типы для опций запроса
export type TOptions = {
  method: string;
  headers: TAuthorization;
  body?: BodyInit | null | undefined;
};

// Тип для ингредиента
export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  image: string;
  image_mobile: string;
  image_large: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  __v: number;
  uuid?: string; // Уникальный идентификатор для ингредиента
  [key: string]: any; // IngredientDetailsMain Индексный параметр для возможности индексации строкой
};

// Тип для пользователя
export type TUser = {
  name: string;
  email: string;
  password?: string;
};

// Тип для заказа
export type TOrder = {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  owner: string;
  status: string;
  updatedAt: string;
  _id: string;
  __v: number;
};

// Тип для номера заказа
export type TOrderNumber = {
  orderNumber: number;
};

// Тип для списка заказов
export type TOrders = {
  orders: TOrder[];
  success: boolean;
  total: number;
  totalToday: number;
};

// Тип для формы
export type TForm = {
  name?: string;
  password?: string;
  email?: string;
  token?: string | null;
};

// Тип для изображений
export type TImages = {
  image: string;
  name: string;
};

// Тип для свойств модального окна
export type TModalProps = {
  closeModal: () => void;
};

// Тип для свойств ингредиента
export type TIngredientProps = {
  ingredient: TIngredient;
  onClick: () => void;
};

// Тип для свойств карточки заказа
export type TOrderCard = {
  order: TOrder;
};

// Тип для свойств списка ингредиентов
export type TIngredientListProps = {
  ingredients: TIngredient[];
  name: string;
  onClick: (element: TIngredient) => void;
};

// Тип для свойств элемента конструктора бургера
export type TBurgerConstructorElementProps = {
  ingredient: TIngredient;
  index: number;
  onDelete: (uuid: string) => void;
  onMove: (dragIndex: number, hoverIndex: number) => void;
};

// Тип для формы использования
export type TUseForm = {
  [key: string]: string;
};

// Тип для свойств защищенного маршрута
export type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
  component: JSX.Element;
};

// Тип для свойств компонента
export type TComponentProps = {
  component: JSX.Element;
};
