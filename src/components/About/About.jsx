import "./About.css";
import pictureOfMe from "../../assets/pictureofMe.jpg";

function About() {
  return (
    <div className="about">
      <div className="about__image-wrapper">
        <img
          src={pictureOfMe}
          alt="picture"
          className="about__image"
        />
      </div>
      <div className="about__info">
        <h2 className="about__title">About the author</h2>
        <p className="about__text">
          Johnnathon Williams is the name, a full-stack software engineer
          specializing JavaScript development. I excel at transforming Figma
          designs into putting ideas in heads into on sites, responsive UI using CSS and BEM semantic
          syntax for controllable code for years to come. I have experience deploying
          websites on google cloud with nginx, PM2, and certbot, I ensure safe applications for users.
          I am also knowledgeable in with Git for version control and collaborating on projects through GitHub, which includes
          branching, merging, and managing pull requests.
        </p>
        <p className="about__tripleten">
          Throughout TripleTen’s bootcamp, I went from no coding knowledge to
          building full-stack applications in a little over a year, learning HTML, CSS,
          JavaScript, React, Git, and GitHub.
        </p>
      </div>
    </div>
  );
}

export default About;