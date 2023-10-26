import { useState } from "react";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./RegisterPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { regUser } from "../../services/actions/userData";
import { useDispatch, useSelector } from "react-redux";
import { usePasswordShow } from "../../utils/utility";

import PropTypes from "prop-types";

const RegisterPage = () => {
  const[loginValue, setLoginValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [nameValue, setNameValue] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRegSuccess = useSelector((store) => store.userData.registerUserSuccess);

  const submitForm = (e) => {
    e.preventDefault();

    if (userRegSuccess) {
      setLoginValue("");
      setPasswordValue("");
      setNameValue("");
      navigate("/login", { replace: true });
    } else {
      dispatch(regUser(loginValue, passwordValue, nameValue));
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          submitForm(e);
        }}
        className={styles.register__form}
      >
        <h2 className="text text_type_main-medium">Регистрация</h2>
        <div className="mb-6 mt-6">
          <Input
            onChange={(e) => {
              setNameValue(e.target.value);
            }}
            type="text"
            value={nameValue}
            placeholder="Имя"
          ></Input>
        </div>
        <div className="mb-6">
          <Input
            onChange={(e) => {
              setLoginValue(e.target.value);
            }}
            type="email"
            value={loginValue}
            placeholder="E-mail"
          ></Input>
        </div>
        <div className="mb-6">
          <Input
            onChange={(e) => {
              setPasswordValue(e.target.value);
            }}
            type={usePasswordShow.type === "email" ? "email" : "text"} 
            value={passwordValue}
            icon={`${usePasswordShow.icon}`}
            placeholder="Пароль"
            onIconClick={() => usePasswordShow.showPassword()}
          ></Input>
        </div>
        <div className={`${styles.register__button} mb-20`}>
          <Button htmlType="submit" type="primary" size="large">
            Зарегистрироваться
          </Button>
        </div>
      </form>
      <p className={`text text_type_main-default text_color_inactive mb-4 ${styles.register__text}`}>
        Уже зарегистрированы?&nbsp;
        <Link to="/login" className={styles.register__link}>Войти</Link>
      </p>
    </div>
  );
};

RegisterPage.propTypes = {
  loginValue: PropTypes.string,
  passwordValue: PropTypes.string,
  nameValue: PropTypes.string,
};

export default RegisterPage;
