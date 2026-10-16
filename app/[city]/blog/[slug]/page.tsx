import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BlogArticle } from "@/components/BlogArticle";
import { CityPageShell } from "@/components/CityPageShell";
import { isStudioCity } from "@/lib/city-page-copy";
import { BLOG_POSTS, getBlogPost } from "@/lib/blog-posts";
import { STUDIO_LOCATIONS, type StudioLocationId } from "@/lib/locations";
import { buildPageMetadata, cityOpenGraphImage } from "@/lib/seo/metadata";

type Props = { params: Promise<{ city: string; slug: string }> };

const STUDIO_CITIES: StudioLocationId[] = ["hyderabad", "bhubaneswar"];

export function generateStaticParams() {
  return STUDIO_CITIES.flatMap((city) =>
    BLOG_POSTS.map((post) => ({ city, slug: post.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: raw, slug } = await params;
  if (!isStudioCity(raw)) return {};
  const post = getBlogPost(slug);
  if (!post) return {};
  const city = raw as StudioLocationId;
  const cityLabel = STUDIO_LOCATIONS[city].label;

  return buildPageMetadata({
    title: post.title,
    description: post.summary,
    pathname: `/${city}/blog/${slug}`,
    openGraphImage: cityOpenGraphImage(city, cityLabel),
    keywords: post.keywords,
  });
}

export default async function CityBlogArticlePage({ params }: Props) {
  const { city: raw, slug } = await params;
  if (!isStudioCity(raw)) notFound();
  const post = getBlogPost(slug);
  if (!post) notFound();

  const city = raw as StudioLocationId;
  const cityLabel = STUDIO_LOCATIONS[city].label;

  return (
    <CityPageShell>
      <BlogArticle city={city} cityLabel={cityLabel} post={post} />
    </CityPageShell>
  );
}
