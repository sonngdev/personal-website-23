import Container from '../components/container';

function HomePage() {
  return (
    <>
      <Container>
        <div className="space-y-6">
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

          <p>
            {'You can find me on '}
            <a href="https://github.com/thanhsonng" target="_blank" rel="noreferrer">
              GitHub
            </a>
            {', '}
            <a href="https://www.linkedin.com/in/thanhsonng/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            {', and '}
            <a href="https://twitter.com/thanhsonng211" target="_blank" rel="noreferrer">
              Twitter
            </a>
            {', or email me at '}
            <a href="mailto:son@sonng.dev" target="_blank" rel="noreferrer">
              son@sonng.dev
            </a>
            {'.'}
          </p>
        </div>
      </Container>
    </>
  );
}

export default HomePage;
