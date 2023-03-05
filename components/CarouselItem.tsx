import { CarouselItemProps } from "../interfaces";
import Image from 'next/image';
import Link from "next/link";


export default function CarouselItem(props: CarouselItemProps) {
    const { id, bodyType, modelName, modelType, imageUrl } = props;
    return (
        <div className="carousel-item">
            <a href="#" className="carousel-link" draggable="false">
                <span className="sub-head">{bodyType}</span>
                <h3>{modelName}{' '}<small>{modelType}</small></h3>
                <div className="carousel-img-wrap">
                    <Image
                        className="carousel-img"
                        alt={modelName}
                        src={imageUrl}
                        fill
                        priority
                        draggable="false"
                        sizes="(max-width: 768px) 100vw,
                        (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            </a>
            <div className="extra-links">
                <Link href={`/learn/${id}`} as={`/learn/${id}`} className="readmore" >Läs mer <Image alt="read more" width="12" height="12" src="/icons/chevron-small.svg" /></Link>
                <Link href={`/shop/${id}`} as={`/shop/${id}`} className="shop" >Shop <Image alt="read more" width="12" height="12" src="/icons/chevron-small.svg" /></Link>
            </div>
        </div>
    );
}