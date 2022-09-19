import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Alert,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";
import Layout from "components/layout/Layout";
import { useAuth } from "lib";

export function Register() {
  const { register } = useAuth();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isRegistered, setRegisterd] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("Required")
        .min(6, "Password must be at least 6 characters"),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      setError(null);
      setLoading(true);
      await register(values.email, values.password).then((res) => {
        console.log(res);
        if (res?.message) {
          setError(res.message);
          setLoading(false);
        }
      });
      if (!error) {
        setRegisterd(true);
      }
    },
  });

  return (
    <Layout>
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}>
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Have an account ?{" "}
          <Link to="/login">
            <Anchor<"a">>Login</Anchor>
          </Link>
        </Text>
        {error && (
          <Alert
            icon={<IconAlertCircle size={16} />}
            mt={15}
            title="Error!"
            color="red"
            variant="filled">
            {error}
          </Alert>
        )}
        {isRegistered && (
          <Alert
            icon={<IconAlertCircle size={16} />}
            mt={15}
            title="Success"
            color="green"
            variant="filled">
            You have successfully registered. Please login to continue.
          </Alert>
        )}
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={formik.handleSubmit}>
            <TextInput
              label="Email"
              placeholder="you@mantine.dev"
              id="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              error={formik.errors.email}
              required
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              error={formik.errors.password}
              required
              mt="md"
            />
            <PasswordInput
              label="Confirm Password"
              placeholder="Your password"
              id="passwordConfirm"
              name="passwordConfirm"
              onChange={formik.handleChange}
              value={formik.values.passwordConfirm}
              error={formik.errors.passwordConfirm}
              required
              mt="md"
            />
            <Button fullWidth mt="xl" type="submit" disabled={isLoading}>
              Register
            </Button>
          </form>
        </Paper>
      </Container>
    </Layout>
  );
}
