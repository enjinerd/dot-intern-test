import { Group, Button, Text, Container, createStyles } from "@mantine/core";
import { useQuiz } from "lib";
import { useEffect } from "react";
import { useCountdown } from "lib";

interface Question {
  question: string;
  user_answer: string;
}

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
      backgroundColor: theme.colors.green,
    },
  },

  title: {
    textAlign: "center",
  },
}));

export const Question = (props: Question) => {
  const { question, user_answer } = props;
  const { setAnswer, nextQuestion, prevQuestion, startDateTime, expiredTime } = useQuiz();
  const availableTime = expiredTime - startDateTime;
  const expiredTimeDate = new Date(expiredTime);
  console.log(expiredTimeDate);
  const { classes, theme } = useStyles();

  const handleAnswer = (answer: "False" | "True") => {
    console.log(user_answer);
    setAnswer(answer);
  };

  return (
    <>
      <Group>
        <Button onClick={() => prevQuestion()} variant="filled" color="gray">
          Prev
        </Button>
        <Button onClick={() => nextQuestion()} variant="filled" color="gray">
          Next
        </Button>
      </Group>
      <Container size="md" px="xs">
        <Container size="md" px="xs">
          <Text
            component="span"
            align="center"
            variant="gradient"
            gradient={{ from: "red", to: "orange", deg: 45 }}
            size="xl"
            weight={700}
            style={{ fontFamily: "Greycliff CF, sans-serif" }}>
            {question}
          </Text>
        </Container>
      </Container>
      <Group>
        <Button
          onClick={() => handleAnswer("True")}
          className={classes.button}
          color={user_answer === "True" ? "green" : "blue"}>
          True
        </Button>
        <Button
          onClick={() => handleAnswer("False")}
          className={classes.button}
          color={user_answer === "False" ? "green" : "blue"}>
          False
        </Button>
      </Group>
    </>
  );
};
