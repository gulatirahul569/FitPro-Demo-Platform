import Image from "next/image";
import { Dumbbell } from "lucide-react";

// Fills its nearest `relative` parent. Next.js resizes and compresses the image
// and serves only the size the screen needs, based on the `sizes` prop.
export default function PackageImage({
  src,
  alt,
  className = "",
  sizes = "100vw",
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