import Head from 'next/head';
import Container from 'components/container';
import ProjectCard from 'components/project-card';
import freeCodeCampImg from 'public/projects-assets/free-code-camp.png';
import algorithmsVisualizerImg from 'public/projects-assets/algorithms-visualizer.png';
import chatgptVoiceImg from 'public/projects-assets/chatgpt-with-voice.png';

const PROJECTS = [
  {
    img: freeCodeCampImg,
    title: 'freeCodeCamp Projects',
    description: 'A collection of projects I did back in 2017 to learn programming and complete the freeCodeCamp Frontend Certificate.',
    technologies: 'HTML, CSS, JavaScript, jQuery, ES6.',
    projectUrl: 'https://codepen.io/collection/kNZGjG',
  },
  {
    img: algorithmsVisualizerImg,
    title: 'Algorithms Visualizer',
    description: 'See the most common pathfinding algorithms in action.',
    technologies: 'React, TypeScript, Vite, Immer, Netlify.',
    projectUrl: 'https://algorithms.sonng.dev',
    githubUrl: 'https://github.com/thanhsonng/algorithm-visualizer',
  },
  {
    img: chatgptVoiceImg,
    title: 'ChatGPT With Voice',
    description: 'Have a casual conversation with ChatGPT through this pretty voice interface.',
    technologies: 'ChatGPT, Web Speech Synthesis API, Tailwind CSS, Azure Cloud, Nginx.',
    projectUrl: 'https://chatgpt.sonng.dev',
    githubUrl: 'https://github.com/thanhsonng/chatgpt-voice',
  },
];

export default function Projects() {
  const projects = PROJECTS.slice();
  projects.reverse();

  return (
    <Container>
      <Head>
        <title>Son Nguyen • Projects</title>
      </Head>

      <div className="grid gap-y-10">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </Container>
  );
}
