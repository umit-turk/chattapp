import React from "react";
import { Link } from "react-router-dom";
import { Form, Segment, Button, Grid, Message } from "semantic-ui-react";
import styles from "./login.module.css";

const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
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

        <Form size="large" className={styles.form} onSubmit={handleSubmit}>
          <Segment>
            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
              name="email"
              placeholder="Email Adresi"
              type="email"
            />
            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
              name="password"
              placeholder="Şifre"
              type="password"
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
