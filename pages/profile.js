import { useEffect, useState } from "react";
import { useAuth } from "@/Context/AuthContext";
import styles from "../styles/profilePage.module.css";
import Image from "next/image";
import UserProfileInfo from "@/components/ProfileComponents/UserProfileInfo";
import { fetchUser } from "@/services/api";
import UserTransactions from "@/components/ProfileComponents/UserTransactions";

export default function ProfilePage() {
  const { mobile, loading } = useAuth();
  const [profile, setProfile] = useState("profile");

  useEffect(() => {
    // فقط زمانی که مطمئن شدیم لودینگ تموم شده و mobile هنوز وجود نداره
    if (!loading && !mobile) {
      window.dispatchEvent(new Event("unauthorized"));
    }
  }, [loading, mobile]);

  if (loading) {
    return <p>در حال بررسی ورود...</p>;
  }

  if (!mobile) {
    return null; // یا چیزی نمایش نده، چون login modal باز میشه
  }

  return (
    <div className={styles.container}>
      <div className={styles.options}>
        <ul>
          <li onClick={() => setProfile("profile")} className={profile==="profile" ? styles.active : null} >
            {" "}
            
            <Image
              alt="profile.png"
              src="/images/profile.png"
              width={20}
              height={20}
            />
            پروفایل
          </li>
          <li onClick={() => setProfile("tours")} className={profile==="tours" ? styles.active : null}>
            {" "}
            <Image
              alt="profile.png"
              src="/images/sun-fog.png"
              width={20}
              height={20}
            />
            تور های من
          </li>
          <li onClick={() => setProfile("transactions")} className={profile==="transactions" ? styles.active : null}>
            {" "}
            <Image
              alt="profile.png"
              src="/images/convert-card.png"
              width={20}
              height={20}
            />
            تراکنش ها
          </li>
        </ul>
      </div>
      <div className={styles.components}>
      {profile==="profile" ? <UserProfileInfo /> : null}
      {profile==="transactions" ? <UserTransactions /> : null}
      </div>
    </div>
  );
}
