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
        image: "https://images.pexels.com/photos/3757937/pexels-photo-3757937.jpeg",
    },
    {
        slug: "strength-demo",
        name: "Strength Demo",
        description: "Try our strength training with a 1 session demo.",
        level: "All Levels",
        format: "At Home",
        price: 499,
        sessions: "1 Session",
        image: "https://images.pexels.com/photos/6827092/pexels-photo-6827092.jpeg",
    },
    {
        slug: "personal-training-demo",
        name: "Personal Training Demo",
        description: "Get a feel of 1-on-1 coaching with our trainer.",
        level: "All Levels",
        format: "At Home",
        price: 599,
        sessions: "1 Session",
        image: "https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg",
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
        image: "https://images.pexels.com/photos/3757937/pexels-photo-3757937.jpeg",
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
        image: "https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg",
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
        image: "https://images.pexels.com/photos/6827092/pexels-photo-6827092.jpeg",
    },
    ];

    export const formatPrice = (amount) =>
    `₹${new Intl.NumberFormat("en-IN").format(amount)}`;

export const PACKAGES_BANNER_IMAGE = "https://images.pexels.com/photos/7991616/pexels-photo-7991616.jpeg";
export const PACKAGES_BANNER_IMAGE_MOBILE = "https://images.pexels.com/photos/13993016/pexels-photo-13993016.jpeg";