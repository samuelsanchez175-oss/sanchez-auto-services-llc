import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceLandingView } from "@/components/marketing/service-landing-view";
import { landingBySlug, SERVICE_LANDINGS } from "@/lib/service-landings";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SERVICE_LANDINGS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const landing = landingBySlug(slug);
  if (!landing) return {};
  return {
    title: landing.seoTitleEn,
    description: landing.seoDescEn,
    alternates: { canonical: `/services/${landing.slug}` },
    openGraph: {
      title: landing.seoTitleEn,
      description: landing.seoDescEn,
      images: [{ url: "/gallery/shop-1.jpg" }],
    },
  };
}

export default async function ServiceLandingPage({ params }: Props) {
  const { slug } = await params;
  const landing = landingBySlug(slug);
  if (!landing) notFound();
  return <ServiceLandingView landing={landing} />;
}
