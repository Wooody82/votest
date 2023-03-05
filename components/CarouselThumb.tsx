import { CarouselThumbProps } from "../interfaces";


export default function CarouselThumb({ active, onClick }: CarouselThumbProps) {
    return (
      <div className="dot" style={{ backgroundColor: active ? 'blue' : '#ccc' }} onClick={onClick} />
    );
}