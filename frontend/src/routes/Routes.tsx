import { Switch } from "react-router-dom";
import { UserAuthentication } from "../auth/UserAuthentication";
import { Home } from "../home/Home";
import { ProblemSubmissionPage } from "../submit/ProblemSubmissionPage";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const Routes = () => {
  return (
    <Switch>
      <PublicRoute restricted={false} component={Home} path="/" exact />
      <PublicRoute
        restricted={true}
        component={UserAuthentication}
        path="/login"
        exact
      />
      <PrivateRoute component={ProblemSubmissionPage} path="/submit" exact />
    </Switch>
  );
};
