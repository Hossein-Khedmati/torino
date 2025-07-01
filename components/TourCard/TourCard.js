import styles from "./TourCard.module.css";

export default function TourCard({ tour , isFiltered }) {
  return (
    <div className={styles.container}>
      <img src={tour.image} alt={tour.title} width={280} height={160} />
      <h1 className={styles.title}>{tour.title}</h1>
      <div className={styles.options}>
        {tour.options.map((opt)=>(
            <span key={opt}>{opt}</span>
        ))}
      </div>
      <div className={styles.reserve}>
        <button>رزرو</button>
      <p> <span>{tour.price.toLocaleString()}</span> تومان</p>
      </div>
    </div>
  );
}
