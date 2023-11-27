import { useEffect, FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "../page.module.css";

import { forgotPassword } from "../../services/actions/auth";
import { useDispatch, useSelector } from "../../services/types/hooks";

import { useForm } from "../../hooks/useForm";

const PasswordForgotPage: FC = () => {
  // Хук useNavigate предоставляет функцию для управления навигацией
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Получаем из Redux состояние, которое говорит о том, что пароль был успешно изменен
  const isPasswordChanged = useSelector(
    (store) => store.auth.isPasswordChanged,
  );

  // Хук useEffect используется для выполнения действий после рендера компонента
  useEffect(() => {
    // Перенаправление на страницу сброса пароля после успешного изменения пароля
    if (isPasswordChanged) {
      navigate("/reset-password");
    }
  }, [navigate, isPasswordChanged]);

  // Используем хук useForm для управления значениями полей формы
  const { values, handleChange } = useForm({ email: "" });

  // Функция-обработчик отправки формы
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(forgotPassword(values));
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* Форма восстановления пароля */}
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <EmailInput
            onChange={handleChange}
            value={values.email}
            name={"email"}
            placeholder={"Укажите e-mail"}
          />
          <Button htmlType="submit" type="primary" size="large">
            Восстановить
          </Button>
        </form>
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

export default PasswordForgotPage;
