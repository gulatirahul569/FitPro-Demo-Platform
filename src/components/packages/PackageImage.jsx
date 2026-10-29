import Image from "next/image";
import { Dumbbell } from "lucide-react";

// Fills its nearest `relative` parent. Next.js resizes and compresses the image
// and serves only the size the screen needs, based on the `sizes` prop.
//
// Default `sizes` assumes the common layout on this site:
// half the screen on desktop (two-column sections), full width on mobile.
// Override it where the layout differs:
//   full-width hero      -> sizes="100vw"
//   4-column card grid   -> sizes="(min-width: 768px) 25vw, 50vw"
export default function PackageImage({
  src,
  alt,
  className = "",
  sizes = "(min-width: 768px) 50vw, 100vw",
  priority = false,
}) {
  if (!src) {
    return (
      <div
        className={`flex items-center justify-center bg-white/5 text-white/20 ${className}`}
      >
        <Dumbbell size={40} />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover ${className}`}
    />
  );
}