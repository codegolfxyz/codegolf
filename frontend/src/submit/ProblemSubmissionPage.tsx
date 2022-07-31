import { ChangeEvent } from "react";
import CodeMirror from "@uiw/react-codemirror";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { ProblemDetailsForm } from "./ProblemDetailsForm";
import { useProblemDetailsForm } from "./useProblemDetailsForm";
import { useUserData } from "../state/user/useUserData";
import { useHistory } from "react-router-dom";

export function ProblemSubmissionPage() {
  const { push } = useHistory();
  const user = useUserData();
  const { changeInputValue, prompt, title } = useProblemDetailsForm();

  if (!user) {
    push("/login");
    return null;
  }

  return (
    <Box marginTop={1}>
      <Stack direction="row">
        <Box width="50vw" height="100vh">
          <ProblemDetailsForm
            onChangeTitle={(e: ChangeEvent<HTMLInputElement>) =>
              changeInputValue(e.target.value, "title")
            }
            onChangePrompt={(e: ChangeEvent<HTMLInputElement>) =>
              changeInputValue(e.target.value, "prompt")
            }
            prompt={prompt}
            title={title}
            username={user.username}
          />
        </Box>
        <Paper sx={{ height: "100%", overflow: "hidden" }}>
          <CodeMirror
            value={"//your code hereeee"}
            height="100vh"
            width="50vw"
            lang="javascript"
            theme="dark"
            onChange={(value, viewUpdate) => {
              console.log("value:", value);
              console.log("viewUpdate: ", viewUpdate);
            }}
          />
        </Paper>
      </Stack>
    </Box>
  );
}
