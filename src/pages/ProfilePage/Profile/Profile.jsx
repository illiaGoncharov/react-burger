import styles from "./Profile.module.css";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postUserData } from "../../../services/actions/userActions";
export const Profile = () => {
  const dispatch = useDispatch();

  const name = useSelector((store) => store.userData.userData.user.name);
  const login = useSelector((store) => store.userData.userData.user.email);

  const [loginValue, setLoginValue] = useState(login);
  const [passwordValue, setPasswordValue] = useState("123");
  const [nameValue, setNameValue] = useState(name);

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
      <form onSubmit={(e) => handleSubmit(e, nameValue, loginValue)} className="mb-6">
        <Input
          onChange={(e) => setNameValue(e.target.value)}
          type="text"
          icon={"EditIcon"}
          value={nameValue}
          placeholder={"Имя"}
          disabled={disabledName}
          onIconClick={() => setDisabledName(!disabledName)}
        ></Input>
      </form>
      <form onSubmit={(e) => handleSubmit(e, nameValue, loginValue)} className="mb-6">
        <Input
          onChange={(e) => setLoginValue(e.target.value)}
          type="email"
          icon={"EditIcon"}
          value={loginValue}
          placeholder={"Логин"}
          disabled={disabledLogin}
          onIconClick={() => setDisabledLogin(!disabledLogin)}
        ></Input>
      </form>
      <div className="mb-6">
        <Input
          onChange={(e) => setPasswordValue(e.target.value)}
          type={"password"}
          icon={"EditIcon"}
          value={passwordValue}
          placeholder={"Пароль"}
          disabled={true}
        ></Input>
      </div>
    </div>
  );
};
