import path from 'path';
import fsPromises from 'fs/promises';
import { useRouter } from 'next/router';
import Image from 'next/image';


export default function LearnPage({ carData }) {
  const router = useRouter();

  // Show a loading state while the page is being fetched
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{carData.modelName}</h1>
      <Image width="400" height="300" src={carData.imageUrl} alt={carData.modelName} />
    </div>
  );
}


export const getStaticPaths = async () => {
  const filePath = path.join(process.cwd(), '/public/api/cars.json');
  const jsonData = await fsPromises.readFile(filePath);
  const carData = JSON.parse(jsonData.toString('utf-8'));

  // Generate paths for each car data item
  const paths = carData.map((item) => ({
    params: { slug: item.id },
  }));

  return { paths, fallback: true };
};


export const getStaticProps = async ({ params }) => {
  const filePath = path.join(process.cwd(), '/public/api/cars.json');
  const jsonData = await fsPromises.readFile(filePath);
  const carData = JSON.parse(jsonData.toString('utf-8'));

  const car = carData.find((item) => item.id === params?.slug);

  if (!car) {
    return {
      notFound: true,
    };
  }

  return {
    props: { carData: car },
  };
};
