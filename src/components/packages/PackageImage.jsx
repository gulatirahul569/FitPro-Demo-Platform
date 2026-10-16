import { Dumbbell } from "lucide-react";

// Pexels serves the full original unless you ask for a smaller one.
function optimize(src, width) {
  if (!src || !src.includes("images.pexels.com")) return src;
  const base = src.split("?")[0];
  return `${base}?auto=compress&cs=tinysrgb&w=${width}`;
}

export default function PackageImage({
  src,
  alt,
  className = "",
  width = 800,
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
    <img
      src={optimize(src, width)}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={`object-cover ${className}`}
    />
  );
}