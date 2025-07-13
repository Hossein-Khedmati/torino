import React, { useState } from "react";
import styles from "./Header.module.css";
import Image from "next/image";
import LoginModal from "../Auth/LoginModal";
import { useAuth } from "@/Context/AuthContext";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useLoginModal } from "@/Context/LoginModalContext";
import LoginModalManager from "../Auth/LoginModalManager";

function Header({ menu, setMenu }) {
  const { openLoginModal } = useLoginModal();
  const [showDropdown, setShowDropdown] = useState(false);
  const { mobile, logout } = useAuth();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.menuBtn} onClick={() => setMenu(!menu)}>
          <Image
            alt="menu.png"
            src="/images/menu.png"
            width={30}
            height={22}
            priority
          />
        </div>
        <div className={`${styles.navbar} ${menu ? styles.navActive : ""}`}>
          <Image
            alt="logo.png"
            src="/images/torino.png"
            width={145}
            height={45}
            priority
          />
          <div className={styles.crossIcon} onClick={() => setMenu(false)}>×</div>
          <ul className={styles.menu}>
            <Link href={"/"}><li>
              {" "}
              <Image
                alt="home.png"
                src="/images/home.png"
                width={18}
                height={18}
              />
              صفحه اصلی
            </li>
            </Link>
            <li>
              {" "}
              <Image
                alt="air.png"
                src="/images/airplane-square.png"
                width={18}
                height={18}
              />
              خدمات گردشگری
            </li>
            <li>
              {" "}
              <Image
                alt="volume.png"
                src="/images/volume.png"
                width={18}
                height={18}
              />
              درباره ما
            </li>
            <li>
              {" "}
              <Image
                alt="call.png"
                src="/images/call.png"
                width={18}
                height={18}
              />
              تماس با ما
            </li>
          </ul>
        </div>

        {/* دکمه ورود یا پروفایل */}
        {!mobile ? (
          <div className={styles.button} onClick={openLoginModal}>
            <Image
              alt="profile.png"
              src="/images/profile.png"
              width={24}
              height={24}
            />
            <Image
              alt="signIn.png"
              src="/images/sign-in.png"
              width={40}
              height={40}
              className={styles.signInBtn}
            />
            <span>ورود | ثبت نام</span>
          </div>
        ) : (
          <div
            className={styles.profileBtn}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <Image
              alt="profile.png"
              src="/images/profile.png"
              width={24}
              height={24}
            />
            <span>{mobile}</span>
            <Image
              alt="down.png"
              src="/images/down.png"
              width={24}
              height={24}
              className={showDropdown ? styles.arrowAnimation : styles.arrow}
            />

            {/* Dropdown Menu */}
            <AnimatePresence>
              {showDropdown && (
                <motion.ul
                  className={styles.dropdown}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <li className={styles.firstLi}>
                    <div className={styles.circle}>
                      <Image
                        src="/images/profile.png"
                        alt="icon"
                        width={18}
                        height={18}
                      />
                    </div>
                    {mobile}
                  </li>
                  <Link href="/profile">
                    <li>
                      <Image
                        src="/images/profile-outline.png"
                        alt="icon"
                        width={18}
                        height={18}
                      />
                      اطلاعات حساب کاربری
                    </li>
                  </Link>
                  <li onClick={logout} className={styles.logoutLi}>
                    <Image
                      src="/images/logout.png"
                      alt="icon"
                      width={18}
                      height={18}
                    />
                    خروج از حساب کاربری
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
      <LoginModalManager />
    </>
  );
}

export default Header;
