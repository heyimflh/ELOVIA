'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Clock, ArrowUpRight, User, Sparkles, BookOpen, X, Share2, CheckCircle2 } from 'lucide-react';

export interface EducationalArticle {
  id: string;
  image: string;
  category: string;
  categoryPillColor: 'emerald' | 'amber' | 'blue' | 'teal';
  readTime: string;
  dateAndAuthor: string;
  title: string;
  excerpt: string;
  fullContent?: string[];
}

export const EDUCATIONAL_ARTICLES: EducationalArticle[] = [
  {
    id: 'panduan-presisi-pet',
    image: '/images/edukasi/panduan presisi.jpg',
    category: 'Panduan Pemilahan',
    categoryPillColor: 'emerald',
    readTime: '3 min',
    dateAndAuthor: '10 Nov 2026 • Tim Sains Material ELOVIA',
    title: 'Panduan Presisi: Mengapa Label & Tutup Botol PET Harus Dipisah?',
    excerpt:
      'Kerapatan jenis plastik yang berbeda membuat tutup botol (HDPE) mengapung dan badan botol (PET) tenggelam saat proses daur ulang air pabrik.',
    fullContent: [
      'Banyak orang mengira seluruh botol air mineral dibuat dari satu jenis plastik yang sama. Faktanya, badan botol terbuat dari Polyethylene Terephthalate (PET, kode 1), sedangkan tutupnya biasanya Polypropylene (PP, kode 5) atau High-Density Polyethylene (HDPE, kode 2).',
      'Saat botol dicacah di fasilitas daur ulang, serpihan plastik dimasukkan ke dalam kolam pemisahan air (float-sink tank). PET memiliki massa jenis lebih berat daripada air (sekitar 1,38 g/cm³), sehingga serpihan PET akan tenggelam ke dasar.',
      'Sebaliknya, tutup botol HDPE dan PP memiliki massa jenis lebih ringan dari air (< 0,96 g/cm³), sehingga mengapung di permukaan air. Dengan melepas tutup dan cincin segel sejak dari rumah, Anda menghemat 20% biaya pembersihan dan meningkatkan harga jual material Anda di ELOVIA.',
    ],
  },
  {
    id: 'metode-keranjang-takakura',
    image: '/images/edukasi/Metode Keranjang Takakura.jpg',
    category: 'Kompos & Organik',
    categoryPillColor: 'amber',
    readTime: '4 min',
    dateAndAuthor: '8 Nov 2026 • dr. Andini Saraswati',
    title: 'Metode Keranjang Takakura: Kompos Dapur Tanpa Belatung & Bau',
    excerpt:
      'Teknologi fermentasi bantal sekam asal Jepang ini membuktikan bahwa mengolah 1 kg sampah organik setiap hari bisa dilakukan di sudut dapur.',
    fullContent: [
      'Sampah organik menyumbang lebih dari 55% timbulan sampah nasional. Saat membusuk secara anaerob di TPA tanpa oksigen, sampah organik menghasilkan gas metana yang 28 kali lebih merusak atmosfer dibanding karbon dioksida.',
      'Keranjang Takakura menggunakan biakan mikroorganisme pengurai lokal dalam medium bantal sekam berongga. Aliran udara konstan menjaga kondisi aerobik, sehingga pembusukan berlangsung cepat tanpa bau menyengat.',
      'Cukup potong kecil sisa sayur dan kulit buah, kubur ke dalam medium fermentasi, dan dalam 2-3 minggu Anda akan memperoleh pupuk kompos matang kaya hara untuk tanaman hias dan sayur pot.',
    ],
  },
  {
    id: 'anatomi-b3-safety',
    image: '/images/edukasi/anatomi B3.jpg',
    category: 'Regulasi & Standar',
    categoryPillColor: 'blue',
    readTime: '3 min',
    dateAndAuthor: '5 Nov 2026 • Ir. Dimas Wicaksono',
    title: 'Anatomi B3: Jangan Campur Baterai Lithium dan Lampu Neon',
    excerpt:
      'Kandungan timbal, merkuri, dan kobalt pada baterai bekas dapat mencemari air tanah hingga ribuan liter jika dibuang ke tempat sampah biasa.',
    fullContent: [
      'Bahan Berbahaya dan Beracun (B3) rumah tangga seringkali berakhir di tempat sampah umum karena minimnya tempat penampungan sementara khusus. Baterai lithium-ion yang terhimpit di truk sampah berisiko menimbulkan percikan api dan kebakaran spontan.',
      'Langkah paling bijak adalah menyiapkan satu toples kaca kering khusus berlabel "B3 Rumah Tangga". Tempelkan selotip transparan pada kutub positif dan negatif baterai bekas untuk mencegah hubungan pendek arus listrik.',
      'Melalui ELOVIA, Anda dapat menyerahkan tabungan B3 ini langsung ke drop-point mitra bersertifikasi Kementerian Lingkungan Hidup untuk dinetralisir dengan protokol zero-leach.',
    ],
  },
  {
    id: 'tekstil-sirkular-fashion',
    image: '/images/edukasi/Tekstil Sirkular.jpg',
    category: 'Ekonomi Sirkular',
    categoryPillColor: 'teal',
    readTime: '5 min',
    dateAndAuthor: '2 Nov 2026 • Kania Prameswari',
    title: 'Tekstil Sirkular: Dari Serat Botol Daur Ulang ke Busana Tahan Lama',
    excerpt:
      'Industri fesyen global mulai beralih ke rPET (recycled polyester). Bagaimana pakaian ramah lingkungan diproduksi tanpa mengorbankan estetika?',
    fullContent: [
      'Pembuatan polyester murni baru membutuhkan pengeboran minyak bumi fosil dan energi pemanasan beremisi tinggi. rPET (recycled PET) memotong konsumsi energi hingga 65% dan emisi gas rumah kaca sebesar 50%.',
      'Benang filamen dari cacahan botol plastik dipintal dengan teknologi nano-twist menghasilkan tekstil yang sejuk di kulit, cepat kering, dan sangat elastis untuk pakaian olahraga maupun jaket outdoor.',
      'Di ELOVIA Circular Academy, kami memetakan siklus pakaian tertutup di mana baju lama yang sudah aus dapat ditarik kembali untuk didaur ulang menjadi benang isolator termal.',
    ],
  },
  {
    id: '10-trik-belanja-minim-sampah',
    image: '/images/edukasi/10 Trik Belanja Minim Sampah.jpg',
    category: 'Zero Waste',
    categoryPillColor: 'emerald',
    readTime: '4 min',
    dateAndAuthor: '28 Okt 2026 • Maya Hapsari',
    title: '10 Trik Belanja Minim Sampah di Pasar Tradisional & Supermarket',
    excerpt:
      'Kantung jaring kain, wadah kedap udara, dan daftar belanja terencana adalah senjata ampuh menghindari belasan kantong kresek sekali pakai.',
    fullContent: [
      'Memulai gaya hidup minim sampah bukan berarti harus membeli perlengkapan serba baru yang mahal. Kuncinya adalah memanfaatkan apa yang sudah ada di rumah kita.',
      'Selalu simpan 3 kantong belanja lipat di tas atau kendaraan Anda. Gunakan toples kaca bekas selai untuk membeli rempah atau biji-bijian curah.',
      'Saat di pasar tradisional, tawarkan wadah makan sendiri saat membeli daging, ikan, atau tahu tempe. Sebagian besar pedagang lokal justru menyambut positif inisiatif pengurangan plastik.',
    ],
  },
  {
    id: 'mengenal-kasta-kardus',
    image: '/images/edukasi/Mengenal Kasta Kardus.jpg',
    category: 'Panduan Pemilahan',
    categoryPillColor: 'amber',
    readTime: '3 min',
    dateAndAuthor: '24 Okt 2026 • Tim Sains Material ELOVIA',
    title: 'Mengenal Kasta Kardus: Mengapa Kardus Cokelat Lebih Mahal dari Dus Kemasan?',
    excerpt:
      'Serat selulosa panjang pada kardus bergelombang (corrugated) dapat didaur ulang hingga 7 kali putaran, menjadikannya primadona di pabrik daur ulang.',
    fullContent: [
      'Bagi para pegiat bank sampah dan pabrik daur ulang kertas, kardus memiliki kasta harga yang jelas. Kardus cokelat tebal dengan lapisan gelombang di tengahnya (corrugated box) adalah jenis kertas dengan nilai per kilo tertinggi.',
      'Sebaliknya, kertas karton duplex seperti kotak sereal atau dus obat dengan bagian belakang abu-abu memiliki serat pendek yang lebih rapuh dan lapisan lilin pelindung yang memerlukan pemisahan kimia tambahan.',
      'Tips sederhana: lipat rata kardus cokelat Anda, lepaskan sisa lakban cokelat tebal, dan jaga agar tetap kering. Kardus basah kehilangan nilai hingga 50% karena beban air semu dan jamur perusak serat.',
    ],
  },
];

