import React, { useState, useRef, useEffect } from "react";
import styles from "./Slider.module.css";
import Image from "next/image";

const cards = [
  { id: 1, image: "images/slider/yazd.png" },
  { id: 2, image: "images/slider/airplane.png" },
  { id: 3, image: "images/slider/beach.png" },
  { id: 4, image: "images/slider/car.png" },
];

export default function Slider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const startX = useRef(null);
  const endX = useRef(null);
  const isDragging = useRef(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    endX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleMouseDown = (e) => {
    if (e.button !== 0 && e.button !== 2) return; // Only left/right click
    isDragging.current = true;
    startX.current = e.clientX;
  };

  const handleMouseUp = (e) => {
    if (!isDragging.current || (e.button !== 0 && e.button !== 2)) return;
    isDragging.current = false;
    endX.current = e.clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const diff = endX.current - startX.current;
    if (Math.abs(diff) < 30) return; // Ignore tiny moves

    if (diff < 0) {
      handleNext();
    } else {
      handlePrev();
    }
  };
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [activeIndex, isHovered]);

  // Disable right-click menu on the slider
  useEffect(() => {
    const slider = document.querySelector(`.${styles.cardStack}`);
    const handleContextMenu = (e) => e.preventDefault();
    if (slider) {
      slider.addEventListener("contextmenu", handleContextMenu);
    }
    return () => {
      if (slider) {
        slider.removeEventListener("contextmenu", handleContextMenu);
      }
    };
  }, []);

  return (
    <>
      <div className={styles.whyTorino}>
        <div className={styles.title}>
          <div className={styles.circleGreen}>؟</div>
          <span>
            چرا <span>تورینو</span> ؟
          </span>
        </div>
        <div className={styles.description}>
          <h3>تور طبیعت گردی و تاریخی</h3>
          <p>
            اگر دوست داشته باشید که یک جاذبه طبیعی را از نزدیک ببینید و در دل
            طبیعت چادر بزنید یا در یک اقامتگاه بوم گردی اتاق بگیرید، باید تورهای
            طبیعت‌گردی را خریداری کنید. اما اگر بخواهید از جاذبه‌های گردشگری و
            آثار تاریخی یک مقصد خاص بازدید کنید، می‌توانید تورهای فرهنگی و
            تاریخی را خریداری کنید.
          </p>
        </div>
      </div>

      <div className={styles.sliderWrapper}>
        <div
          className={styles.cardStack}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {(() => {
            const rotatedCards = [
              ...cards.slice(activeIndex),
              ...cards.slice(0, activeIndex),
            ];

            return rotatedCards.map((card, i) => {
              const zIndex = cards.length - i;
              const transform = `translateX(${i * -70}px) scale(${
                1 - i * 0.15
              })`;

              return (
                <div
                  key={card.id}
                  className={styles.card}
                  style={{ zIndex, transform }}
                >
                  <img
                    src={card.image}
                    alt={`card-${i}`}
                    className={styles.cardImage}
                  />
                </div>
              );
            });
          })()}
        </div>

        <div className={styles.sliderControls}>
          <button onClick={handleNext} className={styles.navBtn}>
            <Image
              alt="arrow-right.png"
              src="/images/slider/arrow-right.png"
              width={36}
              height={36}
            />
          </button>
          <span>
            {cards.length} / {activeIndex + 1}
          </span>
          <button onClick={handlePrev} className={styles.navBtn}>
            <Image
              alt="arrow-right.png"
              src="/images/slider/arrow-right.png"
              width={36}
              height={36}
              className={styles.prevBtn}
            />
          </button>
        </div>
      </div>
    </>
  );
}
