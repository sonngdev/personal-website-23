import Image, { StaticImageData } from 'next/image';
import { ExternalLink } from 'react-feather';

interface ReadingItemProps {
  thumbnail: StaticImageData;
  title: string;
  author: string;
  publicationYear: string;
  description: string;
  url: string;
}

export default function ReadingItem(props: ReadingItemProps) {
  const { thumbnail, title, author, publicationYear, description, url } = props;

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Image
        src={thumbnail}
        alt="ChatGPT With Voice"
        className="w-32"
      />
      <div className="flex flex-col">
        <div className="text-lg leading-6 font-bold">
          {title}
        </div>
        <div className="text-gray-400">
          {`${author} (${publicationYear})`}
        </div>
        <p className="mt-2 flex-1">{description}</p>

        <a className="flex gap-x-1 items-center w-fit mt-4 lg:mt-0" target="_blank" rel="noreferrer" href={url}>
          <ExternalLink size={16} />
          <span>Learn more</span>
        </a>
      </div>
    </div>
  );
}
