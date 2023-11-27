import React, { FC } from "react";
import { Link } from "react-router-dom";

import styles from "../page.module.css";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { login } from "../../services/actions/auth";

import { useForm } from "../../hooks/useForm";
import { useDispatch } from "../../services/types/hooks";

const LoginPage: FC = () => {
  // Получаем диспетчер для отправки действий в Redux
  const dispatch = useDispatch();

  // Получаем значения из формы и функцию для их обновления с помощью кастом хука useForm
  const { values, handleChange } = useForm({ email: "", password: "" });

  // Обработчик события отправки формы
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Диспетчеризация действия логина с использованием значений из формы
    dispatch(login(values));
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className="text text_type_main-medium">Вход</h1>
        {/* Основная форма страницы */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <EmailInput
            onChange={handleChange}
            value={values.email}
            name={"email"}
          />
          <PasswordInput
            onChange={handleChange}
            value={values.password}
            name={"password"}
          />
          <Button htmlType="submit" type="primary" size="large">
            Войти
          </Button>
        </form>
        {/* Дополнительные ссылки для регистрации и восстановления пароля */}
        <div className={styles.caption}>
          <p className="text text_type_main-default text_color_inactive">
            Вы — новый пользователь?&ensp;
            <Link to="/register" className={styles.link}>
              Зарегистрироваться
            </Link>
          </p>
          <p className="text text_type_main-default text_color_inactive">
            Забыли пароль?&ensp;
            <Link to="/forgot-password" className={styles.link}>
              Восстановить пароль
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
