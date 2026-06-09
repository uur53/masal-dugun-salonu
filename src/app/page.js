import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-white to-purple-200 p-6 relative overflow-hidden">
      {/* Dekoratif arka plan */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-40 animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-40 animate-pulse" />
      </div>
      <header className="mb-14 text-center z-10">
        <h1 className="text-6xl font-extrabold text-pink-700 mb-4 drop-shadow-2xl tracking-tight flex items-center justify-center gap-4 animate-fade-in">
          <svg xmlns='http://www.w3.org/2000/svg' className='w-14 h-14 text-purple-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' /></svg>
          Masal Düğün Salonu
        </h1>
        <p className="text-2xl text-gray-700 max-w-2xl mx-auto font-medium animate-fade-in-slow">
          Hayalinizdeki düğün için en güzel salon, en iyi hizmet!<br />
          Randevu alın, salonlarımızı keşfedin, unutulmaz anlar yaşayın.
        </p>
      </header>
      <section className="flex flex-col md:flex-row gap-12 w-full max-w-5xl justify-center items-center z-10">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-12 flex-1 text-center border-4 border-transparent hover:border-pink-300 hover:shadow-pink-200 transition-all duration-300 group relative overflow-hidden min-w-[320px] max-w-[420px]">
          <div className="flex justify-center mb-4">
            <svg xmlns='http://www.w3.org/2000/svg' className='w-16 h-16 text-pink-400 group-hover:scale-110 transition-transform' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 17v-2a4 4 0 014-4h6m-6 0V7a4 4 0 00-4-4H5a4 4 0 00-4 4v10a4 4 0 004 4h6a4 4 0 004-4v-2' /></svg>
          </div>
          <h2 className="text-3xl font-bold text-pink-600 mb-3">Salonumuz</h2>
          <p className="text-lg text-gray-600 mb-6">Salonumuzun detaylarını inceleyin.</p>
          <Link
            href="/halls"
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-3 rounded-full font-bold shadow-lg transition inline-block text-lg tracking-wide"
          >
            Salonu Gör
          </Link>
        </div>
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-12 flex-1 text-center border-4 border-transparent hover:border-purple-300 hover:shadow-purple-200 transition-all duration-300 group relative overflow-hidden min-w-[320px] max-w-[420px]">
          <div className="flex justify-center mb-4">
            <svg xmlns='http://www.w3.org/2000/svg' className='w-16 h-16 text-purple-400 group-hover:scale-110 transition-transform' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 7v7m0 0h4m-4 0H8' /></svg>
          </div>
          <h2 className="text-3xl font-bold text-purple-600 mb-3">Randevu Al</h2>
          <p className="text-lg text-gray-600 mb-6">Düğün tarihiniz için kolayca randevu oluşturun.</p>
          <Link
            href="/reservation"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full font-bold shadow-lg transition inline-block text-lg tracking-wide"
          >
            Rezervasyon Ol
          </Link>
        </div>
      </section>
      <footer className="mt-20 text-gray-500 text-base z-10">
        © {new Date().getFullYear()} Masal Düğün Salonu
      </footer>
    </div>
  );
}
