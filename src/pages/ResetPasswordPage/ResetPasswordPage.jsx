import { useState } from "react";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ResetPasswordPage.module.css";
import { Link, useNavigate } from "react-router-dom"; 
import { apiResetPassword } from "../../utils/api"; 
import { usePasswordShow } from "../../utils/utility";

const ResetPasswordPage = () => {
  const [passwordValue, setPasswordValue] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    apiResetPassword(passwordValue, token)
      .then(() => {
        localStorage.removeItem("resetPasswordOk");
        setPasswordValue("");
        setToken("");
        navigate("/login"); 
      })
      .catch(() => {
        console.log("Неверный код из почты");
        localStorage.removeItem("resetPasswordOk");
      });
  };

  const passwordShow = usePasswordShow();

  return localStorage.getItem("resetPasswordOk") ? (
    <div>
      <form onSubmit={submit} className={styles.reset__form}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <div className="mb-6 mt-6">
          <Input
            onChange={(e) => {
              setPasswordValue(e.target.value);
            }}
            type={`${passwordShow.type}`}
            value={passwordValue}
            placeholder="Введите новый пароль"
            icon={`${passwordShow.icon}`}
            onIconClick={passwordShow.showPassword}
          ></Input>
        </div>
        <div className="mb-6">
          <Input
            onChange={(e) => {
              setToken(e.target.value);
            }}
            type="text"
            value={token}
            placeholder="Введите код из письма"
          ></Input>
        </div>
        <div className={`${styles.reset__button} mb-20`}>
          <Button htmlType="submit" type="primary" size="large">
            Сохранить
          </Button>
        </div>
      </form>
      <div></div>
      <p className={`text text_type_main-default text_color_inactive mb-4 ${styles.reset__text}`}>
        Вспомнили пароль?&nbsp;
        <Link to="/login" className={styles.reset__link}>
          Войти
        </Link>
      </p>
    </div>
  ) : (
    () => {
      navigate("/", { replace: true });
      return null; 
    }
  );
};

export default ResetPasswordPage;
