import { useState, FC, ChangeEvent, useRef } from "react";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./profile.module.css";

import { updateUser } from "../../services/actions/auth";
import { useDispatch, useSelector } from "../../services/types/hooks";

import { useForm } from "../../hooks/useForm";

const Profile: FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  // Используем хук useForm для управления формой
  const { values, setValues } = useForm({
    name: user!.name,
    password: "",
    email: user!.email,
  });

  // Состояние для отслеживания изменений в форме
  const [buttons, setButtons] = useState(false);

  // Обработчик изменения значения в инпуте
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setButtons(true);
  };

  // Обработчик отправки формы
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUser(values));
    setButtons(false);
  };

  // Сброс формы к исходным значениям
  const resetForm = () => {
    if (user !== null) {
      setValues({ name: user.name, password: "", email: user.email });
      setButtons(false);
    }
  };

  // Реф для фокусировки на инпуте после клика на иконку
  const inputRef = useRef<HTMLInputElement>(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        placeholder={"Имя"}
        type={"text"}
        name={"name"}
        icon="EditIcon"
        value={values.name}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        ref={inputRef}
        onChange={handleChange}
        onIconClick={onIconClick}
      />
      <EmailInput
        placeholder={"Логин"}
        value={values.email}
        name={"email"}
        onChange={handleChange}
      />
      <PasswordInput
        placeholder={"Пароль"}
        value={values.password}
        name={"password"}
        icon="EditIcon"
        onChange={handleChange}
      />
      {/* Кнопки "Отмена" и "Сохранить" */}
      {buttons && (
        <div className={styles.buttons}>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            onClick={resetForm}
          >
            Отмена
          </Button>
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
};

export default Profile;
