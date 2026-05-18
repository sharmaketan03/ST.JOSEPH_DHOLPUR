import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import { useState, useEffect, useCallback } from "react";
import image1 from "@/assets/image1.jpeg";
import image2 from "@/assets/image2.jpeg"
import image3 from "@/assets/image3.png"
import campus2 from "@/assets/campus2.jpg"
import campus3 from "@/assets/campus3.png"
import Event from "@/assets/celebrations.png"
import Event1 from "@/assets/Event1.jpg"
import Event2 from "@/assets/Events2.jpg"
import Event3 from "@/assets/Events3.jpg"
import Event4 from "@/assets/Events4.png"
import Event5 from "@/assets/Events5.png"
import Event6 from "@/assets/Events6.png"
import Event7 from "@/assets/Events7.png"
// ─── Add your images here ───────────────────────────────────────────────────
const galleryItems = [
  { id: 1, src: image1, title: "School Campus", category: "Campus" },
   { id: 2, src:campus2 , title: "School Campus", category: "Campus" },
  { id: 3, src: image2, title: "Transport servie", category: "Bus" },
  { id: 4, src: image3, title: "Teachers", category: "Staff" },
  { id: 5, src: campus3, title: "Students", category: "Sports" },
  { id: 6, src: Event, title: "Students", category: "Events" },
  { id: 7, src: Event1, title: "Students", category: "Events" },
  { id: 8, src: Event2, title: "Students", category: "Events" },
  { id: 9, src: Event3, title: "Students", category: "Events" },
  { id: 10, src: Event4, title: "Students", category: "Events" },
  { id: 11, src: Event5, title: "Students", category: "Events" },
  { id: 12, src: Event6, title: "Students", category: "Events" },
  { id: 13, src: Event7, title: "Students", category: "Events" },
  


  // ... add more
];
// ────────────────────────────────────────────────────────────────────────────
 
const categories = ["All", "Campus", "Events", "Sports", "Classroom"];
 
const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
 
  const filtered =
    activeFilter === "All"
      ? galleryItems
      : galleryItems.filter((g) => g.category === activeFilter);
 
  const openLightbox = (id: number) => setLightbox(id);
  const closeLightbox = () => setLightbox(null);
 
  const currentIndex = lightbox !== null ? filtered.findIndex((g) => g.id === lightbox) : -1;
 
  const goPrev = useCallback(() => {
    if (currentIndex > 0) setLightbox(filtered[currentIndex - 1].id);
  }, [currentIndex, filtered]);
 
  const goNext = useCallback(() => {
    if (currentIndex < filtered.length - 1) setLightbox(filtered[currentIndex + 1].id);
  }, [currentIndex, filtered]);
 
  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightbox === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, goPrev, goNext]);
 
  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);
 
  const lightboxItem = lightbox !== null ? filtered.find((g) => g.id === lightbox) : null;
 
  return (
    <Layout>
      <PageHero
        title="Photo Gallery"
        subtitle="Glimpses of life at St. Joseph's"
        breadcrumb="Gallery"
      />
 
      <section className="section-padding">
        <div className="container mx-auto px-4">
 
          {/* ── Filter Tabs ── */}
          <AnimatedSection>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveFilter(c)}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 border ${
                    activeFilter === c
                      ? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
                      : "bg-background text-muted-foreground border-border hover:border-primary hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </AnimatedSection>
 
          {/* ── Empty State ── */}
          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg">No images in this category yet.</p>
            </div>
          )}
 
          {/* ── Gallery Grid ── */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {filtered.map((item, i) => (
              <AnimatedSection key={item.id} delay={i * 0.06}>
                {/* 
                  KEY CHANGE: No aspect-ratio box. 
                  The image renders at its NATURAL height — nothing is cropped.
                  We use `width: 100%` + `height: auto` to keep original proportions.
                */}
                <div
                  className="break-inside-avoid rounded-2xl overflow-hidden border border-border group cursor-zoom-in shadow-sm hover:shadow-xl transition-all duration-500"
                  onClick={() => openLightbox(item.id)}
                >
                  <div className="relative">
                    <img
                      src={item.src}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-auto block group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-all duration-400 flex flex-col items-center justify-end p-4">
                      <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 text-center">
                        <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/30 mb-1">
                          {item.category}
                        </span>
                        <p className="text-white text-sm font-medium drop-shadow-sm">{item.title}</p>
                      </div>
                    </div>
                    {/* Expand icon */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
 
          {/* ── Image Count ── */}
          {filtered.length > 0 && (
            <p className="text-center text-muted-foreground text-sm mt-10">
              Showing {filtered.length} {filtered.length === 1 ? "photo" : "photos"}
              {activeFilter !== "All" ? ` in ${activeFilter}` : ""}
            </p>
          )}
        </div>
      </section>
 
      {/* ── Lightbox ── */}
      {lightbox !== null && lightboxItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2.5 transition-all duration-200 z-10"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
 
          {/* Prev button */}
          {currentIndex > 0 && (
            <button
              className="absolute left-3 sm:left-5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all duration-200 z-10"
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              aria-label="Previous"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
 
          {/* Image — full size, no crop */}
          <div
            className="max-w-[90vw] max-h-[90vh] flex flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxItem.src}
              alt={lightboxItem.title}
              className="max-w-full max-h-[80vh] w-auto h-auto rounded-xl shadow-2xl object-contain"
            />
            <div className="text-center">
              <p className="text-white font-semibold text-base">{lightboxItem.title}</p>
              <span className="text-white/60 text-xs">{lightboxItem.category}</span>
            </div>
            {/* Counter */}
            <p className="text-white/40 text-xs">
              {currentIndex + 1} / {filtered.length}
            </p>
          </div>
 
          {/* Next button */}
          {currentIndex < filtered.length - 1 && (
            <button
              className="absolute right-3 sm:right-5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all duration-200 z-10"
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              aria-label="Next"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      )}
    </Layout>
  );
};
 
export default Gallery;