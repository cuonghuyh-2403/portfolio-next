import { getContent } from '@/lib/content';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Cursor from '@/components/Cursor';
import ProjectsPage from '@/components/ProjectsPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Portfolio — Tất cả Dự Án | Cuong Huynh',
    description: 'Toàn bộ dự án của Cuong Huynh — Web Development, UI/UX Design, Mobile và Open Source.',
};

export default async function ProjectsRoute() {
    const content = await getContent();
    return (
        <>
            <Cursor />
            <Navbar />
            <ProjectsPage data={content.projects} />
            <Footer />
        </>
    );
}
