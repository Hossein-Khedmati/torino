import React from "react";
import styles from "./Features.module.css";
import Image from "next/image";

function Features() {
  return (
    <>
      <div className={styles.features}>
        <div className={styles.imgBox}><Image alt="logo.png" src="/images/features/discount.png" width={104} height={104}/></div>
        <div className={styles.textBox}>
            <h3>بصرفه ترین قیمت</h3>
            <span>بصرفه ترین و ارزان ترین قیمت تور را از ما بخواهید.</span>
        </div>
      </div>
      <div className={styles.features}>
        <div className={styles.imgBox}><Image alt="logo.png" src="/images/features/question.png" width={104} height={104}/></div>
        <div className={styles.textBox}>
            <h3>پشتیبانی</h3>
            <span>پشتیبانی و همراهی 24 ساعته در تمامی مراحل سفر شما.</span>
        </div>
      </div>
      <div className={styles.features}>
        <div className={styles.imgBox}><Image alt="logo.png" src="/images/features/love.png" width={104} height={104}/></div>
        <div className={styles.textBox}>
            <h3>رضایت کاربران</h3>
            <span>رضایت بیش از 10هزار کاربر از تور های ما. </span>
        </div>
      </div>
    </>
  );
}

export default Features;
