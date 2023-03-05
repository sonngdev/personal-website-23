import Head from 'next/head';
import Image from 'next/image';
import Container from 'components/container';
import { ExternalLink } from 'react-feather';
import ydkjsImg from 'public/readings-assets/you-dont-know-js.jpg';
import ejImg from 'public/readings-assets/eloquent-javascript.jpg';
import ljdpImg from 'public/readings-assets/learning-javascript-design-patterns.jpg';
import tccImg from 'public/readings-assets/the-clean-coder.jpg';
import tddbeImg from 'public/readings-assets/test-driven-development-by-example.jpg';
import tsseImg from 'public/readings-assets/the-senior-software-engineer.jpg';
import dpImg from 'public/readings-assets/design-patterns.jpg';
import dsaaipImg from 'public/readings-assets/data-structures-and-algorithms-in-python.jpg';
import cnatdaImg from 'public/readings-assets/computer-networking-a-top-down-approach.jpg';

const READINGS = [
  {
    thumbnail: ydkjsImg,
    title: "You Don't Know JS (series)",
    author: 'Kyle Simpson',
    publicationYear: '2015',
    description: 'This is a series of books diving deep into the core mechanisms of the JavaScript language.',
    url: 'https://github.com/getify/You-Dont-Know-JS',
  },
  {
    thumbnail: ejImg,
    title: 'Eloquent JavaScript',
    author: 'Marijn Haverbeke',
    publicationYear: '2018',
    description: 'This is a book about JavaScript, programming, and the wonders of the digital.',
    url: 'https://eloquentjavascript.net/',
  },
  {
    thumbnail: ljdpImg,
    title: 'Learning JavaScript Design Patterns',
    author: 'Addy Osmani',
    publicationYear: '2021',
    description: 'The classic JavaScript design patterns book, updated to ES2015+ syntax.',
    url: 'https://www.patterns.dev/posts/classic-design-patterns/',
  },
  {
    thumbnail: tccImg,
    title: 'The Clean Coder',
    author: 'Robert C. Martin',
    publicationYear: '2011',
    description: 'A Code of Conduct for Professional Programmers.',
    url: 'https://www.oreilly.com/library/view/clean-coder-the/9780132542913/',
  },
  {
    thumbnail: tddbeImg,
    title: 'Test Driven Development: By Example',
    author: 'Kent Beck',
    publicationYear: '2002',
    description: 'This book follows two TDD projects from start to finish, illustrating techniques programmers can use to easily and dramatically increase the quality of their work.',
    url: 'https://www.oreilly.com/library/view/test-driven-development/0321146530/',
  },
  {
    thumbnail: tsseImg,
    title: 'The Senior Software Engineer',
    author: 'David B. Copeland',
    publicationYear: '2013',
    description: '11 Practices of an Effective Technical Leader',
    url: 'https://www.theseniorsoftwareengineer.com/',
  },
  {
    thumbnail: dpImg,
    title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
    author: 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides',
    publicationYear: '1994',
    description: 'Capturing a wealth of experience about the design of object-oriented software, four top-notch designers present a catalog of simple and succinct solutions to commonly occurring design problems.',
    url: 'https://www.oreilly.com/library/view/design-patterns-elements/0201633612/',
  },
  {
    thumbnail: dsaaipImg,
    title: 'Data Structures and Algorithms in Python',
    author: 'Michael T. Goodrich, Roberto Tamassia, Michael H. Goldwasser',
    publicationYear: '2013',
    description: 'A comprehensive, definitive introduction to data structures in Python.',
    url: 'https://www.oreilly.com/library/view/data-structures-and/9781118290279/',
  },
  {
    thumbnail: cnatdaImg,
    title: 'Computer Networking: A Top-Down Approach',
    author: 'James F. Kurose, AmherstKeith Ross',
    publicationYear: '2020',
    description: 'Computer Networking builds on the authors\' long tradition of teaching this complex subject through a layered approach in a "top-down manner".',
    url: 'https://www.pearson.com/en-us/subject-catalog/p/computer-networking/P200000003334/9780135928615',
  },
];

export default function Readings() {
  const readings = READINGS.slice();
  readings.reverse();

  return (
    <Container>
      <Head>
        <title>Son Nguyen • Readings</title>
      </Head>

      <div className="grid gap-y-10">
        {readings.map(({ thumbnail, title, author, publicationYear, description, url }) => (
          <div key={title} className="flex gap-x-4">
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

              <a className="flex gap-x-1 items-center w-fit" target="_blank" rel="noreferrer" href={url}>
                <ExternalLink size={16} />
                <span>Learn more</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
