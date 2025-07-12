import React from 'react'
import styles from "./TelBox.module.css"
import Image from 'next/image'

function TelBox() {
  return (
    <>
    <div className={styles.greenBox}>
        <div className={styles.textBox}>
        <h3>خرید تلفی از <span>تورینو</span></h3>
        <p>به هرکجا که میخواهید!</p>
        </div>
        <div className={styles.imageBox}>
            <Image alt='cartoon.png' src="/images/cartoon.png" width={308} height={225}/>
        </div>
    </div>
    <div className={styles.whiteBox}>
        <p>021-1840<Image alt='call-black.png' src="/images/call-black.png" width={24} height={24}/></p>
        <button>اطلاعات بیشتر</button>
    </div>
    </>
  )
}

export default TelBox