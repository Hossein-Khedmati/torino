import React from "react";
import styles from "./Footer.module.css";
import Image from "next/image";

function Footer({setMenu}) {
  return (
    <>
    <div className={styles.container} onClick={() => setMenu(false)}>
      <div className={styles.textPart}>
        <ul className={styles.lists}>
          <li>تورینو</li>
          <li>درباره ما</li>
          <li>تماس با ما</li>
          <li>چرا تورینو</li>
          <li>بیمه مسافرتی</li>
          <li></li>
        </ul>
        <ul className={styles.lists}>
          <li>خدمات مشتریان</li>
          <li>پشتیبانی آنلاین</li>
          <li>راهنمای خرید</li>
          <li>راهنمای استرداد</li>
          <li>پرسش و پاسخ</li>
        </ul>
      </div>
      <div className={styles.logoPart}>
        <div className={styles.phone}>
          <Image
            alt="logo.png"
            src="/images/torino.png"
            width={"145"}
            height={"45"}
            priority
          />
          <p>تلفن پشتیبانی: 8574-021</p>
        </div>
        <div className={styles.logos}>
          <Image
            alt="logo.png"
            src="/images/footer-icons/stateAirline.png"
            width={"78"}
            height={"74"}
          />
          <Image
            alt="logo.png"
            src="/images/footer-icons/passenger-rights.png"
            width={"71"}
            height={"74"}
          />
          <Image
            alt="logo.png"
            src="/images/footer-icons/qrcode.png"
            width={"68"}
            height={"74"}
          />
          <Image
            alt="logo.png"
            src="/images/footer-icons/eNama.png"
            width={"68"}
            height={"74"}
          />
          <Image
            alt="logo.png"
            src="/images/footer-icons/aira.png"
            width={"68"}
            height={"74"}
          />
        </div>
      </div>
    </div>
    <div className={styles.copyright}>
      <p>کلیه حقوق این وب سایت متعلق به تورینو میباشد.</p>
    </div>
    </>
  );
}

export default Footer;
