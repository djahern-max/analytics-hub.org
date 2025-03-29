import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import styles from './CharityCarousel.module.css';

const charities = [
    {

        description: 'U.S. education',
        logo: '/images/charities/donorschoose.png',
    },
    {

        description: 'Global child education',
        logo: '/images/charities/pratham.png',
    },
    {

        description: 'Out-of-school children',
        logo: '/images/charities/luminos.png',
    },
    {

        description: 'Education in crisis zones',
        logo: '/images/charities/streetchild.png',
    },
    {

        description: 'Learning gap support',
        logo: '/images/charities/savethechildren.png',
    },
];

const CharityCarousel = () => {
    return (
        <div className={styles.carouselContainer}>
            <Swiper
                modules={[Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                className={styles.swiper}
            >
                {charities.map((charity, index) => (
                    <SwiperSlide key={index} className={styles.swiperSlide}>
                        <div className={styles.slide}>
                            <img
                                src={charity.logo}
                                alt={charity.name}
                                className={styles.logo}
                                onError={(e) => {
                                    console.error(`Failed to load image: ${charity.logo}`);
                                    e.target.src = `https://placehold.co/150x150?text=${encodeURIComponent(charity.name)}`;
                                }}
                            />
                            <h3 className={styles.charityName}>{charity.name}</h3>
                            <p className={styles.charityDescription}>{charity.description}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CharityCarousel;