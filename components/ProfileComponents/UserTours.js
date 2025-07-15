import { userToursGet } from "@/services/api";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import styles from "./UserTours.module.css";
import Image from "next/image";
import { cityMap } from "@/utils/CitiesDatas";

function UserTours() {
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const vehicles = {
    Bus: "اتوبوس",
    Van: "ون",
    SUV: "خودرو شاسی بلند",
    Airplane: "هواپیما",
  };

  // Update current time every minute (optional)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  // Function to get tour status
  const getTourStatus = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (currentDate < start) {
      return "در انتظار برگزاری";
    } else if (currentDate >= start && currentDate <= end) {
      return "در حال برگزاری";
    } else {
      return "به اتمام رسیده";
    }
  };

  // Function to format date to a more readable format
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("fa-IR", options);
  };

  // Function to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("fa-IR").format(amount);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await userToursGet();
        setTours(data);
      } catch (err) {
        toast.error("خطا در دریافت اطلاعات کاربر");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);
  console.log(tours);

  if (isLoading) return <ClipLoader />;
  if (!tours.length) return <p>اطلاعاتی یافت نشد</p>;

  return (
    <div className={styles.container}>
      {tours.map((tour) => (
        <div key={tour.id} className={styles.tourBox}>
          <div className={`${styles.progress} ${
            getTourStatus(tour.startDate, tour.endDate) === "در انتظار برگزاری" 
              ? styles.pending 
              : getTourStatus(tour.startDate, tour.endDate) === "در حال برگزاری" 
                ? styles.active 
                : styles.completed
          }`}>
            {getTourStatus(tour.startDate, tour.endDate)}
          </div>

          <div className={styles.titles}>
            <span>
              <Image
                alt="sun.png"
                src="/images/sun-fog.png"
                width={24}
                height={24}
              />
              {tour.title}
            </span>
            <span>سفر با {vehicles[tour.fleetVehicle]}</span>
          </div>
          <div className={styles.date}>
            <div>
              <h4>
                {cityMap[tour.origin.name.replace(/\s+/g, "")]} به{" "}
                {cityMap[tour.destination.name.replace(/\s+/g, "")]}{" "}
                <span>. {formatDate(tour.startDate)}</span>
              </h4>
            </div>
            <div>
              <h4>
                تاریخ برگشت <span>. {formatDate(tour.endDate)}</span>
              </h4>
            </div>
          </div>
          <div className={styles.price}>
            <div className={styles.tourNum}>
              <p>
                شماره تور <span>-</span>
              </p>
            </div>
            <div className={styles.tourPrice}>
              <p>
                مبلغ پرداخت شده
                <span>
                  {formatCurrency(tour.price)} <span>تومان</span>
                </span>{" "}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserTours;