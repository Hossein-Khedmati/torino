import { useLoginModal } from "@/Context/LoginModalContext";
import LoginModal from "./LoginModal";

export default function LoginModalManager() {
  const { isLoginModalOpen, closeLoginModal } = useLoginModal();

  return (
    <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
  );
}
