import React from 'react';
import PieChart from './PieChart';
import { Container, Typography, Button, makeStyles } from '@material-ui/core';
import axios from 'axios';
import './style.css';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  button: {
    float: 'right',
  },
  chartContainer: {
    marginTop: theme.spacing(8),
  },
}));

const Home = () => {
  // const [name, setName] = React.useState('');
  const classes = useStyles();

  const handleLogOut = () => {
  
    const logoutData = {
      email: JSON.parse(localStorage.getItem('token')).email,
    };
    localStorage.clear();
    axios
      .post('/api/v1/user/logout', logoutData)
      .then((res) => {
        window.location = '/login';
      })
      .catch((err) => {});
  };

  return (
    <Container className={classes.container}>
      <Button
        onClick={handleLogOut}
        variant='contained'
        color='primary'
        className={classes.button}
      >
        ログアウト
      </Button>
      <Typography variant='h5' align='center' className='wel'>
      ショップで最速で商品を購入することができます!
      </Typography>
      <section className={classes.chartContainer}>
        <PieChart />
      </section>
    </Container>
  );
};

export default Home;
