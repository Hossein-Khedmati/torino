import Link from "next/link";
import styles from "./TourCard.module.css";

export default function TourCard({ tour, isFiltered }) {
  return (
    <Link href={`/tours/${tour.id}`}>
    <div className={styles.container}>
      <div className={styles.tourImage}><img src={tour.image} alt={tour.title} width={280} height={160} /></div>
      <h1 className={styles.title}>{tour.title}</h1>
      <div className={styles.options}>
        {tour.options.map((opt,index) => (
          <span key={opt}>
            {opt} {index !== tour.options.length - 1 && ", "}
          </span>
        ))}
      </div>
      <div className={styles.reserve}>
        <button>رزرو</button>
        <p>
          {" "}
          <span>{tour.price.toLocaleString()}</span> تومان
        </p>
      </div>
    </div>
    </Link>
  );
}
