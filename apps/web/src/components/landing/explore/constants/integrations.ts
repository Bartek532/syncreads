export const INTEGRATIONS = {
  kindle: {
    id: "kindle",
    name: "Kindle",
    icon: "/images/landing/explore/kindle/icon.png",
    description: "Best selling e-book reader in the world.",
    reviews: {
      rating: 4,
      total: 23,
      users: [
        {
          color: "bg-success-foreground",
          avatar: "/images/landing/explore/kindle/reviews/1.png",
        },
        {
          color: "bg-sky-foreground",
          avatar: "/images/landing/explore/kindle/reviews/2.png",
        },
        {
          color: "bg-warning-foreground",
          avatar: "/images/landing/explore/kindle/reviews/3.png",
        },
      ],
    },
  },
  remarkable: {
    id: "remarkable",
    name: "reMarkable",
    icon: "/images/landing/explore/remarkable/icon.png",
    description: "The most advanced paper tablet.",
    reviews: {
      rating: 5,
      total: 56,
      users: [
        {
          color: "bg-picked/40",
          avatar: "/images/landing/explore/remarkable/reviews/1.png",
        },
        {
          color: "bg-success-foreground",
          avatar: "/images/landing/explore/remarkable/reviews/2.png",
        },
        {
          color: "bg-warning-foreground",
          avatar: "/images/landing/explore/remarkable/reviews/3.png",
        },
        {
          color: "bg-sky-foreground",
          avatar: "/images/landing/explore/remarkable/reviews/4.png",
        },
      ],
    },
  },
  extension: {
    id: "extension",
    name: "Extension",
    icon: "/images/landing/explore/extension/icon.png",
    description: "Just click and sync - directly from your browser.",
  },
};

export type Integration = keyof typeof INTEGRATIONS;
