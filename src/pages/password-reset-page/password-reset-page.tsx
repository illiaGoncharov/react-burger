import { useEffect, FC } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "../page.module.css";

import { resetPassword } from "../../services/actions/auth";
import { useDispatch, useSelector } from "../../services/types/hooks";

import { useForm } from "../../hooks/useForm";

const PasswordResetPage: FC = () => {
  // Используем хук useDispatch для получения функции dispatch из Redux
  const dispatch = useDispatch();
  // Хук useNavigate предоставляет функцию для управления навигацией
  const navigate = useNavigate();

  // Используем хук useForm для управления значениями полей формы
  const { values, handleChange } = useForm({ password: "", token: "" });
  // Получаем из Redux состояние, которое говорит о том, что пароль был успешно изменен
  const isPasswordChanged = useSelector(
    (store) => store.auth.isPasswordChanged,
  );

  // Хук useEffect используется для выполнения действий после рендера компонента
  useEffect(() => {
    if (!isPasswordChanged) {
      // Перенаправляем пользователя на главную страницу после успешного изменения пароля
      navigate("/");
    }
  }, [navigate, isPasswordChanged]);

  // Функция-обработчик отправки формы
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Вызываем действие resetPassword с данными формы
    dispatch(resetPassword(values));
    navigate("/login");
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Поле ввода нового пароля */}
          <PasswordInput
            placeholder={"Введите новый пароль"}
            onChange={handleChange}
            value={values.password}
            name={"password"}
          />
          {/* Поле ввода кода из письма */}
          <Input
            placeholder={"Введите код из письма"}
            type={"text"}
            onChange={handleChange}
            value={values.token}
            name={"token"}
            size={"default"}
          />
          <Button htmlType="submit" type="primary" size="large">
            Сохранить
          </Button>
        </form>
        {/* Ссылка на страницу входа */}
        <div className={styles.caption}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?&ensp;
            <Link to="/login" className={styles.link}>
              Войти
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default PasswordResetPage;
