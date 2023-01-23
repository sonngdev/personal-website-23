import Container from '../components/container';
import Image from 'next/image';
import logo from 'public/logo/logo.png';

function HomePage() {
  return (
    <>
      <Container>
        <div className="space-y-6">
          <Image src={logo} alt="Logo" className="mb-9 w-36" />

          <h1 className="text-2xl font-bold">
            Hi and welcome 👋
          </h1>

          <p>
            {"I'm "}
            <strong>Son Nguyen</strong>
            {' - an ex-Front-End Engineer at '}
            <a href="https://www.photostudy.co/" target="_blank" rel="noreferrer">
              Got It, Inc
            </a>
            {" - a start-up based in Silicon Valley. Currently I'm doing a MSc in Digital Innovation at UCD, Ireland. This is where I share my own thoughts and experience of my journey in Software Engineering. I hope you find something to enjoy 🤗."}
          </p>
        </div>
      </Container>
    </>
  );
}

export default HomePage;
