"use client";

import { memo, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useRandomInterval } from "@/hooks/useRandomInterval";
import { random } from "@/utils";

const DEFAULT_COLOR = "#F59F0A";
const generateSparkle = (color: string) => {
  return {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    color,
    size: random(12, 30),
    style: {
      top: `${random(0, 2) === 1 ? random(-5, 12) : random(70, 80)}%`,
      left: `${random(-8, 90)}%`,
      zIndex: random(1, 3),
    },
  };
};

type SparklesProps = {
  readonly children: React.ReactNode;
  readonly color?: string;
};

export const Sparkles = memo<SparklesProps>(
  ({ color = DEFAULT_COLOR, children }) => {
    const [sparkles, setSparkles] = useState(() => {
      return Array.from({ length: 4 }).map(() => generateSparkle(color));
    });
    const prefersReducedMotion = usePrefersReducedMotion();
    useRandomInterval(
      () => {
        const sparkle = generateSparkle(color);
        const now = Date.now();
        const nextSparkles = sparkles.filter((sp) => {
          const delta = now - sp.createdAt;
          return delta < 750;
        });
        nextSparkles.push(sparkle);
        setSparkles(nextSparkles);
      },
      prefersReducedMotion ? null : 200,
      prefersReducedMotion ? null : 700,
    );

    return (
      <span className="relative inline-block">
        {sparkles.map((sparkle) => (
          <Sparkle
            key={sparkle.id}
            color={sparkle.color}
            size={sparkle.size}
            style={sparkle.style}
          />
        ))}
        <strong className="relative font-bold">{children}</strong>
      </span>
    );
  },
);

Sparkles.displayName = "Sparkles";

type SparkleProps = {
  readonly size: number;
  readonly color: string;
  readonly style?: React.CSSProperties;
};

const Sparkle = memo<SparkleProps>(({ size, color, style }) => {
  const path =
    "M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z";

  return (
    <span
      className="absolute block motion-safe:animate-come-in-out"
      style={{
        ...style,
        width: size + "%",
      }}
    >
      <svg
        viewBox="0 0 68 68"
        fill="none"
        className="block h-full w-full motion-safe:animate-half-spin"
      >
        <path d={path} fill={color} />
      </svg>
    </span>
  );
});

Sparkle.displayName = "Sparkle";
