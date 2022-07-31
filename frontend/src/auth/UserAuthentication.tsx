import { useState } from "react";
import { useHistory } from "react-router-dom";
import { userLoggedIn } from "../state/user/userSlice";
import { LoginFormInputField } from "./Authentication.types";
import { LoginPage } from "./LoginPage";

export const UserAuthentication = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { push } = useHistory();

  const onInputChange = (value: string, type: LoginFormInputField) => {
    switch (type) {
      case "username":
        setUsername(value);
        return;
      case "password":
        setPassword(value);
        return;
    }
  };

  const logInUser = () => {
    // API call to get token
    console.log("blaaahhhhh");
    // on success:
    userLoggedIn({
      userId: "fake-user-id",
      username: username,
    });

    push("/submit");
    console.log("wat");
  };

  return (
    <LoginPage
      logInUser={logInUser}
      onInputChange={onInputChange}
      password={password}
      username={username}
    />
  );
};
