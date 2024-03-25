import HeatMap from "@uiw/react-heat-map";
import { Tooltip, Text } from "@mantine/core";
import { useGlobalStore } from "app/globalStore";

import classes from './style.module.css'
interface Value {
  date: string;
  count: number;
}

const Heatmap = () => {

  const panelColors = {
    0: "#e9eeee",
    1: "#9be9a8",
    4: "#40c463",
    10: "#30a14e",
    15: "#216e39",
  }
  
  const theme = useGlobalStore((state) => state.theme);
  const textColor = (theme === "light") ? "#000" : "#fff";

  const {history, getDate} = useGlobalStore((state) => state);
  const currentDate = getDate()
  
  const historyCompleted = history.filter((action) => action.isCompleted);

  
  const groupedByDate = historyCompleted.reduce((acc, action) => {
    const date = new Date(action.date);
    const key = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`;
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
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString();
  };

  const getLastYearDate = () => {
    const lastYear = new Date(
      currentDate.getFullYear() - 1,
      currentDate.getMonth(),
      currentDate.getDate()
    );
    
    const startLastYear = `${lastYear.getFullYear()}/${lastYear.getMonth()+1}/${lastYear.getDate()}`;
    const endLastYear = `${currentDate.getFullYear()}/${currentDate.getMonth()+1}/${currentDate.getDate()}`;
    
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
      <Text className={classes["title"]} ml={50} size='sm'>{countForLastYear} выполнено за последний год</Text>
      <HeatMap
        value={value}
        startDate={new Date(startDate)}
        endDate={new Date(endDate)}
        weekLabels={["", "Mon", "", "Wed", "", "Fri", ""]}
        monthLabels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
        width={730}
        style={{ color: textColor }}
        panelColors={panelColors}
        rectRender={(props: React.SVGProps<SVGRectElement>, data: Value) => {
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
