export type MaterialCategory = 'Kertas & Kardus' | 'Plastik' | 'Logam' | 'Kaca' | 'Minyak/Lainnya';

export interface PrepStep {
  stepNumber: number;
  title: string;
  action: string;
  description: string;
  tip: string;
  badge: string;
}

export interface CatalogMaterial {
  id: string;
  name: string;
  category: MaterialCategory;
  categoryCode: string;
  subCategory: string;
  tag: string;
  priceRange: string;
  minPrice: number;
  maxPrice: number;
  unit: string;
  trend: {
    direction: 'up' | 'down' | 'stable';
    text: string;
    percentage?: string;
  };
  co2ePerKg: number;
  description: string;
  image: string;
  iconName: string;
  specs: {
    minimumWeight: string;
    acceptanceStandard: string;
    typicalDemand: 'Sangat Tinggi' | 'Tinggi' | 'Sedang';
  };
  prepSteps: PrepStep[];
  dos: string[];
  donts: string[];
}

export interface BlacklistItem {
  id: string;
  title: string;
  subtitle: string;
  reason: string;
  consequence: string;
  properDisposal: string;
  iconName: string;
  badge: string;
}

export const CATALOG_CATEGORIES: { id: string; label: string; count: number }[] = [
  { id: 'all', label: 'Semua (12)', count: 12 },
  { id: 'Kertas & Kardus', label: 'Kertas & Kardus', count: 3 },
  { id: 'Plastik', label: 'Plastik', count: 4 },
  { id: 'Logam', label: 'Logam', count: 3 },
  { id: 'Kaca', label: 'Kaca', count: 1 },
  { id: 'Minyak/Lainnya', label: 'Minyak/Lainnya', count: 1 },
];

