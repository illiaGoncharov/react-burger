import { FC } from "react";
import { Outlet } from "react-router";

import ProfileNav from "../../components/profile-nav/profile-nav";

// Страница с профилем пользователя и списком заказов
const OrdersPage: FC = () => {
  return (
    <div>
      <main>
        {/* Навигационная панель профиля */}
        <ProfileNav />
        {/* Outlet для вложенных маршрутов */}
        <Outlet />
      </main>
    </div>
  );
};

export default OrdersPage;
