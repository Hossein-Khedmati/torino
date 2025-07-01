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

export default function Home() {
  const router = useRouter();
  const { origin, destination, date } = router.query;

  const { data: tours = [], isLoading } = useQuery({
    queryKey: ["tours", { origin, destination, date }],
    queryFn: () => fetchTours({ origin, destination, date }),
  });

  const handleSearch = ({ origin, destination, date }) => {
    router.push({
      pathname: "/",
      query: {
        origin,
        destination,
        date,
      },
    });
  };

  useEffect(() => {
    if (origin || destination || date) {
      router.replace("/", undefined, { shallow: true });
    }
  }, []);

  return (
    <>
      <Head>
        <title>تورینو | رزور بلیت آنلاین</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.banner}>
          <Image
            src="/images/banner.png"
            alt="banner.png"
            width="1000"
            height="350"
            priority
          />
        </div>

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
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { origin, destination, date } = context.query;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    ["tours", { origin, destination, date }],
    () => fetchTours({ origin, destination, date })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