export const CATALOG_MATERIALS: CatalogMaterial[] = [
  {
    id: 'pet-clear',
    name: 'Plastik PET Bening (Botol Mineral)',
    category: 'Plastik',
    categoryCode: 'PET #1',
    subCategory: 'Botol Minuman Bening & Biru Muda',
    tag: 'Tinggi Permintaan',
    priceRange: 'Rp 2.500 - Rp 4.000 / kg',
    minPrice: 2500,
    maxPrice: 4000,
    unit: '/ kg',
    trend: {
      direction: 'up',
      text: '+5% Minggu ini',
      percentage: '+5%',
    },
    co2ePerKg: 1.5,
    description: 'Botol air mineral murni, botol jus bening transparan tanpa warna pekat. Paling diminati pabrik daur ulang tekstil & serat poliester.',
    image: '/images/materials/plastic.jpg',
    iconName: 'Wine',
    specs: {
      minimumWeight: '2 kg (sekitar 60-70 botol)',
      acceptanceStandard: 'Transparan/kebiruan jernih, kering, bebas sisa minyak atau sabun',
      typicalDemand: 'Sangat Tinggi',
    },
    prepSteps: [
      {
        stepNumber: 1,
        title: 'Buang Sisa Cairan',
        action: 'Kosongkan botol sampai tetes terakhir',
        description: 'Pastikan botol/kemasan benar-benar kosong dari sisa air minum, teh, kopi, atau minuman manis.',
        tip: 'Bilas cepat dengan sedikit air agar botol tidak mengundang semut dan tidak berjamur saat disimpan.',
        badge: 'Higienis & Kering',
      },
      {
        stepNumber: 2,
        title: 'Lepas Label & Tutup',
        action: 'Pisahkan tutup HDPE dan label plastik luar',
        description: 'Tutup botol menggunakan jenis plastik berbeda (#2 HDPE) yang berharga tersendiri. Buka juga cincin segel leher botol.',
        tip: 'Kumpulkan tutup botol dalam satu kantong terpisah karena harga jualnya per kilogram juga tinggi!',
        badge: 'Pemisahan Polimer',
      },
      {
        stepNumber: 3,
        title: 'Remukkan / Pipihkan',
        action: 'Remas botol dari bawah ke leher hingga pipih',
        description: 'Tekan atau pipihkan material untuk menghemat ruang penyimpanan hingga 75% saat dijemput armada mitra ELOVIA.',
        tip: 'Setelah dipipihkan, Anda bisa memasang kembali tutup botolnya agar udara tidak masuk dan botol tetap kempis.',
        badge: 'Hemat 75% Ruang',
      },
    ],
    dos: [
      'Bilas bersih jika sebelumnya berisi minuman manis atau susu',
      'Satukan tutup botol dalam kantong terpisah',
      'Pastikan tidak ada kerikil atau puntung rokok di dalamnya',
    ],
    donts: [
      'Jangan campur botol oli bekas atau botol pestisida',
      'Jangan isi botol dengan sampah puntung rokok/tisu',
      'Hindari botol yang sudah terkena cat semprot atau lem alteco',
    ],
  },
  {
    id: 'hdpe-opaque',
    name: 'Plastik HDPE Buram (Botol Shampo & Jerigen)',
    category: 'Plastik',
    categoryCode: 'HDPE #2',
    subCategory: 'Kemasan Sabun, Shampo & Jerigen',
    tag: 'Daur Ulang Tinggi',
    priceRange: 'Rp 3.000 - Rp 4.800 / kg',
    minPrice: 3000,
    maxPrice: 4800,
    unit: '/ kg',
    trend: {
      direction: 'up',
      text: '+2% Minggu ini',
      percentage: '+2%',
    },
    co2ePerKg: 1.4,
    description: 'Kemasan plastik tebal semi-kaku seperti botol deterjen, lotion, sabun cair, botol susu UHT putih, dan jerigen minyak.',
    image: '/images/materials/plastic.jpg',
    iconName: 'Droplets',
    specs: {
      minimumWeight: '1.5 kg',
      acceptanceStandard: 'Plastik buram/tebal tidak tembus pandang, bersih dari sisa cairan kental',
      typicalDemand: 'Tinggi',
    },
    prepSteps: [
      {
        stepNumber: 1,
        title: 'Buang Sisa Cairan',
        action: 'Bilas sisa sabun kental atau deterjen',
        description: 'Kocok kemasan dengan sedikit air hangat untuk mengangkat sisa sabun kental, shampo, atau cairan pemutih.',
        tip: 'Gunakan sisa air bilasan sabun untuk mencuci lantai garasi agar tidak ada sabun terbuang sia-sia.',
        badge: 'Bebas Kerak Sabun',
      },
      {
        stepNumber: 2,
        title: 'Lepas Label & Tutup',
        action: 'Cabut pompa dispenser berpegas logam',
        description: 'Pompa dispenser memiliki per pegas besi di dalamnya. Cabut pompa atau pisahkan tutup ulir.',
        tip: 'Badan botol murni HDPE memiliki nilai daur ulang lebih tinggi jika pompa berpegas sudah disisihkan.',
        badge: 'Bebas Pegas Logam',
      },
      {
        stepNumber: 3,
        title: 'Remukkan / Pipihkan',
        action: 'Injak atau pipihkan bagian badan jerigen',
        description: 'Jerigen dan botol HDPE tebal cukup kokoh; gunakan injakan kaki perlahan untuk memipihkannya agar rapi.',
        tip: 'Susun rapi bertumpuk dalam kardus agar pengemasan saat penjemputan sangat efisien.',
        badge: 'Kompak & Rapi',
      },
    ],
    dos: [
      'Keringkan setelah dibilas agar tidak berbau apek',
      'Tuliskan keterangan jenis jika label sudah dilepas',
      'Lepas dispenser pump yang mengandung pegas besi',
    ],
    donts: [
      'Jangan sertakan kemasan oli bermesin kotor',
      'Jangan sertakan wadah cairan asam keras B3',
      'Hindari botol yang sudah lapuk/rapuh terbakar panas',
    ],
  },
  {
    id: 'pp-cups',
    name: 'Gelas Plastik PP Bening (Cup Minuman)',
    category: 'Plastik',
    categoryCode: 'PP #5',
    subCategory: 'Cup Es Kopi, Es Boba & Mangkuk Salad',
    tag: 'Stabil',
    priceRange: 'Rp 1.800 - Rp 3.200 / kg',
    minPrice: 1800,
    maxPrice: 3200,
    unit: '/ kg',
    trend: {
      direction: 'stable',
      text: 'Stabil Minggu ini',
    },
    co2ePerKg: 1.25,
    description: 'Cup plastik transparan atau agak lentur dari minuman boba, kopi susu kekinian, atau wadah agar-agar dan puding.',
    image: '/images/materials/plastic.jpg',
    iconName: 'Coffee',
    specs: {
      minimumWeight: '1 kg (sekitar 100-120 cup)',
      acceptanceStandard: 'Bebas residu boba/es, plastik sealer bibir telah dikupas',
      typicalDemand: 'Tinggi',
    },
    prepSteps: [
      {
        stepNumber: 1,
        title: 'Buang Sisa Cairan',
        action: 'Keluarkan es, boba, dan sedotan residu',
        description: 'Tuang sisa es batu dan topping boba/jelly ke tempat sampah organik, lalu bilas cepat cup dengan air.',
        tip: 'Sedotan plastik kecil masuk ke residu; jangan campur di dalam cup.',
        badge: 'Bebas Gula & Boba',
      },
      {
        stepNumber: 2,
        title: 'Lepas Label & Tutup',
        action: 'Kupas plastik segel sealer di bibir cup',
        description: 'Lapisan lid sealer plastik tipis di bagian atas bibir cup sebaiknya dikupas bersih agar cup berstatus grade A.',
        tip: 'Jika ada stiker label pesanan kertas, kupas atau rendam sebentar dengan air untuk mencabutnya.',
        badge: 'Bibir Cup Bersih',
      },
      {
        stepNumber: 3,
        title: 'Remukkan / Pipihkan',
        action: 'Tumpuk bersarang satu sama lain',
        description: 'Karena bentuknya mangkuk konus, cukup tumpuk 20-30 cup secara vertikal ke atas menjadi satu silinder panjang.',
        tip: 'Cara ini jauh lebih rapi dan hemat ruang dibanding meremasnya secara sembarangan.',
        badge: 'Tumpukan Silinder Rapi',
      },
    ],
    dos: [
      'Tumpuk rapi satu arah seperti menara',
      'Pastikan cup kering sebelum ditumpuk agar tidak berlumut',
      'Pisahkan cup PP transparan dari cup berbahan busa',
    ],
    donts: [
      'Jangan sertakan sedotan plastik kotor di dalam cup',
      'Jangan tinggalkan sisa es batu yang mencair di wadah',
      'Jangan sertakan cup yang pecah berkeping tajam',
    ],
  },
  {
    id: 'ldpe-films',
    name: 'Plastik LDPE / Plastik Kresek Bersih',
    category: 'Plastik',
    categoryCode: 'LDPE #4',
    subCategory: 'Bubble Wrap & Kantong Belanja Bersih',
    tag: 'Harga Fleksibel',
    priceRange: 'Rp 800 - Rp 1.600 / kg',
    minPrice: 800,
    maxPrice: 1600,
    unit: '/ kg',
    trend: {
      direction: 'down',
      text: '-2% Minggu ini',
      percentage: '-2%',
    },
    co2ePerKg: 1.1,
    description: 'Bubble wrap pembungkus paket e-commerce, plastik bening kemasan produk, plastik roll shrink, dan kantong kresek putih bersih.',
    image: '/images/materials/plastic.jpg',
    iconName: 'Package',
    specs: {
      minimumWeight: '2 kg (volume besar)',
      acceptanceStandard: 'Kering, bebas minyak masakan, lakban tebal telah dipotong',
      typicalDemand: 'Sedang',
    },
    prepSteps: [
      {
        stepNumber: 1,
        title: 'Buang Sisa Cairan',
        action: 'Pastikan 100% kering dari tetesan air',
        description: 'Plastik film yang lembap rawan menimbulkan jamur dan menurunkan kualitas daur ulang pellet biji plastik.',
        tip: 'Jemur sebentar jika bubble wrap terkena rintik hujan saat pengiriman paket.',
        badge: 'Bebas Kelembapan',
      },
      {
        stepNumber: 2,
        title: 'Lepas Label & Tutup',
        action: 'Gunting lakban cokelat & stiker resi thermal',
        description: 'Kertas resi pengiriman ekspedisi dan selotip tebal memiliki lem sintetis yang mengotori mesin daur ulang.',
        tip: 'Gunting bagian yang ada stiker resinya, buang ke residu, dan simpan bagian plastik murni yang bersih.',
        badge: 'Bebas Resi & Lakban',
      },
      {
        stepNumber: 3,
        title: 'Remukkan / Pipihkan',
        action: 'Lipat padat & masukkan ke satu karung',
        description: 'Karena plastiknya ringan bervolume besar, padatkan seluruh plastik kresek/bubble ke dalam satu wadah kantong padat.',
        tip: 'Injak tumpukan kresek dalam karung agar massa jenisnya padat dan timbangan stabil.',
        badge: 'Padatkan Maksimal',
      },
    ],
    dos: [
      'Kumpulkan bubble wrap dalam jumlah banyak sebelum setor',
      'Kelompokkan warna bening/putih terpisah dari kresek warna-warni',
      'Potong stiker alamat ekspedisi dengan gunting',
    ],
    donts: [
      'Jangan masukkan plastik kresek bekas sampah dapur basah',
      'Jangan masukkan plastik sachet aluminium foil (kopi/snack)',
      'Jangan sertakan plastik yang terkena lumuran minyak goreng',
    ],
  },
  {
    id: 'box-corrugated',
    name: 'Kardus Box Corrugated (Kraft)',
    category: 'Kertas & Kardus',
    categoryCode: 'PAP 20',
    subCategory: 'Boks Ekspedisi & Kemasan Karton Tebal',
    tag: 'Favorit Pengepul',
    priceRange: 'Rp 1.800 - Rp 2.800 / kg',
    minPrice: 1800,
    maxPrice: 2800,
    unit: '/ kg',
    trend: {
      direction: 'up',
      text: '+3% Minggu ini',
      percentage: '+3%',
    },
    co2ePerKg: 0.65,
    description: 'Boks kardus cokelat bergelombang (corrugated) bekas paket ekspedisi, kardus mi instan, boks kulkas, dan karton tebal belanjaan.',
    image: '/images/materials/paper_cardboard.jpg',
    iconName: 'Box',
    specs: {
      minimumWeight: '5 kg',
      acceptanceStandard: 'Kering 100%, kaku tidak lembek, lakban luar dikupas minimal 80%',
      typicalDemand: 'Sangat Tinggi',
    },
    prepSteps: [
      {
        stepNumber: 1,
        title: 'Buang Sisa Cairan',
        action: 'Jauhkan dari air dan minyak makanan',
        description: 'Kardus yang terkena air akan ditolak atau dipotong timbangannya hingga 50% karena kandungan air palsu.',
        tip: 'Simpan selalu di dalam ruangan kering dengan alas palet kayu atau terpal plastik.',
        badge: 'Kering 100%',
      },
      {
        stepNumber: 2,
        title: 'Lepas Label & Tutup',
        action: 'Kupas lakban plastik & resi pengiriman',
        description: 'Tarik lakban bening/cokelat yang merekatkan sambungan boks. Cabut juga staples kawat besar jika ada di karton impor.',
        tip: 'Kardus yang bersih dari lakban mendapat grade harga tertinggi dari mitra agregator.',
        badge: 'Bebas Lakban OPP',
      },
      {
        stepNumber: 3,
        title: 'Remukkan / Pipihkan',
        action: 'Buka lipatan bawah & injak hingga rata',
        description: 'Bongkar sudut bawah kardus hingga menjadi lembaran lembaran datar, tumpuk seragam, lalu ikat tali rafia silang.',
        tip: 'Satu ikat 10-15 kg kardus pipih sangat mudah diangkut motor kurir roda dua ELOVIA.',
        badge: 'Ikat Rafia Silang',
      },
    ],
    dos: [
      'Lipat rata seluruh boks kardus hingga datar',
      'Ikat kuat menggunakan tali rafia agar mudah ditimbang',
      'Pastikan lapisan gelombang tengah masih kaku dan kokoh',
    ],
    donts: [
      'Jangan siram air untuk menambah berat timbangan (pelanggaran mitra)',
      'Jangan campur kardus yang berminyak kuah martabak/pizza',
      'Jangan tinggalkan styrofoam atau bubble wrap di dalam boks',
    ],
  },
  {
    id: 'hvs-office',
    name: 'Kertas Putih HVS & Dokumen Kantor',
    category: 'Kertas & Kardus',
    categoryCode: 'PAP 22',
    subCategory: 'Arsip Dokumen, Kertas A4 & Buku Tulis',
    tag: 'Kualitas Tinggi',
    priceRange: 'Rp 2.000 - Rp 3.200 / kg',
    minPrice: 2000,
    maxPrice: 3200,
    unit: '/ kg',
    trend: {
      direction: 'stable',
      text: 'Stabil Minggu ini',
    },
    co2ePerKg: 0.95,
    description: 'Kertas cetak HVS putih A4/F4 kantor, dokumen skripsi lama, buku catatan polos, dan kertas invoice tanpa lapisan lilin.',
    image: '/images/materials/paper_cardboard.jpg',
    iconName: 'FileText',
    specs: {
      minimumWeight: '5 kg',
      acceptanceStandard: 'Kertas putih bersih, staples besi dilepas, tanpa jilid mika plastik',
      typicalDemand: 'Tinggi',
    },
    prepSteps: [
      {
        stepNumber: 1,
        title: 'Buang Sisa Cairan',
        action: 'Jaga kertas tetap bersih & bebas noda kotor',
        description: 'Kertas HVS putih sensitif terhadap kelembapan dan noda noda kopi. Pastikan disimpan di lemari atau kotak tertutup.',
        tip: 'Kertas yang bebas jamur bintik cokelat memiliki serat pulp terkuat saat didaur ulang.',
        badge: 'Serat Pulp Grade A',
      },
      {
        stepNumber: 2,
        title: 'Lepas Label & Tutup',
        action: 'Cabut paperclip, staples & sampul plastik mika',
        description: 'Lepaskan staples kawat baja, klip kertas logam, dan sampul jilid plastik mika spiral yang membungkus laporan.',
        tip: 'Staples kecil dapat merusak pisau mesin bubur kertas pabrik daur ulang.',
        badge: 'Bebas Logam & Mika',
      },
      {
        stepNumber: 3,
        title: 'Remukkan / Pipihkan',
        action: 'Susun lembaran bertumpuk rapi',
        description: 'Jangan remas kertas menjadi bola! Kertas HVS justru harus disusun rata rapi dalam lembaran bertumpuk.',
        tip: 'Kertas yang disusun rapi memiliki densitas tinggi sehingga berat timbangan lebih mantap.',
        badge: 'Tumpuk Lembaran Rata',
      },
    ],
    dos: [
      'Susun rapi lembaran kertas dalam boks kardus atau ikat rafia',
      'Boleh kertas yang ada cetakan tinta printer hitam putih',
      'Simpan dokumen arsip rahasia dalam kondisi tercacah (shredded) jika perlu',
    ],
    donts: [
      'Jangan sertakan kertas struk belanja thermal (beracun)',
      'Jangan sertakan kertas karbon biru/hitam',
      'Hindari kertas berlaminasi plastik glossy mengkilap',
    ],
  },
  {
    id: 'newsprint',
    name: 'Koran & Tabloid Lama',
    category: 'Kertas & Kardus',
    categoryCode: 'PAP 23',
    subCategory: 'Surat Kabar Harian & Buletin Monokrom',
    tag: 'Klasik Sirkular',
    priceRange: 'Rp 1.200 - Rp 1.900 / kg',
    minPrice: 1200,
    maxPrice: 1900,
    unit: '/ kg',
    trend: {
      direction: 'down',
      text: '-1% Minggu ini',
      percentage: '-1%',
    },
    co2ePerKg: 0.6,
    description: 'Koran cetak harian, tabloid berita, buletin komunitas kertas buram monokrom non-glossy yang siap didaur ulang jadi karton telur.',
    image: '/images/materials/paper_cardboard.jpg',
    iconName: 'Newspaper',
    specs: {
      minimumWeight: '5 kg',
      acceptanceStandard: 'Koran kertas buram, tidak basah berjamur, tanpa sisipan brosur plastik',
      typicalDemand: 'Sedang',
    },
    prepSteps: [
      {
        stepNumber: 1,
        title: 'Buang Sisa Cairan',
        action: 'Pastikan koran kering dan tidak berdebu',
        description: 'Koran yang basah akan cepat rapuh hancur dan menimbulkan bau asam yang menurunkan penerimaan mitra.',
        tip: 'Letakkan bungkusan koran di atas lantai beralas kardus, jangan langsung menyentuh lantai dingin.',
        badge: 'Kering Bebas Lembap',
      },
      {
        stepNumber: 2,
        title: 'Lepas Label & Tutup',
        action: 'Keluarkan sisipan brosur majalah licin',
        description: 'Sering terdapat sisipan brosur iklan yang dilapisi plastik glossy licin. Sisihkan brosur tersebut dari lembaran koran.',
        tip: 'Koran murni tanpa lapisan lilin lebih cepat melunak di mesin pencacah.',
        badge: 'Bebas Brosur Glossy',
      },
      {
        stepNumber: 3,
        title: 'Remukkan / Pipihkan',
        action: 'Lipat dua dan ikat per bundel 5 kg',
        description: 'Lipat koran sesuai lipatan pabrikannya, tumpuk setinggi 20-30 cm, lalu ikat erat memakai tali rafia.',
        tip: 'Paket bundel padat memudahkan kurir menghitung berat saat timbangan portabel dikaitkan.',
        badge: 'Bundel 5 kg Padat',
      },
    ],
    dos: [
      'Lipat rapi sesuai lipatan asli koran',
      'Ikat kuat silang dengan tali rafia',
      'Kelompokkan koran sejenis dalam satu bundel',
    ],
    donts: [
      'Jangan campur koran yang sudah bernoda minyak goreng makanan',
      'Jangan gunakan koran untuk membungkus pecahan kaca tajam tanpa label',
      'Hindari koran yang sudah hancur lapuk termakan rayap',
    ],
  },
  {
    id: 'alu-cans',
    name: 'Kaleng Aluminium (Minuman Ringan)',
    category: 'Logam',
    categoryCode: 'ALU 41',
    subCategory: 'Kaleng Minuman Soda & Isotonik',
    tag: 'Nilai Ekonomi Tertinggi',
    priceRange: 'Rp 13.000 - Rp 18.000 / kg',
    minPrice: 13000,
    maxPrice: 18000,
    unit: '/ kg',
    trend: {
      direction: 'up',
      text: '+8% Minggu ini',
      percentage: '+8%',
    },
    co2ePerKg: 4.2,
    description: 'Kaleng aluminium non-magnetik bekas minuman bersoda, bir non-alkohol, larutan penyegar, dan kaleng kopi dingin.',
    image: '/images/materials/metal.jpg',
    iconName: 'Sparkles',
    specs: {
      minimumWeight: '1 kg (sekitar 60 kaleng pipih)',
      acceptanceStandard: '100% Aluminium (tidak menempel di magnet), bilas bersih sisa manis',
      typicalDemand: 'Sangat Tinggi',
    },
    prepSteps: [
      {
        stepNumber: 1,
        title: 'Buang Sisa Cairan',
        action: 'Bilas tuntas sisa cairan soda manis',
        description: 'Tumpahkan sisa soda manis atau bir, bilas dengan sedikit air mengalir agar tidak lengket dan tidak dikerubungi lalat.',
        tip: 'Kaleng bersih bebas bau dapat disimpan di dalam garasi rumah berbulan-bulan tanpa masalah.',
        badge: 'Bilas Bersih 100%',
      },
      {
        stepNumber: 2,
        title: 'Lepas Label & Tutup',
        action: 'Biarkan cincin penarik tetap di tempat',
        description: 'Ring tab penarik kaleng terbuat dari aluminium bermutu tinggi yang sama! Biarkan tetap terpasang atau kumpulkan bersama.',
        tip: 'Gunakan magnet kulkas: kaleng aluminium TIDAK AKAN menempel pada magnet, membedakannya dari kaleng besi sarden.',
        badge: 'Aluminium Murni Non-Magnetik',
      },
      {
        stepNumber: 3,
        title: 'Remukkan / Pipihkan',
        action: 'Injak kaleng secara vertikal hingga pipih',
        description: 'Letakkan kaleng di lantai dan injak dengan sepatu dari atas ke bawah hingga menjadi lempengan koin setebal 1-2 cm.',
        tip: 'Kaleng aluminium yang dipipihkan menghemat 85% volume kantong penyimpanan!',
        badge: 'Hemat 85% Volume',
      },
    ],
    dos: [
      'Injak kaleng hingga pipih agar muat banyak dalam satu kantong',
      'Tes dengan magnet: aluminium tidak akan menempel',
      'Simpan cincin ring-pull bersama kalengnya',
    ],
    donts: [
      'Jangan campur kaleng susu kental manis berbahan besi kaleng timah (Fe)',
      'Jangan biarkan sisa sirup manis mengering di dalam kaleng',
      'Jangan masukkan kaleng aerosol gas yang masih bertekanan',
    ],
  },
  {
    id: 'ferrous-steel',
    name: 'Besi Padu & Pipa Baja Bekas',
    category: 'Logam',
    categoryCode: 'FE 40',
    subCategory: 'Rangka Holo, Teralis, Paku & Pipa Besi',
    tag: 'Stabil Industri',
    priceRange: 'Rp 3.500 - Rp 5.200 / kg',
    minPrice: 3500,
    maxPrice: 5200,
    unit: '/ kg',
    trend: {
      direction: 'up',
      text: '+1% Minggu ini',
      percentage: '+1%',
    },
    co2ePerKg: 1.8,
    description: 'Potongan besi cor, rangka hollow renovasi rumah, kawat bronjong, paku, engsel pintu rusak, dan drum minyak besi kosong.',
    image: '/images/materials/metal.jpg',
    iconName: 'Wrench',
    specs: {
      minimumWeight: '10 kg',
      acceptanceStandard: 'Logam besi magnetik, bebas adukan semen tebal, panjang maks 1.5 meter',
      typicalDemand: 'Tinggi',
    },
    prepSteps: [
      {
        stepNumber: 1,
        title: 'Buang Sisa Cairan',
        action: 'Keringkan dan singkirkan lumpur basah',
        description: 'Bersihkan gumpalan tanah liat atau adukan semen cor yang menempel pada besi bekas bongkaran renovasi.',
        tip: 'Besi dengan kontaminasi semen tebal akan dipotong nilai timbangannya oleh mitra pengepul.',
        badge: 'Bebas Gumpalan Semen',
      },
      {
        stepNumber: 2,
        title: 'Lepas Label & Tutup',
        action: 'Pisahkan komponen non-logam (kayu/karet)',
        description: 'Lepaskan karet pelindung kaki meja, kayu bantalan, baut plastik, atau busa isolasi yang masih melekat pada besi.',
        tip: 'Besi bersih murni masuk kategori besi super dengan harga tertinggi.',
        badge: 'Besi Murni Terpisah',
      },
      {
        stepNumber: 3,
        title: 'Remukkan / Pipihkan',
        action: 'Potong panjang besi maksimal 1.5 meter',
        description: 'Potong pipa panjang atau rangka holo menjadi ukuran maksimal 1.2 hingga 1.5 meter agar aman diangkut kendaraan mitra.',
        tip: 'Ikat potongan besi seukuran menggunakan kawat agar tidak berserakan saat penimbangan.',
        badge: 'Panjang Maks 1.5m',
      },
    ],
    dos: [
      'Gunakan sarung tangan safety saat memegang potongan besi tajam',
      'Ikat pipa besi menjadi bundel yang mudah diangkat',
      'Pisahkan besi tebal (plat) dari kawat tipis',
    ],
    donts: [
      'Jangan sertakan tabung gas elpiji bekas tanpa sertifikasi resmi',
      'Jangan campur serpihan kaca tajam dalam tumpukan besi',
      'Hindari drum yang masih menyisakan cairan pelarut kimia B3 berbahaya',
    ],
  },
  {
    id: 'copper-brass',
    name: 'Tembaga & Kuningan Murni',
    category: 'Logam',
    categoryCode: 'CU 70',
    subCategory: 'Kabel Kupas, Pipa AC & Kran Kuningan',
    tag: 'Komoditas Premium',
    priceRange: 'Rp 65.000 - Rp 90.000 / kg',
    minPrice: 65000,
    maxPrice: 90000,
    unit: '/ kg',
    trend: {
      direction: 'up',
      text: '+6% Minggu ini',
      percentage: '+6%',
    },
    co2ePerKg: 3.8,
    description: 'Kawat kabel tembaga kupas bersih (merah/kuning), potongan pipa tembaga instalasi AC, kran air kuningan tua, dan spul dinamo.',
    image: '/images/materials/metal.jpg',
    iconName: 'Zap',
    specs: {
      minimumWeight: '0.5 kg (nilai satuan sangat tinggi)',
      acceptanceStandard: 'Tembaga murni telah dikupas dari kulit kabel plastik, non-magnetik',
      typicalDemand: 'Sangat Tinggi',
    },
    prepSteps: [
      {
        stepNumber: 1,
        title: 'Buang Sisa Cairan',
        action: 'Pastikan bebas dari oli berat atau grease',
        description: 'Tembaga dari pipa AC atau dinamo kendaraan terkadang terkena residu oli freon; lap bersih dengan kain majun kering.',
        tip: 'Tembaga yang mengilap dan bebas jelaga hitam dinilai sebagai "Tembaga Super/Merah".',
        badge: 'Bebas Oli Berat',
      },
      {
        stepNumber: 2,
        title: 'Lepas Label & Tutup',
        action: 'Kupas jaket isolasi plastik PVC kabel',
        description: 'Kupas pembungkus karet/plastik kabel memakai cutter. Harga tembaga yang sudah dikupas naik hingga 3x lipat dibanding kabel utuh!',
        tip: 'JANGAN membakar kabel dengan api untuk mengupas isolasi! Membakar kabel dilarang hukum karena menghasilkan racun dioksin dan menurunkan mutu tembaga.',
        badge: 'Kupas Manual (Tanpa Bakar)',
      },
      {
        stepNumber: 3,
        title: 'Remukkan / Pipihkan',
        action: 'Gulung kawat kawat tembaga secara padat',
        description: 'Gulung serat serat kawat tembaga melingkar menjadi donat padat agar tidak kusut dan mudah diletakkan di timbangan presisi.',
        tip: 'Simpan gulungan tembaga di dalam wadah terkunci sebelum jadwal penjemputan mitra.',
        badge: 'Gulungan Donat Padat',
      },
    ],
    dos: [
      'Kupas kulit kabel secara mekanis/manual menggunakan pemotong kabel',
      'Pisahkan tembaga merah mengilap dari kuningan kuning keemasan',
      'Gunakan timbangan digital gram untuk presisi',
    ],
    donts: [
      'DILARANG KERAS membakar kabel plastik (merusak lingkungan & melanggar regulasi)',
      'Jangan campur kabel isi kawat aluminium yang dicat tembaga',
      'Hindari tembaga yang sudah berkarat hijau pekat (verdigris tebal)',
    ],
  },
  {
    id: 'glass-bottles',
    name: 'Botol Beling Kaca (Bening & Warna)',
    category: 'Kaca',
    categoryCode: 'GL 70',
    subCategory: 'Botol Sirup, Kecap, Stoples & Selai',
    tag: 'Sirkular 100%',
    priceRange: 'Rp 600 - Rp 1.200 / kg',
    minPrice: 600,
    maxPrice: 1200,
    unit: '/ kg',
    trend: {
      direction: 'stable',
      text: 'Stabil Minggu ini',
    },
    co2ePerKg: 0.35,
    description: 'Botol kaca utuh bekas sirup marjan, kecap, saus tomat, stoples selai kaca, dan botol minuman mineral beling.',
    image: '/images/materials/glass.jpg',
    iconName: 'GlassWater',
    specs: {
      minimumWeight: '5 kg (sekitar 10-12 botol beling)',
      acceptanceStandard: 'Botol kaca utuh (tidak pecah berhamburan), dibilas bersih',
      typicalDemand: 'Sedang',
    },
    prepSteps: [
      {
        stepNumber: 1,
        title: 'Buang Sisa Cairan',
        action: 'Kocok dan bilas sisa saus, kecap, atau sirup',
        description: 'Kecap dan sirup yang mengering di dasar botol beling menimbulkan bau dan menarik koloni serangga.',
        tip: 'Isi botol 1/3 air hangat, kocok kuat, lalu tuangkan ke pembuangan air kotor.',
        badge: 'Bilas Air Bersih',
      },
      {
        stepNumber: 2,
        title: 'Lepas Label & Tutup',
        action: 'Lepas tutup mahkota besi atau tutup plastik',
        description: 'Buka tutup seng mahkota botol atau tutup ulir plastik. Tutup seng dapat digabungkan dengan kategori logam besi.',
        tip: 'Label kertas luar yang menempel tidak perlu dikerok jika terlalu kuat; pabrik pelebur kaca akan membakarnya di tungku.',
        badge: 'Pisahkan Tutup Seng',
      },
      {
        stepNumber: 3,
        title: 'Remukkan / Pipihkan',
        action: 'JANGAN dihancurkan; susun tegak dalam boks',
        description: 'Berbeda dengan material lain, botol kaca HARUS UTUH dan TIDAK BOLEH DIPECAHKAN demi keselamatan kurir dan nilai guna ulang.',
        tip: 'Susun berdiri tegak di dalam kardus bersekat atau krat plastik dengan bantalan koran.',
        badge: 'Wajib Utuh & Aman',
      },
    ],
    dos: [
      'Susun botol dalam posisi berdiri di dalam kardus kokoh',
      'Pisahkan botol warna bening jernih dari botol kaca cokelat/hijau',
      'Beri label peringatan "HATI-HATI KACA" di luar kardus',
    ],
    donts: [
      'JANGAN memecahkan botol kaca menjadi serpihan berhamburan',
      'Jangan sertakan cermin kamar mandi atau kaca jendela berlapisan kimia',
      'Jangan campur wadah keramik atau piring porselen (bukan kaca daur ulang)',
    ],
  },
  {
    id: 'uco-cooking-oil',
    name: 'Minyak Jelantah Rumah Tangga (UCO)',
    category: 'Minyak/Lainnya',
    categoryCode: 'UCO Biofuel',
    subCategory: 'Minyak Goreng Bekas Rumah Tangga & Dapur',
    tag: 'Bahan Baku Biofuel',
    priceRange: 'Rp 5.500 - Rp 8.000 / kg',
    minPrice: 5500,
    maxPrice: 8000,
    unit: '/ kg',
    trend: {
      direction: 'up',
      text: '+4% Minggu ini',
      percentage: '+4%',
    },
    co2ePerKg: 2.1,
    description: 'Minyak goreng bekas pakai rumah tangga atau dapur UMKM. Disalurkan ke kilang biodiesel resmi untuk energi bersih rendah emisi.',
    image: '/images/Marketplace/Aerial Recycling Plant.jpeg',
    iconName: 'Flame',
    specs: {
      minimumWeight: '2 liter / 2 kg',
      acceptanceStandard: 'Disaring dari remah gorengan, tanpa campuran air got/sabun, dalam jerigen tertutup',
      typicalDemand: 'Sangat Tinggi',
    },
    prepSteps: [
      {
        stepNumber: 1,
        title: 'Buang Sisa Cairan',
        action: 'Dinginkan minyak jelantah setelah memasak',
        description: 'Tunggu hingga minyak sisa memasak mencapai suhu ruang sebelum dipindahkan ke wadah penyimpanan penampung.',
        tip: 'JANGAN menuang minyak panas ke dalam botol plastik karena wadah plastik akan meleleh berlubang.',
        badge: 'Suhu Ruang Aman',
      },
      {
        stepNumber: 2,
        title: 'Lepas Label & Tutup',
        action: 'Saring remah tepung dan ampas gorengan',
        description: 'Gunakan saringan teh kawat halus atau kain kasa bersih saat menuang minyak ke jerigen agar endapan tepung tertinggal.',
        tip: 'Minyak jelantah yang jernih tanpa ampas hitam mendapat insentif harga paling optimal dari agregator biofuel.',
        badge: 'Tersaring Halus',
      },
      {
        stepNumber: 3,
        title: 'Remukkan / Pipihkan',
        action: 'Tutup rapat jerigen penampung anti-tumpah',
        description: 'Kumpulkan dalam jerigen plastik atau botol air mineral ukuran 1.5L hingga 5L, lalu kencangkan tutupnya dengan seal kedap.',
        tip: 'Simpan di tempat teduh terhindar dari sinar matahari langsung dan jangkauan anak-anak.',
        badge: 'Segel Kedap Anti-Tumpah',
      },
    ],
    dos: [
      'Saring ampas sisa gorengan menggunakan saringan halus',
      'Gunakan botol atau jerigen tebal dengan tutup yang rapat',
      'Kumpulkan hingga minimal 2-5 liter agar penjemputan hemat emisi',
    ],
    donts: [
      'JANGAN campur minyak jelantah dengan air kotor atau sabun cuci piring',
      'JANGAN tuangkan oli mesin kendaraan bermotor ke dalam minyak goreng jelantah',
      'DILARANG menuang minyak jelantah ke wastafel saluran air pemukiman',
    ],
  },
];

