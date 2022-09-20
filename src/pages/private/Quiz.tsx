import { Container, Title, createStyles, Button, Group } from "@mantine/core";
import Layout from "components/layout/Layout";
import { useQuiz } from "lib";
import { useEffect } from "react";
import { Question } from "components/private";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing.xl,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
    marginBottom: theme.spacing.md,
    textAlign: "center",

    [theme.fn.smallerThan("sm")]: {
      fontSize: 28,
      textAlign: "left",
    },
  },
  features: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color,
    marginBottom: theme.spacing.md,
    textAlign: "center",

    [theme.fn.smallerThan("sm")]: {
      fontSize: 32,
      textAlign: "left",
    },
  },
  description: {
    textAlign: "center",

    [theme.fn.smallerThan("sm")]: {
      textAlign: "left",
    },
  },
}));

export default function Quiz() {
  const { fetchQuestions, questions, lastQuestion, startQuiz } = useQuiz();
  const [isStarted, setIsStarted] = useState(false);
  const { classes, theme } = useStyles();

  const handleStartQuestion = () => {
    startQuiz();
    setIsStarted(true);
  };

  useEffect(() => {
    console.log(lastQuestion);
    if (lastQuestion === 0) {
      fetchQuestions();
    }
  }, []);

  return (
    <Layout>
      <Container className={classes.wrapper}>
        {isStarted ? (
          <Question question={questions[lastQuestion].question} />
        ) : (
          <Group>
            <Title className={classes.title}>Geography Quiz</Title>
            <Button size="lg" onClick={handleStartQuestion}>
              {" "}
              Start{" "}
            </Button>
          </Group>
        )}
      </Container>
    </Layout>
  );
}
