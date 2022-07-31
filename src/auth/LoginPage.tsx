import { ChangeEvent } from "react";
import { LoginFormInputField } from "./Authentication.types";

export interface LoginPageProps {
  logInUser: () => void;
  onInputChange: (value: string, type: LoginFormInputField) => void;
  password: string;
  username: string;
}

export const LoginPage = ({
  logInUser,
  onInputChange,
  password,
  username,
}: LoginPageProps) => {
  return (
    <div style={{ padding: "32px" }}>
      <h1>login page!</h1>
      <input
        placeholder="username"
        type="text"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onInputChange(e.target.value, "username")
        }
        style={{ marginRight: "16px" }}
      />
      <input
        placeholder="password"
        type="password"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onInputChange(e.target.value, "password")
        }
        style={{ marginRight: "16px" }}
      />
      <button onClick={logInUser} disabled={!username || !password}>
        click me to log in
      </button>
    </div>
  );
};
