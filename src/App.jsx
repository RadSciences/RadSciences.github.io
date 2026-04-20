import { useState } from 'react';
import Header from './components/Header';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import ProjectDetail from './sections/ProjectDetail';
import Footer from './components/Footer';

function App() {
  const [view, setView] = useState('main');

  return (
    <div className="app-container">
      <Header setView={setView} />

      {view === 'main' ? (
        <main>
          <Hero />
          <About id="about" />
          <Services id="services" />
          <Projects id="projects" setView={setView} />
          <Contact id="contact" />
        </main>
      ) : (
        <ProjectDetail setView={setView} />
      )}

      <Footer />
    </div>
  );
}

export default App;
