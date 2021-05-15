import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { Form, Segment, Button, Grid, Message } from "semantic-ui-react";
import styles from "./login.module.css";

const Login = () => {
    const { register, errors, handleSubmit, setValue} = useForm(); //propları useform içerisinden alıyoruz.

    useEffect(() => {
        register({name: "email" }, {required: true});
        register({name: "password"}, {required: true, minLength : 6})
    }, [])

  const onSubmit = (data, e) => {
    console.log(data)
  };
  return (
    <Grid
      textAlign="center"
      verticalAlign="middle"
      className={styles.container}
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <h1 className={styles.formHeader}>
          myChat
          <span>.io</span>
        </h1>

        <Form size="large" className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Segment>
            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
              name="email"
              onChange={(event, {name, value}) => {
                  setValue(name, value)
              }}
              placeholder="Email Adresi"
              type="email"
              error={errors.email ? true : false}
            />
            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
              name="password"
              onChange={(event, {name, value}) => {
                  setValue(name,value)
              }}
              placeholder="Şifre"
              type="password"
              error={errors.password ? true : false}
            />
            <Button color="purple" fluid size="large">
              Giriş Yap
            </Button>
          </Segment>
        </Form>

        <Message>
            Yeni misin? <Link to="/signup">Hesap Oluştur</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
