import { useAuth } from "lib";
import { Navigate } from "react-router";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

const Private = ({ children }: Props) => {
  const { session } = useAuth();
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Private;
