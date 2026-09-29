"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Code2 } from "lucide-react";
import { companies, featuredProjects } from "@/lib/data";
import { ProjectGallery } from "./project-gallery";

const ALL = "All";
const filters = [ALL, ...companies.map((c) => c.name)];
// How long one wheel step owns the gesture, so a single notch/flick moves exactly one card.
const WHEEL_LOCK_MS = 550;

export function ProjectCarousel({ cardClass }: { cardClass: string }) {
  const [filter, setFilter] = useState(ALL);
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLUListElement>(null);

  const visible = featuredProjects
    .map((p, i) => ({ ...p, number: i + 1 }))
    .filter((p) => filter === ALL || p.company === filter);
  const count = (name: string) => (name === ALL ? featuredProjects.length : featuredProjects.filter((p) => p.company === name).length);

  function goTo(index: number, smooth = true) {
    const track = trackRef.current;
    const slide = track?.children[index] as HTMLElement | undefined;
    if (!track || !slide) return;
    track.scrollTo({ left: slide.offsetLeft, behavior: smooth ? "smooth" : "instant" });
  }

  function selectFilter(name: string) {
    setFilter(name);
    setActive(0);
    trackRef.current?.scrollTo({ left: 0, behavior: "instant" });
  }

  // The slide whose left edge is closest to the track's scroll position is the active one.
  function onScroll() {
    const track = trackRef.current;
    if (!track) return;
    const slides = Array.from(track.children) as HTMLElement[];
    let nearest = 0;
    slides.forEach((s, i) => {
      if (Math.abs(s.offsetLeft - track.scrollLeft) < Math.abs(slides[nearest].offsetLeft - track.scrollLeft)) nearest = i;
    });
    setActive(nearest);
  }

  // Vertical mouse-wheel steps through the cards one at a time. At the first/last card the wheel
  // is released so the page keeps scrolling. Horizontal trackpad swipes scroll natively.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let lockedUntil = 0;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) >= Math.abs(e.deltaY)) return;
      const slides = Array.from(track.children) as HTMLElement[];
      const max = track.scrollWidth - track.clientWidth;
      if (slides.length < 2 || max <= 0) return;

      const now = performance.now();
      if (now < lockedUntil) {
        e.preventDefault();
        return;
      }
      const dir = e.deltaY > 0 ? 1 : -1;
      const atStart = track.scrollLeft <= 1;
      const atEnd = track.scrollLeft >= max - 1;
      if ((dir < 0 && atStart) || (dir > 0 && atEnd)) return;

      e.preventDefault();
      lockedUntil = now + WHEEL_LOCK_MS;
      const current = slides.reduce(
        (best, s, i) => (Math.abs(s.offsetLeft - track.scrollLeft) < Math.abs(slides[best].offsetLeft - track.scrollLeft) ? i : best),
        0,
      );
      const next = slides[Math.min(slides.length - 1, Math.max(0, current + dir))];
      track.scrollTo({ left: Math.min(next.offsetLeft, max), behavior: "smooth" });
    };

    track.addEventListener("wheel", onWheel, { passive: false });
    return () => track.removeEventListener("wheel", onWheel);
  }, []);

  const arrow =
    "grid size-10 place-items-center rounded-full border border-line bg-surface transition hover:border-fg disabled:pointer-events-none disabled:opacity-40";

  return (
    <div>
      <div role="group" aria-label="Filter projects by company" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 no-scrollbar">
        {filters.map((name) => {
          const n = count(name);
          const isActive = filter === name;
          return (
            <button
              key={name}
              type="button"
              onClick={() => selectFilter(name)}
              disabled={n === 0}
              aria-pressed={isActive}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm transition disabled:cursor-not-allowed disabled:opacity-40 ${
                isActive ? "border-accent bg-accent font-medium text-neutral-900" : "border-line bg-surface hover:border-fg"
              }`}
            >
              {name}
              <span className={`text-xs tabular-nums ${isActive ? "text-neutral-900/60" : "text-muted"}`}>{n}</span>
            </button>
          );
        })}
      </div>

      <ul
        ref={trackRef}
        onScroll={onScroll}
        aria-label="Projects"
        className="relative mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain no-scrollbar"
      >
        {visible.map((p, i) => (
          <li
            key={p.title}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${visible.length}`}
            className={`${cardClass} group shrink-0 snap-start p-1.5 ${visible.length > 1 ? "w-[88%]" : "w-full"}`}
          >
            <ProjectGallery title={p.title} images={p.images} />

            <div className="grid gap-8 p-6 sm:p-7 md:grid-cols-[1.5fr_1fr]">
              <div>
                <p className="flex items-center gap-3 text-sm text-muted">
                  <span className="tabular-nums">0{p.number}</span>
                  <span className="h-px w-6 bg-line" />
                  <span className="tabular-nums">{p.year}</span>
                  <span className="h-px w-6 bg-line" />
                  <span>{p.company}</span>
                </p>
                <h3 className="mt-4 text-2xl font-medium tracking-tight">{p.title}</h3>
                <p className="text-sm text-accent-deep dark:text-accent">{p.role}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted">{p.description}</p>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col justify-between gap-8">
                <div>
                  <h4 className="text-sm text-muted">Built with</h4>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {p.stack.map((t) => (
                      <li key={t} className="rounded-full border border-line px-3 py-1 text-xs">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {p.links.live && (
                    <a
                      href={p.links.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-neutral-900 transition hover:bg-fg hover:text-bg"
                    >
                      Live site <ArrowUpRight className="size-4" />
                    </a>
                  )}
                  {p.links.code && (
                    <a
                      href={p.links.code}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm transition hover:border-fg"
                    >
                      <Code2 className="size-4" /> Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {visible.length > 1 && (
        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {visible.map((p, i) => (
              <button
                key={p.title}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to ${p.title}`}
                aria-current={i === active ? "true" : undefined}
                className={`h-2 rounded-full transition-all ${i === active ? "w-8 bg-accent" : "w-2 bg-line hover:bg-muted"}`}
              />
            ))}
            <span className="ml-3 text-sm text-muted tabular-nums">
              0{active + 1} / 0{visible.length}
            </span>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Previous project" className={arrow}>
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              disabled={active === visible.length - 1}
              aria-label="Next project"
              className={arrow}
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
