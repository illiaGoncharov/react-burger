import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import styles from "./ForgotPasswordPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { apiForgotPassword } from "../../utils/api";

const ForgotPasswordPage = () => {
  const [emailValue, setEmailValue] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const res = await apiForgotPassword(emailValue);
      localStorage.setItem("resetPasswordOk", res.success);
      navigate("/reset-password", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          handleForgotPassword(e, emailValue);
        }}
        className={styles.forgot__form}
      >
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <div className="mb-6 mt-6">
          <Input
            onChange={(e) => {
              setEmailValue(e.target.value);
            }}
            type="email"
            value={emailValue}
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
