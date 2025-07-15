import React, { useEffect, useState } from "react";
import styles from "./UserTransactions.module.css";
import { transactionsGet } from "@/services/api";
import { toast } from "react-toastify";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { ClipLoader } from "react-spinners";

function UserTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await transactionsGet();
        setTransactions(data);
      } catch (err) {
        toast.error("خطا در دریافت اطلاعات کاربر");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Function to format date using react-date-object
  const formatJalaliDate = (dateString) => {
    const date = new DateObject({
      date: new Date(dateString),
      calendar: persian,
      locale: persian_fa,
    });

    return date.format("HH:mm - YYYY/MM/DD ");
  };

  // Function to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("fa-IR").format(amount);
  };

   if (isLoading) return <ClipLoader />;
  if (!transactions.length) return <p>اطلاعاتی یافت نشد</p>;
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.firstPad}>تاریخ و ساعت</th>
            <th>مبلغ(تومان)</th>
            <th className={styles.paymentMobile}>نوع تراکنش</th>
            <th>شماره سفارش</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className={styles.dataRows}>
              <td className={styles.firstPad}>
                {formatJalaliDate(transaction.createdAt)}
              </td>
              <td>{formatCurrency(transaction.amount)}</td>
              <td className={styles.paymentMobile}>
                {transaction.type === "Purchase"
                  ? "ثبت نام در تور گردشگری"
                  : transaction.type}
              </td>
              <td className={styles.id}>{transaction.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTransactions;
