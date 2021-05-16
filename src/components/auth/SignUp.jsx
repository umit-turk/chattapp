import React, { useState, useEffect } from "react";
import { useFirebase } from "react-redux-firebase";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, Segment, Button, Grid, Message } from "semantic-ui-react";
import styles from "./signup.module.css";

const SignUp = () => {
  const firebase = useFirebase();

  const { register, errors, handleSubmit, setValue } = useForm();

  const [fbErrors, setFbErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    register({ name: "username" }, { required: true });
    register({ name: "email" }, { required: true });
    register({ name: "password" }, { required: true, minLength: 6 });
  }, []);

  const onSubmit = ({ username, email, password }, e) => {
    setSubmitting(true);
    setFbErrors([]);
    const [first, last] = username.split("");

    firebase
      .createUser(
        { email, password },
        {
          name: username,
          avatar: `https://ui-avatars.com/api/?name=${first}+${last}&background=random&color=fff`,
        }
      )
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        setFbErrors([{ message: error.message }]);
      })
      .finally(() => {
        setSubmitting(false)
      })
  };

  const displayErrors = () =>
    fbErrors.map((error, index) => <p key={index}>{error.message}</p>);

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

        <Form
          size="large"
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Segment>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              name="username"
              onChange={(event, { name, value }) => {
                setValue(name, value);
              }}
              placeholder="Kullanıcı Adı"
              type="text"
              error={errors.username ? true : false}
            />
            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
              name="email"
              onChange={(event, { name, value }) => {
                setValue(name, value);
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
              onChange={(event, { name, value }) => {
                setValue(name, value);
              }}
              placeholder="Şifre"
              type="password"
              error={errors.password ? true : false}
            />
            <Button color="purple" fluid size="large" disabled={submitting}>
              Kaydol
            </Button>
          </Segment>
        </Form>
        {fbErrors.length > 0 && <Message error>{displayErrors()}</Message>}

        <Message>
          Zaten bir hesabın car mı? <Link to="/login">Giriş Yap</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default SignUp;
