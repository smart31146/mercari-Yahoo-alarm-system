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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorMessage: {
    color: 'red',
  },
}));

const Login = () => {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const name = event.target.id;
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values.email);
    if(validator.isEmail(values.email) === false) { 
      alert('メールアドレスを正確に入力してください。'); return ;
    }
    if(values.password.length < 6) {
      alert("パスワードは6桁以上必要です。");return ;
    }
    
    const loginData = {
      email: values.email,
      password: values.password,
    };
   
    axios
      .post('/api/v1/user/login', loginData)
      .then((res) => {
        localStorage.setItem('token', JSON.stringify(res.data));
        window.location = '/';
      })
      .catch((err) => setErrorMessage(err.response.data));
  };

  const Repass = () => {
    if(validator.isEmail(values.email) === false) { 
      alert('メールアドレスを正確に入力してください。'); return ;
    }
    const Data = {email: values.email};
    axios
      .post('/api/v1/user/sendApproveNumber', Data)
      .then((res) => {
        window.location.href = "/repass";
        console.log("success!");
      })
      .catch((err) => setErrorMessage(err.response.data));
  }

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
        会員登録
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant='standard'
            margin='normal'
            required
            fullWidth
            id='email'
            label='メールアドレス'
            name='email'
            autoComplete='email'
            onChange={handleChange}
            value={values.email}
            autoFocus
          />
          <TextField
            variant='standard'
            margin='normal'
            required
            fullWidth
            name='password'
            label='パスワード'
            type='password'
            id='password'
            autoComplete='current-password'
            value={values.password}
            onChange={handleChange}
          />
          <div className={classes.errorMessage}>{errorMessage}</div>

          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            会員登録
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link href='/register' variant='body2' style={{textDecoration: "none"}}>
                {"アカウントをお持ちでないですか？ ユーザー登録"}
              </Link>
            </Grid>

            <Grid item style={{marginTop: "5px", cursor: "pointer", color: "#3f51b5"}}>
              <p href='/repass' variant='body2' onClick={Repass}>
                {"パスワードを忘れた方はこちら"}
              </p>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Login;
