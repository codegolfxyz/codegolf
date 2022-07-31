import { Route, Redirect } from "react-router-dom";
import { useUserData } from "../state/user/useUserData";

export const PublicRoute = ({
  component: Component,
  restricted,
  ...rest
}: any) => {
  const user = useUserData();
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        user && restricted ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
};
