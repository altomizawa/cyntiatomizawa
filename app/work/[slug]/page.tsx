import ProjectPage from "@/app/components/ProjectPage";
import projects from '@/app/lib/projects'

const Work = async ({ params }) => {

  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  const currentIndex = projects.findIndex(p => p.slug === slug);
  const nextIndex = (currentIndex + 1) % projects.length;
  const prevIndex = (currentIndex - 1 + projects.length) % projects.length;

  const nextProject = projects[nextIndex]
  const prevProject = projects[prevIndex]


  console.log('slug', slug)
  
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
