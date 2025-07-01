// components/SearchBox/SearchBox.js
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import styles from "./SearchBox.module.css";
import { cityMap } from "@/utils/CitiesDatas";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/colors/green.css";

export default function SearchBox({
  originOptions,
  destinationOptions,
  onSearch,
}) {
  const router = useRouter();
  const [origin, setOrigin] = useState("");
  const [selectedOrigin, setSelectedOrigin] = useState(null);
  const [isOriginOpen, setIsOriginOpen] = useState(false);

  const [destination, setDestination] = useState("");
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [isDestinationOpen, setIsDestinationOpen] = useState(false);

  const [date, setDate] = useState("");

  const originRef = useRef();
  const destinationRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (originRef.current && !originRef.current.contains(event.target)) {
        setIsOriginOpen(false);
      }
      if (destinationRef.current && !destinationRef.current.contains(event.target)) {
        setIsDestinationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOriginSelect = (item) => {
    setSelectedOrigin(item);
    setOrigin(item.id);
    setIsOriginOpen(false);
  };

  const handleDestinationSelect = (item) => {
    setSelectedDestination(item);
    setDestination(item.id);
    setIsDestinationOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ origin, destination, date });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Origin Custom Select */}
        <div className={styles.customSelectWrapper} ref={originRef}>
          <div
            className={styles.selectBox}
            onClick={() => setIsOriginOpen(!isOriginOpen)}
          >
            <Image
              alt="loc.png"
              src="/images/location.png"
              width="20"
              height="20"
            />
            {selectedOrigin
              ? cityMap[selectedOrigin.name] || selectedOrigin.name
              : "مبدا"}
          </div>
          <AnimatePresence>
            {isOriginOpen && (
              <motion.div
                className={styles.optionList}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <ul>
                  {originOptions.map((item) => (
                    <li
                      key={item.id}
                      className={styles.optionItem}
                      onClick={() => handleOriginSelect(item)}
                    >
                      <Image
                        alt="loc.png"
                        src="/images/location.png"
                        width="20"
                        height="20"
                      />
                      {cityMap[item.name] || item.name}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Destination Custom Select */}
        <div className={styles.customSelectWrapper} ref={destinationRef}>
          <div
            className={styles.selectBox}
            onClick={() => setIsDestinationOpen(!isDestinationOpen)}
          >
            <Image
              alt="destination.png"
              src="/images/global-search.png"
              width="20"
              height="20"
            />
            {selectedDestination
              ? cityMap[selectedDestination.name] || selectedDestination.name
              : "مقصد"}
          </div>
          
          <AnimatePresence>
            {isDestinationOpen && (
              <motion.div
                className={`${styles.optionList} ${styles.optionListPos}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <ul>
                  {destinationOptions.map((item) => (
                    <li
                      key={item.id}
                      className={styles.optionItem}
                      onClick={() => handleDestinationSelect(item)}
                    >
                      <Image
                        alt="loc.png"
                        src="/images/location.png"
                        width="20"
                        height="20"
                      />
                      {cityMap[item.name] || item.name}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Date Picker */}
        <div className={styles.dateInput}>
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            onChange={(date) => {
              const iso = date?.toDate()?.toISOString()?.split("T")[0];
              setDate(iso);
            }}
            inputClass={styles.input}
            placeholder="تاریخ "
            className="green"
          />
        </div>

        <button type="submit" className={styles.button}>
          جستجو
        </button>
      </form>
    </div>
  );
}
