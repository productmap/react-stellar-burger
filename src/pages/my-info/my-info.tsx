import styles from "./my-info.module.scss"
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useUpdateUserMutation } from "../../store/api/burgers.api";
import { useAppSelector } from "../../hooks/hooks";

export default function MyInfo() {
  const user = useAppSelector((store) => store.user);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const nameRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const submitFormRef = useRef<HTMLDivElement>(null);

  const onIconClick = () => {};

  const formInitialState = {
    name: user.currentUser.name,
    email: user.currentUser.email,
    password: "***************",
  };

  const [formValues, setFormValues] = useState(formInitialState);
  const { name, email, password } = formValues;

  const submitFormVisibility = () => {
    if (submitFormRef.current) {
      submitFormRef.current.style.opacity =
        JSON.stringify(formValues) === JSON.stringify(formInitialState)
          ? "0"
          : "1";
    }
  };

  useEffect(() => {
    submitFormVisibility();
  }, [formValues, formInitialState]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  // Ручка изменения данных пользователя
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const response = await updateUser(formValues).unwrap();
      setFormValues(formInitialState);
      if (response.success) {
        toast.success("Данные изменены");
      } else {
        toast.error("Не удалось изменить данные");
      }
    } catch (error: any) {
      toast.error(error.data.message);
    }
  }

  // Ручка отмены изменений
  const handleCancel = () => {
    setFormValues(formInitialState);
    submitFormVisibility();
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          value={name}
          placeholder="Имя"
          ref={nameRef}
          // onChange={(e) => setName({ ...name, newName: e.target.value })}
          onChange={(e) => handleChange(e)}
          error={false}
          icon="EditIcon"
          onIconClick={onIconClick}
          size="default"
          extraClass="mb-6"
        />
        <Input
          name={"email"}
          placeholder={"E-mail"}
          // onChange={(e) => setEmail(e.target.value)}
          onChange={(e) => handleChange(e)}
          value={email}
          icon={"EditIcon"}
          extraClass="mb-6"
          // ref={inputRef}
          onIconClick={onIconClick}
        />
        <Input
          name={"password"}
          onChange={(e) => handleChange(e)}
          // onFocus={() => setFormValue({ ...formValues, password: "" })}
          value={password}
          error={false}
          icon={"EditIcon"}
          extraClass="mb-6"
          ref={inputRef}
          onIconClick={onIconClick}
        />
        <div
          className={styles.editForm}
          ref={submitFormRef}
          style={{ opacity: 0 }}
        >
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            onClick={handleCancel}
          >
            Отмена
          </Button>
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            disabled={isLoading}
          >
            {isLoading ? "Ожидайте" : "Сохранить"}
          </Button>
        </div>
      </form>
    </div>
  );
}
