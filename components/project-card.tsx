import Image, { StaticImageData } from 'next/image';
import { ArrowRight, ExternalLink } from 'react-feather';

interface ProjectCardProps {
  img: StaticImageData;
  title: string;
  description: string;
  technologies: string;
  projectUrl: string;
  githubUrl: string;
}

export default function ProjectCard(props: ProjectCardProps) {
  const { img, title, description, technologies, projectUrl, githubUrl } = props;

  return (
    <div className="rounded-md overflow-hidden border border-gray-300 hover:border-gray-400 transition-colors flex flex-col">
      <Image
        src={img}
        alt="ChatGPT With Voice"
        className="object-cover aspect-video"
      />

      <div className="px-4 py-6 flex-1 flex flex-col">
        <div className="flex-1">
          <a target="_blank" rel="noreferrer" href={projectUrl}>
            <h2 className="font-bold text-lg">
              {title}
            </h2>
          </a>
          <p className="mt-2">{description}</p>
          <p className="text-gray-400 mt-1">
            Powered by: <strong>{technologies}</strong>
          </p>
        </div>

        <div className="flex justify-between mt-8">
          <a className="flex gap-x-1 items-center" target="_blank" rel="noreferrer" href={projectUrl}>
            <span>Learn more </span>
            <ArrowRight size={16} />
          </a>

          <a className="flex gap-x-1 items-center" target="_blank" rel="noreferrer" href={githubUrl}>
            <ExternalLink size={16} />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
}
