// components/RouteLoader.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./RouteLoader.module.css";

export default function RouteLoader() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className={styles.container}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <motion.div
            className={styles.container}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ClipLoader
              color="#28A745"
              size={70}
              speedMultiplier={0.8}
              cssOverride={{
                display: "block",
                borderWidth: "8px",
              }}
              aria-label="Loading Spinner"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
