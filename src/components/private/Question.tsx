import { Button, Container, createStyles, Group, Text } from "@mantine/core";
import { useQuiz } from "lib";
import { unescape } from "underscore";

interface Props {
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

export const Question = (props: Props) => {
  const { question, user_answer } = props;
  const { setAnswer, nextQuestion, prevQuestion, lastQuestion, questions } = useQuiz();
  const { classes } = useStyles();

  return (
    <>
      <Group>
        <Button
          onClick={() => prevQuestion()}
          variant="filled"
          color="teal"
          disabled={lastQuestion === 0}>
          Prev
        </Button>
        <Button
          onClick={() => nextQuestion()}
          variant="filled"
          color="teal"
          disabled={lastQuestion + 1 === questions.length}>
          Next
        </Button>
      </Group>
      <Container size="md" px="xs">
        <Container size="md" px="xs">
          <Text
            component="span"
            align="center"
            variant="gradient"
            gradient={{ from: "red", to: "blue", deg: 45 }}
            size="xl"
            weight={700}
            style={{ fontFamily: "Greycliff CF, sans-serif" }}>
            {unescape(question)}
          </Text>
        </Container>
      </Container>
      <Group>
        <Button
          onClick={() => setAnswer("True")}
          className={classes.button}
          color={user_answer === "True" ? "green" : "blue"}>
          True
        </Button>
        <Button
          onClick={() => setAnswer("False")}
          className={classes.button}
          color={user_answer === "False" ? "green" : "blue"}>
          False
        </Button>
      </Group>
    </>
  );
};
