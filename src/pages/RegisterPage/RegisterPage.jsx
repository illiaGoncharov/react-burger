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

import PropTypes from "prop-types";
import { useForm } from '../../hooks/useForm';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRegSuccess = useSelector((store) => store.userData.registerUserSuccess);

  const { values, handleChange, setValues } = useForm({
    loginValue: "",
    passwordValue: "",
    nameValue: "",
  });

  const submitForm = (e) => {
    e.preventDefault();

    if (userRegSuccess) {
      setValues({ loginValue: "", passwordValue: "", nameValue: "" });
      navigate("/login", { replace: true });
    } else {
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
            onChange={handleChange}
            name="nameValue"
            type="text"
            value={values.nameValue}
            placeholder="Имя"
          ></Input>
        </div>
        <div className="mb-6">
          <EmailInput
            onChange={handleChange}
            name="loginValue"
            type="email"
            value={values.loginValue}
            placeholder="E-mail"
          />
        </div>
        <div className="mb-6">
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
