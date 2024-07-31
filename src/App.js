import React, { useState, useEffect } from 'react';
import './App.css';
import profilePhoto from './assets/images/profile-photo.jpg';
import resume from './assets/documents/Zeeshan.pdf'; // Import your resume file here
import projects from './projects'; // Import the projects data

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [welcomeText, setWelcomeText] = useState('');
  const [introText, setIntroText] = useState('');
  const [welcomeTextCompleted, setWelcomeTextCompleted] = useState(false);
  const welcomeMessage = "Welcome to My ";
  const introMessage = "Hi, I'm Zeeshan Javaid, a passionate software developer with expertise in web and mobile applications.";

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setWelcomeText(welcomeMessage.slice(0, index));
      index += 1;
      if (index > welcomeMessage.length) {
        clearInterval(interval);
        setWelcomeTextCompleted(true); // Update state to remove cursor
      }
    }, 100); // Adjust typing speed here
  }, [welcomeMessage]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setIntroText(introMessage.slice(0, index));
      index += 1;
      if (index > introMessage.length) clearInterval(interval);
    }, 50); // Adjust typing speed here
  }, [introMessage]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  return (
    <div className="App">
      <header className="App-header">
        <nav className={`Navbar ${navbarOpen ? 'active' : ''}`}>
          <div className="hamburger" onClick={toggleNavbar}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <ul className={`navbar-collapse ${navbarOpen ? 'active' : ''}`}>
            <li><a href="#home">Home</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href={resume} download>Resume</a></li> {/* Added Resume link */}
          </ul>
          <label className="Theme-toggle">
            <input type="checkbox" checked={darkMode} onChange={toggleTheme} />
            <span className="slider"></span>
          </label>
        </nav>
        <section id="home" className="Home">
          <img src={profilePhoto} alt="Profile" className="Profile-photo" />
          <h1 className="App-title">
            <span className={`typewriter ${welcomeTextCompleted ? 'no-cursor' : ''}`}>
              {welcomeText.split('portfolio').map((part, index) => (
                <React.Fragment key={index}>
                  {part}
                  {index === 0 && <span className="highlighted">portfolio</span>}
                </React.Fragment>
              ))}
            </span>
          </h1>
          <p className="App-intro">{introText}</p> {/* Removed typewriter effect here */}
        </section>
        <section id="skills" className="Skills">
          <h2>Skills</h2>
          <div className="Skills-container">
            <div className="Skills-tile">ASP.NET Development</div>
            <div className="Skills-tile">MAUI & Xamarin.Forms</div>
            <div className="Skills-tile">React & Redux</div>
            <div className="Skills-tile">SQL & Database Management</div>
            <div className="Skills-tile">Machine Learning & AI</div>
            <div className="Skills-tile">JavaScript</div>
            <div className="Skills-tile">HTML & CSS</div>
            <div className="Skills-tile">Azure</div>
            <div className="Skills-tile">Bootstrap</div>
            <div className="Skills-tile">Version Control (Git)</div>
          </div>
        </section>

        <section id="projects" className="Projects">
          <h2>Projects</h2>
          <div className="container">
            <div className="row">
              {projects.map((project) => (
                <div key={project.id} className="" style={{ margin: '10px' }}>
                  <div className="card">
                    <img src={project.image} className="card-img-top" alt={project.title} />
                    <div className="card-body">
                      <h2 className="card-title">{project.title}</h2>
                      <div className="card-text" style={{ overflowY: 'auto', height: '150px', width: 'auto' }}>
                        <div className="card-text-content">{project.fullDescription}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="contact" className="Contact">
          <h2>Contact</h2>
          <p>
            Feel free to reach out to me at{' '}
            <a href="mailto:your-email@example.com">your-email@example.com</a>
          </p>
        </section>
      </header>
    </div>
  );
}

export default App;
