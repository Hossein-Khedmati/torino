import { useEffect } from "react";
import { useAuth } from "@/Context/AuthContext";
import { useLoginModal } from "@/Context/LoginModalContext";

const withAuthGuard = (WrappedComponent) => {
  return function AuthenticatedComponent(props) {
    const { mobile } = useAuth();
    const { openLoginModal } = useLoginModal();

    useEffect(() => {
      if (!mobile) {
        openLoginModal();
      }
    }, [mobile]);

    if (!mobile) {
    
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuthGuard;
