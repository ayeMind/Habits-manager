import HeatMap from "@uiw/react-heat-map";
import { Tooltip, Text } from "@mantine/core";
import { useGlobalStore } from "app/globalStore";
interface Value {
  date: string;
  count: number;
}

import classes from './style.module.css'

const Heatmap = () => {
  const history = useGlobalStore((state) => state.history);
  const historyCompleted = history.filter((action) => action.isCompleted);

  // Group by date and formatting
  const groupedByDate = historyCompleted.reduce((acc, action) => {
    const date = new Date(action.date);
    const key = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
    if (!acc[key]) {
      acc[key] = 0;
    }
    acc[key]++;
    return acc;
  }, {} as Record<string, number>);

  const value: Value[] = Object.entries(groupedByDate).map(([date, count]) => ({
    date,
    count,
  }));

  const toLocalDate = (date: string) => {
    const [year, month, day] = date.split("/");
    return new Date(+year, +month, +day).toLocaleDateString();
  };

  const getLastYearDate = () => {
    const currentDate = new Date();
    const lastYear = new Date(
      currentDate.getFullYear() - 1,
      currentDate.getMonth(),
      currentDate.getDate()
    );
    const startLastYear = `${lastYear.getFullYear()}/${lastYear.getMonth()}/${lastYear.getDate()}`;
    const endLastYear = `${currentDate.getFullYear()}/${currentDate.getMonth()}/${currentDate.getDate()}`;
    return [startLastYear, endLastYear];
  };

  const [startDate, endDate] = getLastYearDate();

  const countForLastYear = value.reduce((acc, action) => {
    const date = new Date(action.date);
    if (date >= new Date(startDate) && date <= new Date(endDate)) {
      acc += action.count;
    }
    return acc;
  }, 0);

  return (
    <div className={classes["heatmap"]}>
      <Text ml={50}>{countForLastYear} выполнено за последний год</Text>
      <HeatMap
        value={value}
        startDate={new Date(startDate)}
        endDate={new Date(endDate)}
        weekLabels={["", "Mon", "", "Wed", "", "Fri", ""]}
        monthLabels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
        width={725}
        style={{ color: "white" }}
        panelColors={{
          0: "#fdfdfd",
          1: "#9be9a8",
          4: "#40c463",
          10: "#30a14e",
          15: "#216e39",
        }}
        rectRender={(props, data) => {
          return (
            <Tooltip
              position="top"
              events={{ hover: true, focus: true, touch: true }}
              label={`За ${toLocalDate(data.date)} выполнено: ${
                data.count || 0
              }`}
            >
              <rect {...props} />
            </Tooltip>
          );
        }}
      />
    </div>
  );
};
export default Heatmap;
