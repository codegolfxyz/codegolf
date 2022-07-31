import { Route, Redirect } from "react-router-dom";
import { useUserData } from "../state/user/useUserData";

export const PrivateRoute = ({
  component: Component,
  ...rest
}: {
  component: React.ElementType;
}) => {
  const user = useUserData();
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
