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
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isValid) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

export default ProtectedRoute;
