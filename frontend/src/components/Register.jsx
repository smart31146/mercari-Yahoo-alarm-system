import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import validator from 'validator';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorMessage: {
    color: 'red',
  },
}));

const Register = () => {
  const classes = useStyles();

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    repassword: '',
  });

  const [errorMessage, setErrorMessage] = useState([]);
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(validator.isEmail(values.email));
    if(values.name === "") {
      alert("名前を入力してください。"); return ;
    }
    if(validator.isEmail(values.email) === false) { 
      alert('メールアドレスを正確に入力してください。'); return ;
    }
    if(values.password.length < 6) {
      alert("パスワードは6桁以上必要です。");return ;
    }
    if(values.password !== values.repassword) {
      alert("パスワードを正確に入力してください。"); return ;
    }

    const registerData = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    axios
      .post('/api/v1/user/register', registerData)
      .then((res) => {
        localStorage.setItem('token', JSON.stringify(res.data));
        window.location = '/login';
      })
      .catch((err) => setErrorMessage(err.response.data));
  };

  React.useEffect(() => {
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  }, [errorMessage]);

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
        ユーザー登録
        </Typography>
        <form className={classes.form}>
          <TextField
            name='name'
            variant='standard'
            margin='normal'
            required
            fullWidth
            id='name'
            label='名前'
            autoFocus
            value={values.name}
            onChange={handleChange}
          />

          <TextField
            variant='standard'
            required
            margin='normal'
            fullWidth
            id='email'
            label='メールアドレス'
            name='email'
            value={values.email}
            onChange={handleChange}
          />

          <TextField
            variant='standard'
            required
            fullWidth
            id='password'
            label='パスワード'
            margin='normal'
            name='password'
            value={values.password}
            onChange={handleChange}
          />

          <TextField
            variant='standard'
            required
            fullWidth
            name='repassword'
            margin='normal'
            label='パスワード確認'
            type='repassword'
            id='repassword'
            value={values.repassword}
            onChange={handleChange}
          />

          <div className={classes.errorMessage}>{errorMessage}</div>
          <Button
            type='button'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={handleSubmit}
          >
            登録
          </Button>
        </form>
        <Grid container justifyContent='flex-end'>
          <Grid item>
            <Link href='/login' variant='body2'>
            既にアカウントをお持ちですか？ 会員登録
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Register;
