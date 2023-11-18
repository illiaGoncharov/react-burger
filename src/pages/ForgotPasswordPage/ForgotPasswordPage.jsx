import { Link, useNavigate } from "react-router-dom";

import styles from "./ForgotPasswordPage.module.css";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import { apiForgotPassword } from "../../utilities/api";
import { useForm } from '../../hooks/useForm';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const { values, handleChange } = useForm({
    emailValue: "",
  });

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const res = await apiForgotPassword(values.emailValue);
      localStorage.setItem("resetPasswordOk", res.success);
      navigate("/reset-password", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleForgotPassword}
        className={styles.forgot__form}
      >
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <div className="mb-6 mt-6">
          <Input
            onChange={handleChange}
            type="email"
            value={values.emailValue}
            name="emailValue"
            placeholder="Укажите e-mail"
          ></Input>
        </div>
        <div className={`${styles.forgot__button} mb-20`}>
          <Button htmlType="submit" type="primary" size="large">
            Восстановить
          </Button>
        </div>
      </form>
      <p className={`text text_type_main-default text_color_inactive mb-4 ${styles.forgot__text}`}>
        Вспомнили пароль?&nbsp;
        <Link to="/login" className={styles.forgot__link}>
          Войти
        </Link>
      </p>
    </div>
  );
};

export default ForgotPasswordPage;
