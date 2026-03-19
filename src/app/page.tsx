import { getContent } from '@/lib/content';
import Cursor from '@/components/Cursor';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import MarqueeBar from '@/components/MarqueeBar';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const content = await getContent();

  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <HeroSection data={content.hero} />
        <MarqueeBar />
        <AboutSection data={content.about} />
        <SkillsSection data={content.skills} />
        <ProjectsSection data={content.projects} />
        <ContactSection data={content.contact} />
      </main>
      <Footer />
    </>
  );
}
