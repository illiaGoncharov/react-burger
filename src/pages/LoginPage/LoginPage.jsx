import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./LoginPage.module.css";

import { logInUser } from "../../services/actions/userActions";
import { usePasswordShow } from "../../utilities/variousUtils";
import { useForm } from '../../hooks/useForm';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Использование хука useForm для управления формой
  const { values, handleChange } = useForm({
    login: "",
    password: "",
  });
  
  const userLogInSuccess = useSelector((store) => {
    return store.userData.logInUserSuccess;
  });

  const passwordShow = usePasswordShow();

  const logIn = (e) => {
    e.preventDefault();
    dispatch(logInUser(values.login, values.password));
    if (userLogInSuccess) {
      // Сброс значений полей формы и переход на предыдущую страницу
      values.setValues({
        login: "",
        password: "",
      });
      navigate(-1);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => {logIn(e)}} className={styles.login_page__form}>
        <h2 className="text text_type_main-medium">Вход</h2>
        <div className="mb-6 mt-6">
          <Input
            onChange={(e) => handleChange(e)}
            type="email"
            value={values.login}
            name="login"
            placeholder="E-mail"
          ></Input>
        </div>
        <div className="mb-6">
          <Input
            onChange={(e) => handleChange(e)}
            type={`${passwordShow.type}`}
            value={values.password}
            name="password"
            icon={`${passwordShow.icon}`}
            placeholder="Пароль"
            onIconClick={() => {
              passwordShow.showPassword();
            }}
          ></Input>
        </div>
        <div className={`${styles.login_page__button} mb-20`}>
          <Button htmlType="submit" type="primary" size="large">
            Войти
          </Button>
        </div>
      </form>
      <p className={`text text_type_main-default text_color_inactive mb-4 ${styles.login_page__text}`}>
        Вы - новый пользователь?&nbsp;
        <Link to="/register" className={styles.login_page__link}>
          Зарегистрироваться
        </Link>
      </p>
      <p className={`text text_type_main-default text_color_inactive ${styles.login_page__text}`}>
        Забыли пароль?&nbsp;
        <Link to="/forgot-password" className={styles.login_page__link}>
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
