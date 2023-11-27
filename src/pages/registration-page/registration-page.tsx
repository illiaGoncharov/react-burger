import { FC } from "react";
import { Link } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "../page.module.css";

import { register } from "../../services/actions/auth";
import { useDispatch } from "../../services/types/hooks";

import { useForm } from "../../hooks/useForm";

// Страница для регистрации нового пользователя
const RegistrationPage: FC = () => {
  const dispatch = useDispatch();
  const { values, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
  });

  // Обработчик отправки формы
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(register(values));
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className="text text_type_main-medium">Регистрация</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            placeholder={"Имя"}
            onChange={handleChange}
            type={"text"}
            value={values.name}
            name={"name"}
            size={"default"}
          />
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
            Зарегистрироваться
          </Button>
        </form>
        <div className={styles.caption}>
          <p className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы?&ensp;
            <Link to="/login" className={styles.link}>
              Войти
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default RegistrationPage;
