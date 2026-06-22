// components/AnnouncementModal.jsx
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./AnnouncementModal.module.css";

export default function AnnouncementModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenAnnouncement = sessionStorage.getItem("announcementSeen");

    if (!hasSeenAnnouncement) {
      setIsOpen(true);
      sessionStorage.setItem("announcementSeen", "true");
    }
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }

    // Cleanup function to reset styles when component unmounts
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className={styles.backdrop} onClick={handleClose}>
        <motion.div
          className={styles.modalBox}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={handleClose} className={styles.closeBtn}>
            ×
          </button>

          <div className={styles.content}>
            <h2>به تورینو خوش آمدید!</h2>
            <p className={styles.message}>
              برای بهبود سرعت بارگذاری و کیفیت اتصال به سایت، استفاده از{" "}
              <span className={styles.vpn}>VPN</span> را فراموش نکنید.
            </p>
            <button onClick={handleClose} className={styles.actionBtn}>
              متوجه شدم
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
