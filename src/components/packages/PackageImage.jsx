import { Dumbbell } from "lucide-react";

// Shows the image if a link is set, otherwise a neutral placeholder
export default function PackageImage({ src, alt, className = "" }) {
  if (!src) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 text-black/20 ${className}`}
      >
        <Dumbbell size={40} />
      </div>
    );
  }

  return <img src={src} alt={alt} className={`object-cover ${className}`} />;
}