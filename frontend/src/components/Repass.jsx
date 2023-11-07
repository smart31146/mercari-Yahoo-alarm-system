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

const Repass = () => {
    const classes = useStyles();
    const [values, setValues] = useState({
        approve: '',
        email: '',
        password: '',
        repassword: '',
      });
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
    e.preventDefault();
    if(values.approve === "") {
      alert("承認番号を入力してください。"); return ;
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

    const repassData = {
      approveNum: values.approve,
      email: values.email,
      password: values.password,
    };

    axios
      .post('/api/v1/user/repass', repassData)
      .then((res) => {
        window.location = '/login';
      })
      .catch((err) => setErrorMessage(err.response.data));
    };

    const handleChange = (event) => {
    const name = event.target.id;
    setValues({ ...values, [name]: event.target.value });
    };

    return (<Container component='main' maxWidth='xs'>
    <CssBaseline />
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component='h1' variant='h5'>
      パスワード再設定
      </Typography>
      <form className={classes.form}>
        <TextField
          name='approve'
          variant='standard'
          margin='normal'
          required
          fullWidth
          id='approve'
          label='承認番号'
          autoFocus
          value={values.approve}
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
          設定
        </Button>
      </form>

      <Grid container justifyContent='flex-end'>
          <Grid item>
            <Link href='/login' variant='body2'>
            ログインページへ
            </Link>
          </Grid>
        </Grid>

        <p style={{marginTop: "10px"}}>メールアドレスに承認番号を送信しました。</p>
    </div>
  </Container>)
}

export default Repass;