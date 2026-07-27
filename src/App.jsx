import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import ClosureNotice from './components/ClosureNotice';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
// import Testimonials from './sections/Testimonials';
import ProjectDetail from './sections/ProjectDetail';
import Footer from './components/Footer';

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      el?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.state]);
  return null;
}

function MainPage() {


  return (
    <main>
      <Hero />
      <About id="about" />
      <Services id="services" />
      <Projects id="projects" />
      {/* <Testimonials /> */}
      <Contact id="contact" />
    </main>
  );
}

function App() {
  return (
    <div className="app-container">
      <ScrollToTop />
      <ClosureNotice />
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
