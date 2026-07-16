import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Banner.module.css';

// Пока статические импорты, позже заменишь на данные с сервера
import banner1 from '../assets/banner1.png';
import banner2 from '../assets/banner2.png';
// Добавь новые баннеры сюда же: import banner3 from '...';

const banners = [
  { id: 1, src: banner1, alt: 'Акция 1', link: '/catalog' },
  { id: 2, src: banner2, alt: 'Акция 2', link: '/registration' },
  // { id: 3, src: banner3, alt: 'Акция 3', link: '/new' },
];

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  const currentBanner = banners[currentIndex];

  return (
    <div className={styles.container}>
      <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={goToPrevious} >
        <ChevronLeft size={28} />
      </button>
      
      <a href={currentBanner.link} className={styles.imageLink} aria-label={currentBanner.alt}>
        <img src={currentBanner.src} alt={currentBanner.alt} className={styles.image}/>
      </a>

      <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={goToNext} >
        <ChevronRight size={28} />
      </button>
    </div>
  );
}