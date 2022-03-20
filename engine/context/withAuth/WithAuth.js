import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";

//HOC compotent for private Route

const withAuth = (Component) => {
  const Auth = (props) => {
    // Login data added to props via redux-store (or use react context for example)
    const { validAuth } = useContext(AuthContext);
    const router = useRouter();

    // If user is logged in, return original component
    if (validAuth.isAuth) {
      return <Component {...props} />;
    } else {
      router.push("/");
      return null;
    }
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuth;
