import { useState } from 'react';
import Header from './components/Header';
import Highlight from './sections/Highlight';
import About from './sections/About';
import Services from './sections/Services';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import ProjectDetail from './sections/ProjectDetail';
import Footer from './components/Footer';

function App() {
  // 'main'이면 통합 스크롤 페이지, 'detail'이면 특정 작업물 상세 페이지
  const [view, setView] = useState('main');

  return (
    
    <div className="app-container"> {/* index.css의 클래스 적용 */}
      
      <Header setView={setView} />

      {/* 2. 조건부 컨텐츠 렌더링 */}
      {view === 'main' ? (
        <main>
          
          <section id="highlight">
            <Highlight />
          </section>

          <section id="about">
            <About />
          </section>

          <section id="services">
            <Services />
          </section>

          <section id="projects">
            <Projects setView={setView} />
          </section>

          <section id="contact">
            <Contact />
          </section>
        </main>
      ) : (
        /* 프로젝트 상세 페이지 뷰 */
        <ProjectDetail setView={setView} />
      )}

      
      <Footer />
    </div>
  );
}

export default App;