export const BLACKLISTED_RESIDUES: BlacklistItem[] = [
  {
    id: 'res-diapers',
    title: 'Popok & Pembalut Sekali Pakai',
    subtitle: 'Limbah biomedis berisiko tinggi',
    reason: 'Mengandung polimer gel hidrofilik terkontaminasi cairan tubuh dan bakteri patogen yang membahayakan kesehatan mitra pemilah.',
    consequence: 'Dapat menularkan penyakit menular serta mengontaminasi seluruh boks material lain menjadi residu kotor yang harus dibuang ke TPA.',
    properDisposal: 'Bungkus rapat dalam kantong plastik tertutup khusus sampah domestik dan salurkan ke dinas kebersihan / TPA resmi.',
    iconName: 'Baby',
    badge: 'Bahaya Biomedis',
  },
  {
    id: 'res-styrofoam',
    title: 'Styrofoam Kotor / Berminyak',
    subtitle: 'Tidak dapat diproses ulang oleh mesin pelebur',
    reason: 'Polistirena (PS #6) yang telah menyerap minyak kuah panas, sambal, atau lemak tidak dapat dicuci bersih oleh air deterjen industri.',
    consequence: 'Lemak makanan akan terbakar dan meledak di dalam mesin ekstrusi pelebur plastik, menghasilkan gas beracun dan merusak cetakan biji plastik.',
    properDisposal: 'Upayakan kurangi pemakaian; gunakan wadah reusable (tupperware) saat membeli makanan siap santap.',
    iconName: 'Soup',
    badge: 'Kerusakan Ekstrusi',
  },
  {
    id: 'res-thermal',
    title: 'Kertas Karbon / Struk Thermal',
    subtitle: 'Mengandung bahan kimia pelapis yang merusak hasil daur ulang',
    reason: 'Kertas struk belanja kasir dilapisi lapisan kimia peka panas bisphenol (BPA/BPS) serta lilin reaktif, bukan serat kayu murni.',
    consequence: 'Ketika masuk ke dalam tong bubur kertas daur ulang, senyawa BPA larut dan meracuni siklus daur ulang kertas higienis seperti tisu.',
    properDisposal: 'Robek dan masukkan ke tempat sampah residu kering rumah tangga.',
    iconName: 'Receipt',
    badge: 'Kontaminasi Kimia',
  },
];

