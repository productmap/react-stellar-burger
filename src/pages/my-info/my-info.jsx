import styles from "./my-info.module.scss"
import {EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useRef, useState} from "react";

export default function MyInfo() {
  const user = useSelector(store => store.user)
  const navigate = useNavigate();
  const [name, setName] = useState("value");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const inputRef = useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
  };

  return (
    <div className={styles.container}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={(e) => setName(e.target.value)}
        icon={"EditIcon"}
        value={name}
        name={"name"}
        error={false}
        ref={inputRef}
        onIconClick={onIconClick}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="mb-6"
      />
      <EmailInput
        type={"email"}
        name={"email"}
        placeholder={"E-mail"}
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        extraClass="mb-6"
      />
      <PasswordInput
        name={"password"}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        error={false}
        extraClass="mb-6"
      />
    </div>
  );
}
