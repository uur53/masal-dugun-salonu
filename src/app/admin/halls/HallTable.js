"use client";
import React from "react";

export default function HallTable({ halls, onDelete, onEdit }) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-left border-collapse mb-6 rounded-2xl shadow-lg bg-gradient-to-br from-purple-50 via-pink-50 to-white">
        <thead>
          <tr className="bg-gradient-to-r from-pink-200 to-purple-200 text-purple-800">
            <th className="p-4 text-center">ID</th>
            <th className="p-4 text-center">Ad</th>
            <th className="p-4 text-center">Kapasite</th>
            <th className="p-4 text-center">Açıklama</th>
            <th className="p-4 text-center">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {halls.map((h) => (
            <tr key={h.id} className="border-b last:border-b-0 hover:bg-pink-100 transition group">
              <td className="p-4 text-center font-semibold text-purple-700">{h.id}</td>
              <td className="p-4 text-center font-semibold text-pink-700 group-hover:text-purple-700">{h.name}</td>
              <td className="p-4 text-center text-gray-700">{h.capacity}</td>
              <td className="p-4 text-center text-gray-700">{h.description}</td>
              <td className="p-4 flex flex-wrap gap-2 justify-center items-center">
                <button onClick={() => onEdit(h)} className="px-4 py-2 bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-xl font-bold shadow hover:scale-105 hover:shadow-xl transition flex items-center gap-2">
                  <svg xmlns='http://www.w3.org/2000/svg' className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' /></svg>
                  Düzenle
                </button>
                <button onClick={() => onDelete(h.id)} className="px-4 py-2 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-xl font-bold shadow hover:scale-105 hover:shadow-xl transition flex items-center gap-2">
                  <svg xmlns='http://www.w3.org/2000/svg' className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' /></svg>
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
