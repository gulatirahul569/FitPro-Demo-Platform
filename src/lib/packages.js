// All package content lives here. Prices are PLACEHOLDERS until the client confirms them.
export const DEMO_PACKAGES = [
  {
    slug: "yoga-demo",
    name: "Yoga Demo",
    description: "Experience our training style with a 1 session demo.",
    level: "All Levels",
    format: "At Home",
    price: 399,
    sessions: "1 Session",
    image: "https://images.pexels.com/photos/29490926/pexels-photo-29490926.jpeg",
  },
  {
    slug: "strength-demo",
    name: "Strength Demo",
    description: "Try our strength training with a 1 session demo.",
    level: "All Levels",
    format: "At Home",
    price: 499,
    sessions: "1 Session",
    image: "https://images.pexels.com/photos/38011352/pexels-photo-38011352.jpeg",
  },
  {
    slug: "personal-training-demo",
    name: "Personal Training Demo",
    description: "Get a feel of 1-on-1 coaching with our trainer.",
    level: "All Levels",
    format: "At Home",
    price: 599,
    sessions: "1 Session",
    image: "https://images.pexels.com/photos/40211337/pexels-photo-40211337.jpeg",
  },
  {
    slug: "weight-loss-demo",
    name: "Weight Loss Demo",
    description: "Try a fat-burning session built around your goals.",
    level: "All Levels",
    format: "At Home",
    price: 499,
    sessions: "1 Session",
    image: "https://images.pexels.com/photos/6455784/pexels-photo-6455784.jpeg",
  },
];

export const MAIN_PACKAGES = [
  {
    slug: "yoga",
    name: "Yoga",
    description: "Build flexibility, balance and calm with guided yoga.",
    level: "All Levels",
    format: "At Home",
    benefits: ["Diet guidance", "Improves flexibility", "Reduces stress"],
    price: 10000,
    sessions: "8 Sessions",
    image: "https://images.pexels.com/photos/8939959/pexels-photo-8939959.jpeg",
  },
  {
    slug: "personal-training",
    name: "Personal Training",
    description: "One-on-one coaching built around your goals.",
    level: "1-on-1 Training",
    format: "At Home",
    benefits: ["Diet guidance", "Custom workout plan", "Progress focus"],
    price: 12000,
    sessions: "8 Sessions",
    image: "https://images.pexels.com/photos/6922177/pexels-photo-6922177.jpeg",
  },
  {
    slug: "strength-conditioning",
    name: "Strength & Conditioning",
    description: "Build strength and performance with structured training.",
    level: "Build Strength",
    format: "At Home",
    benefits: ["Diet guidance", "Performance focus", "Structured progression"],
    price: 12000,
    sessions: "8 Sessions",
    image: "https://images.pexels.com/photos/14623747/pexels-photo-14623747.jpeg",
  },
  {
    slug: "weight-loss",
    name: "Weight Loss",
    description: "A structured program to lose weight and keep it off.",
    level: "All Levels",
    format: "At Home",
    benefits: ["Diet guidance", "Fat-burn workouts", "Weekly progress check"],
    price: 12000,
    sessions: "8 Sessions",
    image: "https://images.pexels.com/photos/6551078/pexels-photo-6551078.jpeg",
  },
];

export const formatPrice = (amount) =>
  `₹${new Intl.NumberFormat("en-IN").format(amount)}`;

// Banner images for the Packages page
export const PACKAGES_BANNER_IMAGE =
  "https://images.pexels.com/photos/15373906/pexels-photo-15373906.jpeg";
export const PACKAGES_BANNER_IMAGE_MOBILE =
  "https://images.pexels.com/photos/4401815/pexels-photo-4401815.jpeg";

// Bottom "Stronger. Healthier. Happier." banner. Leave "" for a plain dark one.
export const PACKAGES_CTA_IMAGE = "https://images.pexels.com/photos/32695898/pexels-photo-32695898.jpeg";