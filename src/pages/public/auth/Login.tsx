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
import { Link } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";
import Layout from "components/layout/Layout";
import { useAuth } from "lib";

export function Login() {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      setError(null);
      setLoading(true);
      await login(values.email, values.password).then((res) => {
        if (res?.message) {
          setError(res.message);
          setLoading(false);
        }
      });
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
          Do not have an account yet?{" "}
          <Link to="/register">
            <Anchor<"a">>Create account</Anchor>
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
            <Button fullWidth mt="xl" type="submit" disabled={isLoading}>
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </Layout>
  );
}
