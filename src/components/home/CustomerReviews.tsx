import React from "react";
import Image from "next/image";
import { CUSTOMER_REVIEWS_DATA } from "@/lib/data";
import { SectionHeading } from "../ui/SectionHeading";
import { Star, ShieldCheck } from "lucide-react";
import { BadgeChip } from "../ui/BadgeChip";

export function CustomerReviews() {
  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#101216] border-t border-gray-200 dark:border-white/10 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          tag="Verified Adventurers Speak"
          title="EXPEDITION STORIES & REVIEWS"
          subtitle="Read real experiences from travellers and riders who explored Northeast India with our 4x4 car convoys and motorcycle group tours."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CUSTOMER_REVIEWS_DATA.map((review) => (
            <div
              key={review.id}
              className="card-dark rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 text-left"
            >
              <div className="space-y-4">
                {/* Rating & Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <BadgeChip variant="red" size="sm">
                    {review.itemType === "vehicle" ? "4x4 Car Trip" : "Bike Expedition"}
                  </BadgeChip>
                </div>

                {/* Comment */}
                <p className="text-gray-700 dark:text-white/85 text-xs sm:text-sm leading-relaxed font-normal italic relative pl-4 border-l-2 border-brand-red">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-300 dark:border-white/20">
                    <Image
                      src={review.avatar}
                      alt={review.author}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-black font-display text-gray-900 dark:text-white uppercase">{review.author}</h4>
                    <span className="text-[11px] text-gray-500 dark:text-white/60 block">{review.location} • {review.date}</span>
                  </div>
                </div>

                {review.verified && (
                  <div className="flex items-center gap-1 text-[11px] text-emerald-500 dark:text-emerald-400 font-bold font-display uppercase tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Expedition</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
