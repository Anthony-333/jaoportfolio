import { ProjectCarousel } from "./project-carousel";
import { Reveal } from "./reveal";
import { card, Section } from "./sections";

export function Projects() {
  return (
    <Section id="projects" eyebrow="Selected projects" title={<>A closer look at <span className="text-muted">recent work</span></>}>
      <Reveal>
        <ProjectCarousel cardClass={card} />
      </Reveal>
    </Section>
  );
}
