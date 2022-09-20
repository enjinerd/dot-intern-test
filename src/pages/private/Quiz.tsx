import { Container, Title, createStyles, Button, Group, Text } from "@mantine/core";
import Layout from "components/layout/Layout";
import { useQuiz } from "lib";
import { useEffect } from "react";
import { Question } from "components/private";
import { useState } from "react";
import { useCountdown } from "lib";

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing.xl,
  },

  button: {
    width: "100%",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  title: {
    textAlign: "center",
  },

  question_wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing.lg,
  },
}));

export default function Quiz() {
  const {
    fetchQuestions,
    questions,
    lastQuestion,
    startQuiz,
    calculateScore,
    score,
    startDateTime,
    expiredTime,
  } = useQuiz();
  const [isStarted, setIsStarted] = useState(false);
  const { classes, theme } = useStyles();
  const expiredTimeDate = new Date(expiredTime);
  const { minutes, seconds, expired } = useCountdown(expiredTimeDate);

  const handleStartQuestion = () => {
    startQuiz();
    setIsStarted(true);
  };

  const handleSubmit = () => {
    calculateScore();
    alert("Your score is " + score);
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
        {expired && <Text>Time is up!</Text>}
        {isStarted ? (
          <Container className={classes.question_wrapper}>
            <Group>
              <Text variant="gradient" weight="800" size="lg">
                {" "}
                {`${lastQuestion + 1} / 10`}
              </Text>
              {`${minutes} : ${seconds}`}
              <Button variant="filled" color="orange" onClick={() => handleSubmit()}>
                Submit
              </Button>
            </Group>
            <Question
              question={questions[lastQuestion].question}
              user_answer={questions[lastQuestion].user_answer}
            />
          </Container>
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
