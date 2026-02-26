import { notFound } from 'next/navigation';
import ProjectPage from "@/app/components/ProjectPage";
import projects from '@/app/lib/projects'

const Work = async (params: Promise<{ slug: string }>) => {

  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);

  if (!project) notFound();

  const currentIndex = projects.findIndex(p => p.slug === slug);
  const nextIndex = (currentIndex + 1) % projects.length;
  const prevIndex = (currentIndex - 1 + projects.length) % projects.length;

  const nextProject = projects[nextIndex]
  const prevProject = projects[prevIndex]

  return (
    <div>
      <ProjectPage 
        project={project}
        nextProject={nextProject}
        prevProject={prevProject}
      />
    </div>
  )
}

export default Work
