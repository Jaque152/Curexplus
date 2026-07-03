import { products, getProductBySlug } from "@/lib/products";

export function generateStaticParams() {
  // Usamos el catálogo base (español) para generar las rutas estáticas
  return products.es.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug, "es");
  
  if (!product) return { title: "Producto no encontrado — Curexplus" };
  
  return {
    title: `${product.name} — Curexplus`,
    description: product.blurb,
  };
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}