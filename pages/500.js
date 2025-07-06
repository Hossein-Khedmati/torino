import Head from "next/head";
import styles from "../styles/404.module.css";
import Image from "next/image";

function NetworkError() {
  return (
    <>
      <Head>
        <title>تورینو | چیزی یافت نشد</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.texts}>
          <h1>اتصال با سرور برقرار نیست!</h1>
          <h3>لطفا بعدا دوباره امتحان کنید.</h3>
        </div>
        <div className={styles.image}>
          <Image priority alt="500.png" src="/images/Error-Robot.png" width={555} height={555}/>
        </div>
      </div>
    </>
  );
}

export default NetworkError;
