import { Accordion } from "@mantine/core";
import { CodeHighlight } from '@mantine/code-highlight';
import PageLayout from "layouts/PageLayout";

const standardJSON = `
interface DataToUpload {
    // данные о самих привычках
    habits: Habit[];
    
    // данные о выполнении
    actions: HabitAction[];
}

interface Habit {
    // у каждой привычки уникальный id
    id: number;

    title: string;

    category: string;

    // дата, начиная с которой Вася трекает эту привычку
    addDate: Date; 

    period: 'daily' | 'weekly' | 'monthly';
    
    // необязательное поле – целевое значение для численных привычек,
    // например, пройти 10000 шагов
    targetValue?: number;
}

interface HabitAction {
    // id привычки, чтобы связать с объектами Habit
    id: number;

    // дата и время, когда это действие отмечено как выполненное
    date: Date;
    
    // необязательное поле – значение для численных привычек,
    // например, 12000 для привычки "пройти 10000 шагов"
    value?: number;
}
`

const extendedJSON = `
    {"library-storage":
        {"state":
            {"habits": 
                [{"id":1,"title":"Пить воду сразу после будильника","category":"Здоровье","period":"daily"},
                {"id":2,"title":"Прогулка на свежем воздухе","category":"Здоровье","period":"daily","saved":true},
                {"id":3,"title":"Лечь спать до 23:00","category":"Здоровье","period":"daily","saved":true},
                {"id":4,"title":"Встать по первому будильнику","category":"Здоровье","period":"daily"},
                {"id":5,"title":"Прогулка на свежем воздухе","category":"Здоровье","period":"weekly","saved":true},
                {"id":6,"title":"Читать научную статью","category":"Образование","period":"weekly","targetValue":2,"saved":true},
                {"id":7,"title":"Прочитать главу из учебника","category":"Образование","period":"daily"},
                {"id":8,"title":"Прочитать 10 глав из учебника","category":"Образование","period":"weekly","targetValue":10},
                {"id":9,"title":"Попробовать новую библиотеку или фреймворк","category":"Образование","period":"monthly","saved":true},
                {"id":10,"title":"Посмотреть фильм на английском языке","category":"Образование","period":"monthly","saved":true},
                {"id":11,"title":"Прийти на конференцию по веб-разработке","category":"Образование","period":"monthly","saved":true},
                {"id":12,"title":"Убрать свое рабочее место","category":"Дом","period":"daily"},{"id":13,"title":"Помыть посуду сразу после еды","category":"Дом","period":"daily"},
                {"id":14,"title":"Сделать генеральную уборку в квартире","category":"Дом","period":"monthly"},
                {"id":15,"title":"Работа над проектом на 2 часа","category":"Работа","period":"daily","targetValue":2},
                {"id":16,"title":"Не курить весь день","category":"Отказ от вредной привычки","period":"daily"},
                {"id":17,"title":"Не употреблять алкоголь весь день","category":"Отказ от вредной привычки","period":"daily"},
                {"id":18,"title":"Не есть сладкое весь день","category":"Отказ от вредной привычки","period":"daily"},
                {"id":19,"title":"Сделать зарядку","category":"Здоровье","period":"daily"},
                {"id":20,"title":"Сделать домашнее задание","category":"Образование","period":"daily"}]},"version":0},
    "habits-storage":
        {"state":
            {"userName":"Гигачад",
            "avatar": "base64exampleistobig",
            "currentDateCorrection":0,
            "experience":50,
            "level":1,
            "gold":5,
            "earned":5,
            "spent":0,
            "daysStreak":0,
            "maxDaysStreak":0,
            "habits":
                [{"title":"Прогулка на свежем воздухе",
                     "category":"Здоровье","period":"daily",
                     "targetValue":1,
                     "id":1,
                     "currentValue":1,
                     "addDate":"2024-03-21T10:32:07.231Z",
                     "isCompleted":true
                },
                {"title":"Лечь спать до 23:00",
                    "category":"Здоровье",
                    "period":"daily",
                    "targetValue":1,"id":2,
                    "currentValue":1,
                    "addDate":"2024-03-21T10:32:07.232Z",
                    "isCompleted":true},
                {"title":"Прогулка на свежем воздухе",
                    "category":"Здоровье",
                    "period":"weekly",
                    "targetValue":1,
                    "id":3,
                    "currentValue":1,
                    "addDate":"2024-03-21T10:32:07.233Z",
                    "isCompleted":true}, 
                {"title":"Читать научную статью",
                    "category":"Образование",
                    "period":"weekly",
                    "targetValue":2,
                    "id":4,
                    "currentValue":1,
                    "addDate":"2024-03-21T10:32:07.233Z",
                    "isCompleted":false},
                {"title":"Попробовать новую библиотеку или фреймворк",
                    "category":"Образование"
                    ,"period":"monthly",
                    "targetValue":1,
                    "id":5,"currentValue":1,
                    "addDate":"2024-03-21T10:32:07.233Z",
                    "isCompleted":true},
                {"title":"Посмотреть фильм на английском языке",
                    "category":"Образование",
                    "period":"monthly",
                    "targetValue":1,
                    "id":6,
                    "currentValue":0,
                    "addDate":"2024-03-21T10:32:07.234Z",
                    "isCompleted":false},
                {"title":"Прийти на конференцию по веб-разработке",
                    "category":"Образование",
                    "period":"monthly",
                    "targetValue":1,
                    "id":7,
                    "currentValue":1,
                    "addDate":"2024-03-21T10:32:07.234Z",
                    "isCompleted":true}],
                "lastStreakUpdateDate":"2024-03-21T10:31:54.630Z",
                "history": 
                        [{"id":1,
                        "habit_id":1,
                        "habit_period":"daily",
                        "date":"2024-03-21T10:32:08.981Z",
                        "isCompleted":true,"value":0
                        },
                        {"id":2,
                        "habit_id":2,
                        "habit_period":"daily",
                        "date":"2024-03-21T10:32:09.507Z",
                        "isCompleted":true,
                        "value":0
                        },
                        {"id":3,
                        "habit_id":3,
                        "habit_period":"weekly",
                        "date":"2024-03-21T10:32:13.448Z",
                        "isCompleted":true,"value":1},
                        {"id":4,
                        "habit_id":5,
                        "habit_period":"monthly",
                        "date":"2024-03-21T10:32:17.753Z",
                        "isCompleted":true,"value":0},
                        {"id":5,
                        "habit_id":7,
                        "habit_period":"monthly",
                        "date":"2024-03-21T10:32:19.208Z",
                        "isCompleted":true,"value":0}],
                "categories": ["Здоровье","Образование","Дом","Работа","Отказ от вредной привычки"]},
                "version":0}}
`;

