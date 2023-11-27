import { FC } from "react";
import { Outlet } from "react-router";

import styles from "./profile-page.module.css";

import ProfileNav from "../../components/profile-nav/profile-nav";

const ProfilePage: FC = () => {
  return (
    <div>
      <main className={styles.profile}>
        {/* Навигационное меню профиля */}
        <ProfileNav />
        {/* Отображение содержимого страницы профиля */}
        <Outlet />
      </main>
    </div>
  );
};

export default ProfilePage;
