import { Container, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Box from "@mui/system/Box";
import { ChangeEvent } from "react";
import TextField from "@mui/material/TextField";

interface ProblemDetailsFormProps {
  onChangePrompt: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeTitle: (e: ChangeEvent<HTMLInputElement>) => void;
  prompt: string;
  title: string;
  username: string;
}

export function ProblemDetailsForm({
  onChangePrompt,
  onChangeTitle,
  prompt,
  title,
  username,
}: ProblemDetailsFormProps) {
  return (
    <Paper sx={{ height: "100%" }}>
      <Container>
        <Box>
          <Typography marginTop={5} variant="h4">
            New Problem
          </Typography>
          <Typography variant="subtitle1">{`By ${username}`}</Typography>
          <TextField
            autoFocus
            fullWidth
            multiline
            style={{ marginTop: "1rem" }}
            label="problem title"
            value={title}
            onChange={onChangeTitle}
          />
          <TextField
            fullWidth
            multiline
            label="problem prompt"
            style={{ marginTop: "1rem" }}
            value={prompt}
            onChange={onChangePrompt}
          />
        </Box>
      </Container>
    </Paper>
  );
}
