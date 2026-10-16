"use client";


import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Heart,
  MapPin,
  Star,
} from "lucide-react";


export default function TrainerCard({ trainer }) {
  const [isFavorite, setIsFavorite] = useState(false);


  const handleFavoriteClick = (event) => {
    event.preventDefault();
    event.stopPropagation();


    setIsFavorite((previous) => !previous);
  };


  const hasReviews =
    trainer.reviewCount !== undefined &&
    trainer.reviewCount !== null &&
    trainer.reviewCount > 0;


  const locationText = trainer.location || trainer.gymName;


  return (
    <Link
      href={`/trainers/${trainer.id}`}
      className="group block h-full overflow-hidden rounded-3xl border border-white/10 bg-[#0f1a2b] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative h-64 w-full overflow-hidden bg-[#070d17]">
        {trainer.photo ? (
          <img
            src={trainer.photo}
            alt={trainer.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-white/5 text-5xl font-black text-white/30">
            {trainer.name?.charAt(0)?.toUpperCase()}
          </div>
        )}


        {/* Image gradient */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#070d17] via-[#070d17]/30 to-transparent" />


        {/* Category badge */}
        {trainer.category && (
          <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-[#070d17]/60 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
            {trainer.category.replace(/-/g, " ")}
          </span>
        )}


        {/* Favorite button */}
        <button
          type="button"
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className={`absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-300 ${
            isFavorite
              ? "border-red-400/40 bg-red-500/20 text-red-400"
              : "border-white/20 bg-[#070d17]/60 text-white/80 hover:bg-white/10 hover:text-white"
          }`}
        >
          <Heart
            size={16}
            className={isFavorite ? "fill-red-400" : ""}
          />
        </button>


        {/* Name and location */}
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <div className="flex items-center gap-1.5">
            <h3 className="line-clamp-1 text-xl font-black leading-tight">
              {trainer.name}
            </h3>


            {trainer.isVerified && (
              <BadgeCheck size={19} className="shrink-0 text-white" />
            )}
          </div>


          {locationText && (
            <p className="mt-1 flex items-center gap-1.5 text-sm text-white/75">
              <MapPin size={14} />
              <span className="line-clamp-1">{locationText}</span>
            </p>
          )}
        </div>
      </div>


      {/* Details */}
      <div className="flex h-[230px] flex-col p-5">
        {/* Rating */}
        <div className="flex items-center gap-1.5 text-sm">
          <Star size={16} className="fill-yellow-400 text-yellow-400" />


          {hasReviews ? (
            <>
              <span className="font-bold text-white">
                {Number(trainer.rating || 0).toFixed(1)}
              </span>


              <span className="text-white/50">
                ({trainer.reviewCount} review
                {trainer.reviewCount !== 1 ? "s" : ""})
              </span>
            </>
          ) : (
            <span className="font-bold text-white">New trainer</span>
          )}
        </div>


        {/* Specialization */}
        <p className="mt-3 line-clamp-1 text-sm font-medium text-white/65">
          {trainer.specialization || "Personal fitness trainer"}
          {trainer.experience ? ` · ${trainer.experience}` : ""}
        </p>


        {/* Description */}
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/55">
          {trainer.description ||
            "Personalized training to help you stay consistent and reach your goals."}
        </p>


        {/* Price and CTA */}
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/10 pt-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">
              Starting from
            </p>


            <p className="mt-1 text-lg font-black text-white">
              ₹{trainer.price}
              <span className="ml-1 text-xs font-medium text-white/50">
                /month
              </span>
            </p>
          </div>


          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/5 px-4 py-2 text-xs font-bold text-white transition-all duration-300 group-hover:bg-white group-hover:text-black">
            Learn More


            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </div>


        {trainer.firstSessionFree && (
          <p className="mt-3 text-xs font-semibold text-red-400">
            First session free
          </p>
        )}
      </div>
    </Link>
  );
}