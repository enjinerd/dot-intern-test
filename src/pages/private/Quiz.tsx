import {
  Box,
  Button,
  Container,
  createStyles,
  Divider,
  Group,
  Modal,
  Text,
  Title,
} from "@mantine/core";
import Layout from "components/layout/Layout";
import { Question } from "components/private";
import { ConfirmDialog } from "components/ui";
import { useQuiz } from "lib";
import { useCountdown } from "lib";
import { useAuth } from "lib";
import { useEffect } from "react";
import { useState } from "react";

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
    expiredTime,
    isStarted,
    resetQuiz,
  } = useQuiz();
  const [isFinished, setIsFinished] = useState(false);
  const { classes } = useStyles();
  const expiredTimeDate = new Date(expiredTime);
  const { minutes, seconds, expired } = useCountdown(expiredTimeDate);
  const { logout } = useAuth();
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [confirmSubmit, setConfirmSubmit] = useState(false);

  const handleStartQuestion = async () => {
    resetQuiz();
    await fetchQuestions();
    startQuiz();
    setIsFinished(false);
  };

  const handleSubmit = () => {
    calculateScore();
    setIsFinished(true);
  };

  const handleConfirmLogout = () => {
    setConfirmLogout(true);
  };

  useEffect(() => {
    if (expiredTimeDate === new Date(0)) {
      // Code
    }

    if (isStarted && expired && expiredTimeDate !== new Date(0)) {
      setIsFinished(true);
    }

    if (expired) {
      calculateScore();
      setIsFinished(true);
    }
  }, [expired]);

  return (
    <Layout>
      <Container className={classes.wrapper}>
        {isStarted ? (
          expiredTime > 0 && expiredTimeDate !== new Date(0) && !isFinished ? (
            <Container className={classes.question_wrapper}>
              <Box>
                <Title>{`${minutes} : ${seconds}`}</Title>
              </Box>
              <Group>
                <Text variant="gradient" weight="800" size="lg">
                  {" "}
                  {`Question No : ${lastQuestion + 1} / 10`}
                </Text>
                <Button
                  variant="filled"
                  color="orange"
                  onClick={() => setConfirmSubmit(true)}>
                  Submit
                </Button>
              </Group>
              <Question
                question={questions[lastQuestion].question}
                user_answer={questions[lastQuestion].user_answer}
              />
              <ConfirmDialog
                setOpened={setConfirmSubmit}
                title="Submit"
                msg="Are you sure wanna Submit your answer?"
                handleConfirm={handleSubmit}
                isOpened={confirmSubmit}
              />
            </Container>
          ) : (
            <Modal
              withCloseButton={false}
              opened={true}
              className={classes.modal}
              onClose={() => console.log("close")}>
              <Container>
                <Title color="orange">Your Score</Title>
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
                  <Button color="blue" fullWidth onClick={() => resetQuiz()}>
                    Close
                  </Button>
                </Group>
              </Container>
            </Modal>
          )
        ) : (
          <Group className={classes.start_wrapper}>
            <Title className={classes.title}>Geography Quiz</Title>
            <Group>
              <Button size="lg" onClick={handleStartQuestion} fullWidth>
                {" "}
                Start{" "}
              </Button>
              <Button size="lg" onClick={handleConfirmLogout} color="red" fullWidth>
                {" "}
                Logout{" "}
              </Button>
              <ConfirmDialog
                setOpened={setConfirmLogout}
                title="Logout"
                msg="Are you sure wanna Logout?"
                handleConfirm={() => {
                  logout();
                }}
                isOpened={confirmLogout}
              />
            </Group>
          </Group>
        )}
      </Container>
    </Layout>
  );
}
