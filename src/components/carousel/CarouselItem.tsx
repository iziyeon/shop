import { Link } from 'react-router-dom';

interface Props {
  image: string;
  title: string;
  description: string;
  link: string;
}

export default function CarouselItem({ image, title, description, link }: Props) {
  return (
    <div className="relative h-[400px] md:h-[600px]">
      <img 
        src={image}
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-4">{title}</h2>
          <p className="text-xl mb-6">{description}</p>
          <Link to={link} className="btn btn-primary">
            자세히 보기
          </Link>
        </div>
      </div>
    </div>
  );
}
