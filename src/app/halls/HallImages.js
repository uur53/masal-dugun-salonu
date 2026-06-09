"use client";
import Image from "next/image";

export default function HallImages({ images }) {
  if (!images || images.length === 0) return (
    <div className="w-[320px] h-[110px] bg-gray-200 rounded flex items-center justify-center text-gray-400">Görsel yok</div>
  );
  return (
    <div className="flex w-full gap-3">
      {images.map((img) => {
        const src = (img.url || "").trim();
        if (!src || !src.startsWith("/")) return null;
        return (
          <button
            key={img.id}
            type="button"
            onClick={() => window.open(src, "_blank")}
            className="focus:outline-none"
          >
            <Image
              src={src}
              alt="Salon görseli"
              width={160}
              height={110}
              style={{ aspectRatio: '16/10' }}
              className="rounded-xl object-cover shadow-lg transition-transform duration-300 hover:scale-110 z-10 border-2 border-white bg-gray-100 hover:ring-4 hover:ring-pink-200"
            />
          </button>
        );
      })}
    </div>
  );
}
