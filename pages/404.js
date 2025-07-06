import Head from "next/head";
import styles from "../styles/404.module.css";
import Image from "next/image";

function NOTfound() {
  return (
    <>
      <Head>
        <title>تورینو | چیزی یافت نشد</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.texts}>
          <h1>صفحه مورد نظر یافت نشد!</h1>
          <button>بازگشت به صفحه اصلی</button>
        </div>
        <div className={styles.image}>
          <Image priority alt="404.png" src="/images/Error-TV.png" width={555} height={555}/>
        </div>
      </div>
    </>
  );
}

export default NOTfound;
