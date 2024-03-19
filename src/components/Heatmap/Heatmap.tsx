import HeatMap from '@uiw/react-heat-map';
import { Tooltip } from '@mantine/core';
import { useGlobalStore } from 'app/globalStore';

const value = [
  { date: '2016/01/11', count:2 },
  ...[...Array(17)].map((_, idx) => ({ date: `2016/01/${idx + 10}`, count: idx, })),
  ...[...Array(17)].map((_, idx) => ({ date: `2016/02/${idx + 10}`, count: idx, })),
  { date: '2016/04/12', count:2 },
  { date: '2016/05/01', count:5 },
  { date: '2016/05/02', count:5 },
  { date: '2016/05/03', count:1 },
  { date: '2016/05/04', count:11 },
  { date: '2016/05/08', count:32 },
];

interface Value {
  date: string;
  count: number;
}

const Heatmap = () => {

    const history = useGlobalStore(state => state.history);
    const historyCompleted = history.filter(action => action.isCompleted);
    
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

    const value: Value[] = Object.entries(groupedByDate).map(([date, count]) => ({ date, count }));

    const toLocalDate = (date: string) => {
      const [year, month, day] = date.split('/');
      return new Date(+year, +month, +day).toLocaleDateString();
    }

  return (
    <HeatMap
      value={value}
      width={600}
      startDate={new Date('2024/01/01')}
      style={{color: 'white'}}
      panelColors={{
        0: '#ebedf0',
        1: '#9be9a8',
        4: '#40c463',
        10: '#30a14e',
        15: '#216e39',
      }}
      rectRender={(props, data) => {
        
        // if (!data.count) return <rect {...props} />;
        return (
          <Tooltip position="top" events={{ hover: true, focus: true, touch: true }} label={`За ${toLocalDate(data.date)} выполнено: ${data.count || 0}`}>
            <rect {...props} />
          </Tooltip>
        );
      }}
    />
  )
};
export default Heatmap