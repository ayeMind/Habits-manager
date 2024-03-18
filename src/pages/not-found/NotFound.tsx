import classes from './styles.module.css';
import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
       <div className={classes["page"]}>
            <h1>Страница не найдена</h1>
            <h2 className={classes["error-code"]}>404</h2>
            <Link to='/'>
              <Button variant="outline">Вернуться</Button>
            </Link>
       </div>
  );
};

export default NotFound;