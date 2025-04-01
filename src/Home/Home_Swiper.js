import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards, Autoplay} from 'swiper/modules';
import '../MainCss/swiper.css'
export const Home_Swiper = ({img}) => {
  return (
    <Swiper 
    effect={'cards'}
    grabCursor={true}
    modules={[EffectCards, Autoplay]} 
    autoplay={{ delay: 10, disableOnInteraction: false }} 
    className="yourSwiper">
      {img.map((img)=>(
        <SwiperSlide style={{ display:"flex",justifyContent:"center"}}>
          <img src={img.url} className='swiperImg' alt="image" />
        </SwiperSlide>
        ))}
    </Swiper>
  );
};