// Framer motion container & card item stagger variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

// Pill styling helper based on category color
function getCategoryPillClasses(color: EducationalArticle['categoryPillColor']) {
  switch (color) {
    case 'emerald':
      return 'bg-emerald-50 text-emerald-800 border-emerald-200/80';
    case 'amber':
      return 'bg-amber-50 text-amber-900 border-amber-200/80';
    case 'blue':
      return 'bg-blue-50 text-blue-900 border-blue-200/80';
    case 'teal':
      return 'bg-teal-50 text-teal-900 border-teal-200/80';
    default:
      return 'bg-white/90 text-slate-800 border-white/60';
  }
}

export function EdukasiArticlesSection({
  onSelectArticle,
}: {
  onSelectArticle?: (article: EducationalArticle) => void;
}) {
  const [selectedArticle, setSelectedArticle] = useState<EducationalArticle | null>(null);

  const handleCardClick = (article: EducationalArticle) => {
    if (onSelectArticle) {
      onSelectArticle(article);
    } else {
      setSelectedArticle(article);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-20">
      {/* Section Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Sparkles size={13} className="text-emerald-700" />
            <span>Wawasan & Inspirasi</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight font-fraunces">
            Edukasi Terbaru & Panduan Praktis
          </h2>
        </div>
        <p className="text-slate-500 text-sm max-w-md leading-relaxed">
          Eksplorasi wawasan sirkular terkini yang dikurasi oleh para ahli sains material dan praktisi lingkungan ELOVIA.
        </p>
      </div>

      {/* Grid Layout (3 Columns on Desktop, Staggered Reveal) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {EDUCATIONAL_ARTICLES.map((card) => {
          const pillClasses = getCategoryPillClasses(card.categoryPillColor);

          return (
            <motion.article
              key={card.id}
              variants={cardVariants}
              onClick={() => handleCardClick(card)}
              className="bg-white/60 hover:bg-white/95 backdrop-blur-xl border border-white/80 hover:border-emerald-200 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-2xl hover:-translate-y-1.5 rounded-[2.2rem] overflow-hidden transition-all duration-500 group flex flex-col justify-between cursor-pointer h-full"
            >
              {/* Top Image Box */}
              <div className="relative w-full h-52 overflow-hidden bg-slate-100">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Image Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent pointer-events-none" />

                {/* Top Left Badge (Category) */}
                <span
                  className={`absolute top-4 left-4 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold shadow-xs border ${pillClasses}`}
                >
                  {card.category}
                </span>

                {/* Top Right Badge (Read Time) */}
                <span className="absolute top-4 right-4 bg-black/40 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 border border-white/20 shadow-xs">
                  <Clock size={12} className="text-emerald-400" />
                  <span>{card.readTime}</span>
                </span>
              </div>

              {/* Card Body (Content) */}
              <div className="p-6 md:p-7 flex-1 flex flex-col justify-between">
                <div>
                  {/* Meta Info */}
                  <div className="text-xs font-semibold text-slate-400 mb-3 flex items-center gap-2">
                    <User size={12} className="text-slate-400 shrink-0" />
                    <span>{card.dateAndAuthor}</span>
                  </div>

                  {/* Headline */}
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug mb-3 line-clamp-2">
                    {card.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-slate-600 text-xs md:text-sm line-clamp-3 leading-relaxed font-light mb-6">
                    {card.excerpt}
                  </p>
                </div>

                {/* Footer Link CTA */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600 group-hover:text-emerald-700">
                  <span>Baca Artikel Selengkapnya</span>
                  <ArrowUpRight
                    size={16}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                  />
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>

      {/* Internal Reading Modal (Self-contained if no parent callback is passed) */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl z-10 border border-slate-100 max-h-[90vh] flex flex-col"
            >
              {/* Header Cover Bar with Article Image */}
              <div className="relative h-60 w-full overflow-hidden">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-5 right-5 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors border border-white/20 shadow-md"
                  aria-label="Tutup artikel"
                >
                  <X size={18} />
                </button>

                <div className="absolute bottom-5 inset-x-6 text-white">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-2 border border-white/20">
                    <Clock size={12} />
                    <span>{selectedArticle.readTime}</span>
                    <span>•</span>
                    <span>{selectedArticle.category}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-fraunces leading-snug drop-shadow-md">
                    {selectedArticle.title}
                  </h3>
                  <div className="text-xs text-white/80 mt-1 flex items-center gap-1.5">
                    <User size={12} />
                    <span>{selectedArticle.dateAndAuthor}</span>
                  </div>
                </div>
              </div>

              {/* Scrollable Body Content */}
              <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed flex-1">
                {selectedArticle.fullContent?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                )) || <p>{selectedArticle.excerpt}</p>}

                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mt-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1 flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-emerald-600" /> Intisari Praktik ELOVIA
                  </h4>
                  <p className="text-xs text-emerald-950 leading-relaxed">
                    Penerapan konsisten pemilahan di rumah meningkatkan efisiensi daur ulang nasional hingga 40%. Salurkan material bersih terpilah Anda lewat ELOVIA untuk memperoleh imbalan rupiah dan sertifikat regenerasi karbon.
                  </p>
                </div>
              </div>

              {/* Footer Modal Actions */}
              <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: selectedArticle.title,
                        text: selectedArticle.excerpt,
                        url: window.location.href,
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Tautan disalin ke papan klip!');
                    }
                  }}
                  className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <Share2 size={16} />
                  <span>Bagikan Artikel</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
                  className="px-5 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-all"
                >
                  Selesai Membaca
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default EdukasiArticlesSection;
