import Head from "next/head";
import Image from "next/image";
import styles from "../styles/index.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchTours } from "@/services/api";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { cities } from "@/utils/CitiesDatas";
import { useEffect } from "react";
import TourCard from "@/components/TourCard/TourCard";
import Slider from "@/components/Slider/Slider";
import TelBox from "@/components/TelBox/TelBox";
import Features from "@/components/Features/Features";

export default function Home() {
  const router = useRouter();
  const { origin, destination, startDate, endDate } = router.query;

  const { data: tours = [], isLoading } = useQuery({
    queryKey: ["tours", { origin, destination, startDate, endDate }],
    queryFn: () => fetchTours({ origin, destination, startDate, endDate }),
  });

  const handleSearch = ({ origin, destination, startDate, endDate }) => {
    router.push({
      pathname: "/",
      query: {
        origin,
        destination,
        startDate,
        endDate,
      },
    });
  };

  useEffect(() => {
    if (origin || destination || startDate || endDate) {
      router.replace("/", undefined, { shallow: true });
    }
  }, []);

  return (
    <>
      <Head>
        <title>تورینو | رزور بلیت آنلاین</title>
      </Head>
      <div className={styles.banner}>
        <Image
          src="/images/banner.png"
          alt="banner.png"
          width="1000"
          height="350"
          priority
        />
      </div>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>
            <span>تورینو</span> برگزار کننده بهترین تور های داخلی و خارجی
          </h1>
        </div>
        <SearchBox
          originOptions={cities}
          destinationOptions={cities}
          onSearch={handleSearch}
        />
        <h1 className={styles.toursTitle}>همه تور ها</h1>
        {isLoading ? (
          <p>در حال بارگذاری تورها...</p>
        ) : tours.length === 0 ? (
          <p className={styles.notFound}>هیچ توری یافت نشد</p>
        ) : (
          <div className={styles.tourList}>
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        )}
        <div className={styles.telBox}><TelBox /></div>
        <div className={styles.sliderContainer}>
          <Slider />
        </div>
        <div className={styles.borderLine}></div>
        <div className={styles.features}>
          <Features />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { origin, destination, startDate, endDate } = context.query;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    ["tours", { origin, destination, startDate, endDate }],
    () => fetchTours({ origin, destination, startDate, endDate })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
