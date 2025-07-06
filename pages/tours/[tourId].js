import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import { fetchTours } from "@/services/api";
import styles from "../../styles/toursDetail.module.css";
import { cityMap } from "@/utils/CitiesDatas";

export default function TourDetail({ tour }) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>در حال بارگذاری...</p>;
  }

  if (!tour) {
    return <p>تور یافت نشد</p>;
  }


  const vehicles={
    Bus:"اتوبوس",
    Van:"ون",
    SUV:"خودرو شاسی بلند",
    Airplane:"هواپیما"
  }

  return (
    <>
      <Head>
        <title>{tour.title} | جزئیات تور</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.tourBox}>
          <div className={styles.infos}>
            <div className={styles.image}>
              <img src={tour.image} alt={tour.title} />
            </div>
            <div className={styles.texts}>
              <div className={styles.title}>
                <h1>{tour.title}</h1>
                <h2>5 روز و 4 شب</h2>
              </div>
              <div className={styles.options}>
                <span>
                  <Image
                    alt=".png"
                    src="/images/tourDetails/user-tick.png"
                    width={24}
                    height={24}
                  />
                  تورلیدر از مبدا
                </span>
                <span>
                  <Image
                    alt=".png"
                    src="/images/tourDetails/map.png"
                    width={24}
                    height={24}
                  />
                  برنامه سفر{" "}
                </span>
                <span>
                  <Image
                    alt=".png"
                    src="/images/tourDetails/medal-star.png"
                    width={24}
                    height={24}
                  />
                  تضمین کیفیت
                </span>
              </div>
              <div className={styles.reserve}>
                <button>رزرو و خرید</button>
                <p>
                  {" "}
                  <span>{tour.price.toLocaleString()}</span> تومان
                </p>
              </div>
            </div>
          </div>
          <div className={styles.tourDetails}>
            <div>
              <h3>
                <Image
                  alt=".png"
                  src="/images/tourDetails/routing-2.png"
                  width={24}
                  height={24}
                />
                مبدا
              </h3>
              <p>{cityMap[tour.origin.name]}</p>
            </div>
            <div>
              <h3>
                <Image
                  alt=".png"
                  src="/images/tourDetails/calendar-2.png"
                  width={24}
                  height={24}
                />{" "}
                تاریخ رفت
              </h3>
              <p>{new Date(tour.startDate).toLocaleDateString("fa-IR")}</p>
            </div>
            <div>
              <h3>
                <Image
                  alt=".png"
                  src="/images/tourDetails/calendar-2.png"
                  width={24}
                  height={24}
                />
                تاریخ برگشت
              </h3>
              <p>{new Date(tour.endDate).toLocaleDateString("fa-IR")}</p>
            </div>
            <div>
              <h3>
                <Image
                  alt=".png"
                  src="/images/tourDetails/bus.png"
                  width={24}
                  height={24}
                />
                حمل و نقل
              </h3>
              <p>{vehicles[tour.fleetVehicle]}</p>
            </div>
            <div>
              <h3>
                <Image
                  alt=".png"
                  src="/images/tourDetails/profile-2user.png"
                  width={24}
                  height={24}
                />
                ظرفیت
              </h3>
              <p>حداکثر {tour.availableSeats} نفر</p>
            </div>
            <div>
              <h3>
                <Image
                  alt=".png"
                  src="/images/tourDetails/security.png"
                  width={24}
                  height={24}
                />
                بیمه
              </h3>
              <p>{tour.insurance ? "دارد" : "ندارد"}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const tours = await fetchTours({});
  const paths = tours.map((tour) => ({
    params: { tourId: tour.id },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const allTours = await fetchTours({});
  const tour = allTours.find((t) => t.id === params.tourId);

  if (!tour) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      tour,
    },
    revalidate: 60 * 10,
  };
}
