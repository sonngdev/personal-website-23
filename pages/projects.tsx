import Container from 'components/container';
import algorithmsVisualizerImg from 'public/projects-assets/algorithms-visualizer.png';
import chatgptVoiceImg from 'public/projects-assets/chatgpt-with-voice.png';
import ProjectCard from 'components/project-card';

const PROJECTS = [
  {
    img: algorithmsVisualizerImg,
    title: 'Algorithms Visualizer',
    description: 'A neat website that visualizes common pathfinding algorithms',
    technologies: 'TypeScript, Vite, Immer, Netlify',
    projectUrl: 'https://algorithms.sonng.dev',
    githubUrl: 'https://github.com/thanhsonng/algorithm-visualizer',
  },
  {
    img: chatgptVoiceImg,
    title: 'ChatGPT With Voice',
    description: 'A small app that allows you to talk to ChatGPT about, well, anything',
    technologies: 'ChatGPT, Web Speech Synthesis API, Tailwind CSS, Azure Cloud, Nginx',
    projectUrl: 'https://chatgpt.sonng.dev',
    githubUrl: 'https://github.com/thanhsonng/chatgpt-voice',
  },
];

export default function Projects() {
  const projects = PROJECTS.slice();
  projects.reverse();

  return (
    <Container>
      <div className="grid gap-y-10">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </Container>
  );
}
