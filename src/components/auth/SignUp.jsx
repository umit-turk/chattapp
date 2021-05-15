import React from "react";
import { Link } from "react-router-dom";
import { Form, Segment, Button, Grid, Message } from "semantic-ui-react";
import styles from "./signup.module.css";

const SignUp = () => {
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
              icon="user"
              iconPosition="left"
              name="username"
              placeholder="Kullanıcı Adı"
              type="text"
            />
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
              Kaydol
            </Button>
          </Segment>
        </Form>

        <Message>
            Zaten bir hesabın car mı? <Link to="/login">Giriş Yap</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default SignUp;
