import { basketGet, fetchUser, orderPost } from "@/services/api";
import React, { useEffect, useState } from "react";
import styles from "../../styles/orderPage.module.css";
import Image from "next/image";
import { toast } from "react-toastify";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject from "react-date-object";
import "react-multi-date-picker/styles/colors/green.css";
import { orderSchema } from "@/utils/YupSchemas";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";


function OrderPage() {
  const [basketItems, setBasketItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    const router = useRouter();
  
  const convertPersianNumbers = (str) => {
    return str.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
  };

  const toGregorian = (value) => {
    if (!value) return "";
    const formatted = value.format("YYYY-MM-DD");
    const cleaned = convertPersianNumbers(formatted);
    return new DateObject({
      date: cleaned,
      format: "YYYY-MM-DD",
      calendar: "persian",
    })
      .convert("gregorian")
      .format("YYYY-MM-DD");
  };

  const toPersianDateObject = (isoString) => {
    return new DateObject({
      date: isoString,
      format: "YYYY-MM-DD",
      calendar: "gregorian",
    }).convert("persian");
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(orderSchema),
    defaultValues: {
      fullName: "",
      nationalCode: "",
      birthDate: "",
      gender: "male",
    },
  });

  useEffect(() => {
    const fetchBasketData = async () => {
      try {
        setLoading(true);
        const response = await basketGet();
        setBasketItems(response);
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
        console.error("Basket fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBasketData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetchUser();
        setValue("fullName", `${response.firstName || ""} ${response.lastName || ""}`.trim());
        setValue("nationalCode", response.nationalCode || "");
        console.log(response.birthDate);
        
        setValue("birthDate", toGregorian(toPersianDateObject(response.birthDate)));
        setValue("gender", response.gender || "male");
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
        console.error("User fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [setValue]);
 
  
  const handleDateChange = (date) => {
    const gregorian = toGregorian(date);
    setValue("birthDate", gregorian);
  };

  const onSubmit = async (data) => {
    try {
      const response = await orderPost({
        nationalCode: data.nationalCode,
        fullName: data.fullName,
        gender: data.gender,
        birthDate: data.birthDate,
      });
      toast.success("سفارش با موفقیت ثبت شد");
      console.log("Order response:", response);
      router.push("/")
      
    } catch (err) {
      toast.error("خطا در ثبت سفارش");
      console.error("Order submission error:", err);
    }
  };

  if (loading) return <div className={styles.container}>Loading...</div>;
  if (error) return <div className={styles.container}>Error: {error}</div>;
  if (!basketItems) return <div className={styles.container}>No data found</div>;

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.userInfos}>
          <h1>
            <Image src="/images/profile.png" alt="user" width={24} height={24} />
            مشخصات مسافر
          </h1>
          <div className={styles.inputs}>
            <div className={styles.formGroup}>
              <input
                {...register("fullName")}
                placeholder="نام و نام خانوادگی"
              />
              {errors.fullName && (
                <p className={styles.error}>{errors.fullName.message}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <input
                {...register("nationalCode")}
                placeholder="کدملی"
              />
              {errors.nationalCode && (
                <p className={styles.error}>{errors.nationalCode.message}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <DatePicker
                value={toPersianDateObject(watch("birthDate"))}
                onChange={handleDateChange}
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                inputClass={styles.datePickerInput}
                placeholder="تاریخ تولد"
                format="YYYY/MM/DD"
                className="green"
              />
              {errors.birthDate && (
                <p className={styles.error}>{errors.birthDate.message}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <select {...register("gender")} className={styles.genderSelect}>
                <option value="male">مرد</option>
                <option value="female">زن</option>
              </select>
              {errors.gender && (
                <p className={styles.error}>{errors.gender.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className={styles.tourInfos}>
          <div className={styles.title}>
            <span className={styles.tourTitle}>
              {basketItems.title || "No title"}
            </span>
            <span className={styles.tourRange}>5 روز و 4 شب</span>
          </div>
          <div className={styles.price}>
            <div>
              <span className={styles.priceText}>قیمت نهایی</span>
              <p className={styles.priceValue}>
                <span>
                  {basketItems.price ? basketItems.price.toLocaleString() : "0"}
                </span>
                تومان
              </p>
            </div>
            <button type="submit" className={styles.submit}>
              ثبت و خرید نهایی
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default OrderPage;
