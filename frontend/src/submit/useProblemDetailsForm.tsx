import { useState } from "react";

export type ProblemDetailsField = "title" | "prompt";

export function useProblemDetailsForm() {
  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");

  const changeInputValue = (value: string, field: ProblemDetailsField) => {
    switch (field) {
      case "prompt":
        setPrompt(value);
        return;
      case "title":
        setTitle(value);
    }
  };

  return {
    title,
    prompt,
    changeInputValue,
  };
}
