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

import { FC } from "react";
import {
  IconCalendar,
  IconCalendarMonth,
  IconCalendarWeek,
} from "@tabler/icons-react";

interface Props {
  close: () => void;
}

const ModalCreate: FC<Props> = ({ close }) => {
  const [period, setPeriod] = useState("");
  const [checked, setChecked] = useState(false);
  const [targetValue, setTargetValue] = useState<string | number>("");

  const [periodError, setPeriodError] = useState("");
  const [habitError, setHabitError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [targetValueError, setTargetValueError] = useState("");

  const { addHabit, categories, addCategory } = useGlobalStore(
    (state) => state
  );

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setPeriodError("");
    setHabitError("");
    setCategoryError("");
    setTargetValueError("");

    const formData = new FormData(event.currentTarget.form as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    if (!data.period) {
      setPeriodError("Выберите период");
      return;
    }

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
      title: data.habit as string,
      category: data.category as string,
      period: period as "daily" | "weekly" | "monthly",
      targetValue: checked ? +data.targetValue : 1,
    };

    addHabit(habit);

    if (!categories.includes(data.category as string)) {
      addCategory(data.category as string);
    }

    close();
  };

  return (
    <form className={classes["create-form"]}>
      <SegmentedControl
        visibleFrom="sm"
        value={period}
        onChange={(value) => {
          setPeriod(value as "daily" | "weekly" | "monthly")
          setPeriodError("")
        }
        }
        name="period"
        data={[
          { label: "Ежедневная", value: "daily" },
          { label: "Еженедельная", value: "weekly" },
          { label: "Ежемесечная", value: "monthly" },
        ]}
        fullWidth
      />

      <SegmentedControl
        hiddenFrom="sm"
        value={period}
        onChange={(value) => {
          setPeriod(value as "daily" | "weekly" | "monthly")
          setPeriodError("")
        }}
        name="period"
        data={[
          { label: <IconCalendar />, value: "daily" },
          { label: <IconCalendarWeek />, value: "weekly" },
          { label: <IconCalendarMonth />, value: "monthly" },
        ]}
        fullWidth
      />
      <label htmlFor="period" className={classes["period-error"]}>{periodError}</label>

      <TextInput
        type="text"
        name="habit"
        label="Привычка"
        placeholder="Пресс"
        data-autofocus
        onChange={() => setHabitError("")}
        error={habitError}
      />

      <Autocomplete
        label="Категория"
        name="category"
        placeholder="Введи категорию"
        limit={5}
        comboboxProps={{
          position: "top",
          middlewares: { flip: false, shift: false },
        }}
        data={categories}
        onChange={() => setCategoryError("")}
        error={categoryError}
      />

      <Switch
        onChange={(event) => setChecked(event.currentTarget.checked)}
        label="С количественной отметкой"
      />

      {checked && (
        <NumberInput
          value={targetValue}
          onChange={(value) => {
            setTargetValue(value);
            setTargetValueError("");
          }}
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
