import { FC } from "react"
import { Button, Flex, TextInput } from "@mantine/core";
import { useState } from "react";
import { useGlobalStore } from "app/globalStore";

interface Props {
    close?: () => void;
}

const UserNameInput:FC<Props> = ({close}) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const { setUserName } = useGlobalStore((state) => state);

  const handleChangeName = (value: string) => {
    setError("");
    if (value.length < 1 || value.length > 16) {
      setError("Имя пользователя не может быть пустым и быть длиннее 16 символов");
        return;
    }
    setUserName(value);
    close && close();
  };

  return (
    <>
      <label htmlFor="userName">Имя пользователя:</label>
      <Flex mt={5} gap="sm" align="center">
        <TextInput
          value={value}
          onChange={(event) => {
            setValue(event.currentTarget.value)
            setError("");
          }}
          w={200}
          placeholder="Гигачад2018"
          title="userName"
          className="input"
          error={error}
        />
        <Button onClick={() => handleChangeName(value)}>Сменить</Button>
      </Flex>
    </>
  );
};

export default UserNameInput;
