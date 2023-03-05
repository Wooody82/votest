import path from 'path'
import fsPromises from 'fs/promises';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSpringCarousel } from 'react-spring-carousel'
import CarouselThumb from '../components/CarouselThumb';
import CarouselItem from '../components/CarouselItem';
import useWindowSize from '../components/window';
import { CarouselItemProps } from '../interfaces';


export default function Index({ myCarData }: { myCarData: CarouselItemProps[] }) {

  const [itemsPerSlide, setItemsPerSlide] = useState<number>(1);
  const { width, height } = useWindowSize();
  const [activeItem, setActiveItem] = useState('');
  const [currentActive, setCurrentActive] = useState(0);

  useEffect(() => {
    if (width < 360) {
      setItemsPerSlide(1);
    } else if (width < 768) {
      setItemsPerSlide(2);
    } else {
      setItemsPerSlide(4);
    }
  }, [width]);

  const { carouselFragment, useListenToCustomEvent, thumbsFragment, slideToPrevItem, slideToNextItem, slideToItem, getIsPrevItem } = useSpringCarousel({
    itemsPerSlide,
    gutter: 24,
    startEndGutter: 24,
    withThumbs: true,
    draggingSlideTreshold: 25,
    items: myCarData.map((data) => ({
      id: data.id,
      renderItem: (
        <CarouselItem id={data.id}
          bodyType={data.bodyType}
          modelName={data.modelName}
          modelType={data.modelType}
          imageUrl={data.imageUrl} />
      ),
      renderThumb: (
        <CarouselThumb active={activeItem === data.id} onClick={() => handleDotSlideToItem(data.id)} />
      )
    })),
  });

  useListenToCustomEvent((event) => {
    if (event.eventName === 'onSlideChange') {
      console.log('event.currentItem.index ===>', event.currentItem.index)
      setCurrentActive(event.currentItem.index)
    }
  });

  const handleDotSlideToItem = (itemId: string) => {
    setActiveItem(itemId);
    slideToItem(itemId);
  };


  return (
    <>
      <div className="container" role="region" aria-label="Car carousel" aria-live="polite">
        {carouselFragment}
        <div className="carousel-nav">
          <button onClick={slideToPrevItem} className="prev" disabled={currentActive === 0} aria-label="Previous slide" >
            <Image alt="previous slide" width="40" height="40" src="/icons/chevron-circled.svg" />
          </button>
          <button onClick={slideToNextItem} className="next" disabled={currentActive + 4 === myCarData.length} aria-label="Next slide">
            <Image alt="next slide" width="40" height="40" src="/icons/chevron-circled.svg" />
          </button>
        </div>
        <div className="carousel-thumbs" role="tablist">{thumbsFragment}</div>
      </div>
    </>
  )
}


export const getStaticProps = async () => {
  const filePath = path.join(process.cwd(), '/public/api/cars.json');
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData.toString('utf-8'));

  return {
    props: { myCarData: objectData }
  }
}
