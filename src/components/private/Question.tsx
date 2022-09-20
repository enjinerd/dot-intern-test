import { Group, Button, Title, Container } from "@mantine/core";
import { useQuiz } from "lib";
import { useEffect } from "react";
import { useCountdown } from "lib";

interface Question {
  question: string;
}

export const Question = (props: Question) => {
  const { question } = props;
  const { setAnswer, nextQuestion, prevQuestion, startDateTime, expiredTime } = useQuiz();
  const availableTime = expiredTime - startDateTime;
  const expiredTimeDate = new Date(expiredTime);
  console.log(expiredTimeDate);

  const handleAnswer = (answer: "False" | "True") => {
    setAnswer(answer);
    nextQuestion();
  };

  return (
    <Container size="md" px="xs">
      <Group>
        <Button onClick={() => prevQuestion()}>Prev</Button>
        <Button onClick={() => nextQuestion()}>Next</Button>
      </Group>
      <Container size="md" px="xs">
        <Title weight={600} order={2}>
          {question}
        </Title>
      </Container>
      <Group>
        <Button onClick={() => handleAnswer("True")}>True</Button>
        <Button onClick={() => handleAnswer("False")}>False</Button>
      </Group>
    </Container>
  );
};
