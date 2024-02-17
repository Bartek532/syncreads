import { useEffect, useRef, useState } from "react";

export const useVisibleSection = () => {
  const [visibleSection, setVisibleSection] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)?.target;
        if (visible) {
          setVisibleSection(visible.id);
        }
      },
      {
        rootMargin: "0px",
        threshold: 0.2,
      },
    );

    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
      observer.current?.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.current?.unobserve(section);
      });
    };
  }, []);

  return visibleSection;
};
