import {
  Container,
  Title,
  createStyles,
  Button,
  Group,
  Text,
  Modal,
  Box,
  Divider,
} from "@mantine/core";
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

  start_wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing.xl,
  },

  modal: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing.xl,
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
    resetQuiz,
  } = useQuiz();
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const { classes, theme } = useStyles();
  const expiredTimeDate = new Date(expiredTime);
  const { minutes, seconds, expired } = useCountdown(expiredTimeDate);

  const handleStartQuestion = async () => {
    await fetchQuestions();
    startQuiz();
    setIsStarted(true);
  };

  const handleFinished = () => {
    setIsStarted(false);
    setIsFinished(false);
    resetQuiz();
  };

  const handleSubmit = () => {
    calculateScore();
    setIsFinished(true);
  };

  useEffect(() => {
    if (expiredTimeDate === new Date(0)) {
      setIsFinished(false);
    }
  }, [expired]);

  return (
    <Layout>
      <Container className={classes.wrapper}>
        <Modal
          withCloseButton={false}
          opened={isFinished}
          className={classes.modal}
          onClose={() => console.log("close")}>
          <Container>
            <Title color="orange">Time is up!</Title>
            <Group mt={12}>
              <Text>
                Your score is {score} out of {questions.length * 10}
                <Divider />
                You answered {questions.filter((q) => q.user_answer !== "").length} out of{" "}
                {questions.length} questions <Divider /> You correct answer is{" "}
                {score / 10} out of {questions.length} questions <Divider /> Your wrong
                answer is {questions.length - score / 10} out of {questions.length}{" "}
                questions
                <Divider />
              </Text>
            </Group>
            <Group mt={12}>
              <Button color="blue" fullWidth onClick={handleFinished}>
                Start another Quiz
              </Button>
            </Group>
          </Container>
        </Modal>

        {isStarted ? (
          expiredTime > 0 ? (
            <Container className={classes.question_wrapper}>
              <Box>
                <Title>{`${minutes} : ${seconds}`}</Title>
              </Box>
              <Group>
                <Text variant="gradient" weight="800" size="lg">
                  {" "}
                  {`Question No : ${lastQuestion + 1} / 10`}
                </Text>
                <Button variant="filled" color="orange" onClick={handleSubmit}>
                  Submit
                </Button>
              </Group>
              <Question
                question={questions[lastQuestion].question}
                user_answer={questions[lastQuestion].user_answer}
              />
            </Container>
          ) : (
            <Modal
              withCloseButton={false}
              opened={true}
              className={classes.modal}
              onClose={() => console.log("close")}>
              <Container>
                <Title color="orange">Time is up!</Title>
                <Group mt={12}>
                  <Text>
                    Your score is {score} out of {questions.length * 10}
                    <Divider />
                    You answered {
                      questions.filter((q) => q.user_answer !== "").length
                    }{" "}
                    out of {questions.length} questions <Divider /> You correct answer is{" "}
                    {score / 10} out of {questions.length} questions <Divider /> Your
                    wrong answer is {questions.length - score / 10} out of{" "}
                    {questions.length} questions
                    <Divider />
                  </Text>
                </Group>
                <Group mt={12}>
                  <Button color="blue" fullWidth>
                    Start another Quiz
                  </Button>
                  <Button color="orange" fullWidth onClick={() => setIsFinished(false)}>
                    Close
                  </Button>
                </Group>
              </Container>
            </Modal>
          )
        ) : (
          <Group className={classes.start_wrapper}>
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
