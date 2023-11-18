import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ResetPasswordPage.module.css";
import { Link, useNavigate } from "react-router-dom"; 
import { apiResetPassword } from "../../utilities/api"; 
import { usePasswordShow } from "../../utilities/variousUtils";

import { useForm } from '../../hooks/useForm';

const ResetPasswordPage = () => {
  const navigate = useNavigate();

  const { values, handleChange, setValues } = useForm({
    passwordValue: "",
    token: "",
  });

  const submit = (e) => {
    e.preventDefault();
    apiResetPassword(values.passwordValue, values.token)
      .then(() => {
        localStorage.removeItem("resetPasswordOk");
        setValues({ passwordValue: "", token: "" });
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
            onChange={handleChange}
            type={`${passwordShow.type}`}
            value={values.passwordValue}
            placeholder="Введите новый пароль"
            icon={`${passwordShow.icon}`}
            onIconClick={passwordShow.showPassword}
          ></Input>
        </div>
        <div className="mb-6">
          <Input
            onChange={handleChange}
            type="text"
            value={values.token}
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
