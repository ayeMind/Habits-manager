import { useState } from "react";
import {
  SegmentedControl,
  Autocomplete,
  TextInput,
  NumberInput,
  Switch,
  Button,
} from "@mantine/core";

import classes from "./style.module.css";

import { useGlobalStore } from "app/globalStore";

const ModalCreate = () => {
  const [period, setPeriod] = useState("daily");
  const [checked, setChecked] = useState(false);
  const [targetValue, setTargetValue] = useState<string | number>('');

  const [habitError, setHabitError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [targetValueError, setTargetValueError] = useState("");

  const getLastId = useGlobalStore((state) => state.getLastId);
  const addHabit = useGlobalStore((state) => state.addHabit);

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setHabitError("");
    setCategoryError("");
    setTargetValueError("");

    const formData = new FormData(event.currentTarget.form as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    if (!data.habit) {
      setHabitError("Привычка не может быть пустой");
      return;
    }

    if (!data.category) {
      setCategoryError("Категория не может быть пустой");
      return;
    }

    if (checked && !data.targetValue) {
      setTargetValueError("Цель привычки не может быть пустой");
      return;
    }

    const habit = {
      id: getLastId() + 1,
      title: data.habit as string,
      category: data.category as string,
      addDate: new Date(),
      period,
      targetValue: checked ? +data.targetValue : undefined,
    };

    addHabit(habit);
    console.log(habit);
    
  }

  return (
    <form className={classes["create-form"]}>
      <SegmentedControl
        value={period}
        onChange={setPeriod}
        name="period"
        data={[
          { label: "Ежедневная", value: "daily" },
          { label: "Еженедельная", value: "weekly" },
          { label: "Ежемесечная", value: "monthly" },
        ]}
        fullWidth
      />

      <TextInput 
        type="text"
        name="habit" label="Привычка" 
        placeholder="Пресс"
        error={habitError} />

      <Autocomplete
        label="Категория"
        name="category"
        placeholder="Введи категорию"
        limit={5}
        data={["Здоровье", "Работа", "Образование", "Дом", "Другое"]}
        error={categoryError}
      />

      <Switch
        onChange={(event) => setChecked(event.currentTarget.checked)}
        label="С количественной отметкой"
      />

      {checked && (
        <NumberInput
          value={targetValue}
          onChange={setTargetValue}
          min={1}
          name="targetValue"
          label="Введите цель привычки"
          clampBehavior="strict"
          allowDecimal={false}
          allowNegative={false}
          placeholder="1000"
          error={targetValueError}
        />
      )}

      <Button onClick={handleSubmit} color="teal" type="submit">
        Добавить
      </Button>
    </form>
  );
};

export default ModalCreate;
