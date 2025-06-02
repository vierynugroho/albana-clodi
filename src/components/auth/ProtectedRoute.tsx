import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router";
import { currentAuth } from "../../service/auth";

interface ProtectedRouteProps {
  children: ReactNode;
}
function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const authUser = localStorage.getItem("token");

  useEffect(() => {
    const verifyToken = async () => {
      if (!authUser) {
        setIsValid(false);
        return;
      }
      
      const result = await currentAuth(authUser);
      if (!result.success) {
        localStorage.clear();
        setIsValid(false);
      } else {
        localStorage.setItem("token", authUser); 
        setIsValid(true);
      }
    };

    verifyToken();
  }, [authUser]);

  if (isValid === null) {
    return <div>Loading...</div>;
  }

  if (!isValid) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

export default ProtectedRoute;