const standardExample = `
{
    "habits": [
        {
            "id": 1,
            "title": "Качать пресс",
            "category": "Физическая активность",
            "addDate": "2024-03-01T00:00:00Z",
            "period": "daily"
        },
        {
            "id": 2,
            "title": "Читать 10 страниц книги",
            "category": "Саморазвитие",
            "addDate": "2024-02-15T00:00:00Z",
            "period": "weekly"
        },
        {
            "id": 3,
            "title": "Учить новое слово в немецком",
            "category": "Языки",
            "addDate": "2024-03-10T00:00:00Z",
            "period": "daily"
        },
        {
            "id": 4,
            "title": "Смотреть одно видео про финансы",
            "category": "Финансовая грамотность",
            "addDate": "2024-02-20T00:00:00Z",
            "period": "daily"
        }
    ],
    "actions": [
        {
            "id": 1,
            "date": "2024-03-13T08:30:00Z"
        },
        {
            "id": 1,
            "date": "2024-03-14T09:00:00Z"
        },
        {
            "id": 2,
            "date": "2024-03-12T20:00:00Z"
        },
        {
            "id": 2,
            "date": "2024-03-14T18:30:00Z"
        },
        {
            "id": 3,
            "date": "2024-03-14T10:15:00Z"
        },
        {
            "id": 4,
            "date": "2024-03-14T07:45:00Z"
        }
    ]
 }
 `

const formats = [
    {
        "value": "Стандартный",
        "description": <CodeHighlight code={standardJSON} language="ts" />
    }, 
    {
        "value": "Стандартный (пример)",
        "description": <CodeHighlight code={standardExample} language="json" />
    },
    {
        "value": "Расширенный (пример)",
        "description": <CodeHighlight code={extendedJSON} language="json" />
    }
]

const items = formats.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control>{item.value}</Accordion.Control>
      <Accordion.Panel>{item.description}</Accordion.Panel>
    </Accordion.Item>
  ));

const Formats = () => {
  return <PageLayout title="Форматы импорта" defaultTab="">
    <Accordion variant="separated" defaultValue="Стандартный">
        {items}
    </Accordion>
  </PageLayout>;
};

export default Formats;
