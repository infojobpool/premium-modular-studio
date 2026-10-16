import { Testimonials } from "@/components/Testimonials";
import { getDisplayTestimonials } from "@/lib/reviews/testimonials";

export async function TestimonialsSection() {
  const items = await getDisplayTestimonials();
  return <Testimonials items={items} />;
}
