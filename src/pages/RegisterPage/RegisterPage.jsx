// import { useState } from "react";

import {
  Input,
  Button, 
  PasswordInput, 
  EmailInput
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./RegisterPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { regUser } from "../../services/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
// import { usePasswordShow } from "../../utils/utility";

import PropTypes from "prop-types";
import { useForm } from '../../hooks/useForm';

const RegisterPage = () => {
  const { values, handleChange, setValues } = useForm({
    loginValue: "",
    passwordValue: "",
    nameValue: "",
  });

  // const[loginValue, setLoginValue] = useState("");
  // const [passwordValue, setPasswordValue] = useState("");
  // const [nameValue, setNameValue] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRegSuccess = useSelector((store) => store.userData.registerUserSuccess);

  const submitForm = (e) => {
    e.preventDefault();

    if (userRegSuccess) {
      // setLoginValue("");
      // setPasswordValue("");
      // setNameValue("");
      setValues({ loginValue: "", passwordValue: "", nameValue: "" });
      navigate("/login", { replace: true });
    } else {
      // dispatch(regUser(loginValue, passwordValue, nameValue));
      dispatch(regUser(values.loginValue, values.passwordValue, values.nameValue));
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
            // onChange={(e) => {
            //   setNameValue(e.target.value);
            // }}
            onChange={handleChange}
            name="nameValue"
            type="text"
            value={values.nameValue}
            placeholder="Имя"
          ></Input>
        </div>
        <div className="mb-6">
          <EmailInput
            // onChange={(e) => {
            //   setLoginValue(e.target.value);
            // }}
            onChange={handleChange}
            name="loginValue"
            type="email"
            value={values.loginValue}
            placeholder="E-mail"
          />
        </div>
        <div className="mb-6">
          {/* <Input
            onChange={(e) => {
              setPasswordValue(e.target.value);
            }}
            type={usePasswordShow.type === "email" ? "email" : "text"} 
            value={passwordValue}
            icon={`${usePasswordShow.icon}`}
            placeholder="Пароль"
            onIconClick={() => usePasswordShow.showPassword()}
          ></Input> */}
          <PasswordInput
            onChange={handleChange}
            name="passwordValue"
            type="password"
            value={values.passwordValue}
            placeholder="Пароль"
          />
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
