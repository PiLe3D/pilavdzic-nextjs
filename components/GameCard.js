'use client';

import Link from 'next/link';

export default function GameCard({ title, description, url, image }) {
  return (
    <Link 
      href={url}
      className="group bg-white rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.3),0_6px_10px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.5),0_8px_15px_rgba(0,0,0,0.3)] transform hover:-translate-y-4 transition-all duration-300 block"
    >
      {/* Image container */}
      <div className="h-48 w-full overflow-hidden bg-gradient-to-br from-purple-400 to-pink-400">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          {title}
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          {description}
        </p>
        <span className="inline-block px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-900 text-white rounded-full font-semibold group-hover:opacity-90 transition-opacity">
          Igraj sada →
        </span>
      </div>
    </Link>
  );
}