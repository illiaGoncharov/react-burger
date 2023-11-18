import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Profile.module.css";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

import { postUserData } from "../../../services/actions/userActions";
import { useForm } from '../../../hooks/useForm';

export const Profile = () => {
  const dispatch = useDispatch();
  
  const { values, handleChange, setValues } = useForm({
    login: useSelector((store) => store.userData.userData.user.email),
    password: "ilia3000@gmail.com",
    name: useSelector((store) => store.userData.userData.user.name),
  });

  const [disabledName, setDisabledName] = useState(true);
  const [disabledLogin, setDisabledLogin] = useState(true);

  const handleSubmit = (e, name, login) => {
    e.preventDefault();
    setDisabledName(true);
    setDisabledLogin(true);
    dispatch(postUserData(login, name));
  };
  
  return (
    <div className={styles.profile__inputs}>
      <form onSubmit={(e) => handleSubmit(e, values.name, values.login)} className="mb-6">
        <Input
          onChange={(e) => handleChange(e)}
          type="text"
          icon={"EditIcon"}
          value={values.name}
          name="name"
          placeholder={"Имя"}
          disabled={disabledName}
          onIconClick={() => setDisabledName(!disabledName)}
        ></Input>
      </form>
      <form onSubmit={(e) => handleSubmit(e, values.name, values.login)} className="mb-6">
        <Input
          onChange={(e) => handleChange(e)}
          type="email"
          icon={"EditIcon"}
          value={values.login}
          name="email"
          placeholder={"Логин"}
          disabled={disabledLogin}
          onIconClick={() => setDisabledLogin(!disabledLogin)}
        ></Input>
      </form>
      <div className="mb-6">
        <Input
          onChange={(e) => handleChange(e)}
          type={"password"}
          icon={"EditIcon"}
          value={values.password}
          name="password"
          placeholder={"Пароль"}
          disabled={true}
        ></Input>
      </div>
    </div>
  );
};
