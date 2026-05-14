import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProjectCaseStudy } from "@/components/ProjectCaseStudy";
import { CITY_PAGE_COPY, isStudioCity } from "@/lib/city-page-copy";
import { allStaticProjectParams, getProjectStory } from "@/lib/city-projects";
import { getGalleryImagesForProject } from "@/lib/gallery-segmented";
import { interiorImages } from "@/lib/interior-images";
import { getProjectPageDetail } from "@/lib/project-page-details";
import type { StudioLocationId } from "@/lib/locations";

type Props = { params: Promise<{ city: string; slug: string }> };

export function generateStaticParams() {
  return allStaticProjectParams().map(({ city, slug }) => ({ city, slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: raw, slug } = await params;
  if (!isStudioCity(raw)) return {};
  const city = raw as StudioLocationId;
  const project = CITY_PAGE_COPY[city].galleryProjects.find((p) => p.slug === slug);
  if (!project) return {};
  const detail = getProjectPageDetail(slug);
  const description = detail?.contextLine ?? project.excerpt;
  return {
    title: project.name,
    description,
    openGraph: { title: `${project.name} | Vivid In2erio`, description },
  };
}

export default async function CityProjectDetail({ params }: Props) {
  const { city: raw, slug } = await params;
  if (!isStudioCity(raw)) notFound();
  const city = raw as StudioLocationId;
  const projects = CITY_PAGE_COPY[city].galleryProjects;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index < 0) notFound();
  const project = projects[index]!;
  const story = getProjectStory(slug);
  const coverInPoolIdx =
    project.coverImage != null
      ? interiorImages.gallery.findIndex((src) => src === project.coverImage)
      : -1;
  const heroPoolIndex =
    coverInPoolIdx >= 0 ? coverInPoolIdx : (project.imageIndex ?? index);
  const hero =
    project.coverImage ??
    interiorImages.gallery[heroPoolIndex] ??
    interiorImages.gallery[0]!;
  const detail = getProjectPageDetail(slug);
  const cityLabel = city === "hyderabad" ? "Hyderabad" : "Bhubaneswar";

  /** Same stills as `/[city]/gallery` for this slug — powers the “On the boards” strip. */
  const segmentStills = getGalleryImagesForProject(city, slug);
  const storyGallerySrcs = segmentStills.filter((url) => url !== hero);

  return (
    <main>
      <Header />
      <ProjectCaseStudy
        city={city}
        cityLabel={cityLabel}
        project={project}
        heroSrc={hero}
        story={story}
        detail={detail}
        heroPoolIndex={heroPoolIndex}
        storyGallerySrcs={storyGallerySrcs.length > 0 ? storyGallerySrcs : undefined}
      />
      <Footer />
    </main>
  );
}
