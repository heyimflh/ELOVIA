'use client';

import React, { useState, useMemo } from 'react';
import {
  CATALOG_MATERIALS,
  CATALOG_CATEGORIES,
  CatalogMaterial,
} from './catalogData';
import { MaterialHeroSearch } from './MaterialHeroSearch';
import { MaterialPriceGrid } from './MaterialPriceGrid';
import { MaterialPrepDrawer } from './MaterialPrepDrawer';
import { MaterialBlacklistSection } from './MaterialBlacklistSection';
import { Sparkles, CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export function MaterialCatalogClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMaterial, setSelectedMaterial] = useState<CatalogMaterial | null>(null);
  const [toastMessage, setToastMessage] = useState<{
    show: boolean;
    title: string;
    description: string;
  }>({
    show: false,
    title: '',
    description: '',
  });

  // Dynamic Filtering Logic
  const filteredMaterials = useMemo(() => {
    return CATALOG_MATERIALS.filter((item) => {
      // 1. Filter by category
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // 2. Filter by search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchName = item.name.toLowerCase().includes(query);
        const matchCategory = item.category.toLowerCase().includes(query);
        const matchSubCategory = item.subCategory.toLowerCase().includes(query);
        const matchCode = item.categoryCode.toLowerCase().includes(query);
        const matchDescription = item.description.toLowerCase().includes(query);
        const matchTag = item.tag.toLowerCase().includes(query);

        return matchName || matchCategory || matchSubCategory || matchCode || matchDescription || matchTag;
      }

      return true;
    });
  }, [searchQuery, selectedCategory]);

  // Compute category counts based on current raw catalog data
  const dynamicCategories = useMemo(() => {
    return CATALOG_CATEGORIES.map((cat) => {
      if (cat.id === 'all') {
        return { ...cat, count: CATALOG_MATERIALS.length };
      }
      const count = CATALOG_MATERIALS.filter((item) => item.category === cat.id).length;
      return { ...cat, count };
    });
  }, []);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  const handleItemAdded = (material: CatalogMaterial) => {
    setToastMessage({
      show: true,
      title: 'Material Berhasil Ditambahkan',
      description: `${material.name} telah masuk ke boks penyaluran Anda.`,
    });

    setTimeout(() => {
      setToastMessage((prev) => ({ ...prev, show: false }));
    }, 4500);
  };

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 overflow-hidden z-0">
      {/* Ambient Glow Blobs (Background mesh for glassmorphism) */}
      <div
        className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-emerald-300/25 rounded-full blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-[40%] right-[-5%] w-[700px] h-[700px] bg-teal-200/30 rounded-full blur-[160px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[15%] left-[5%] w-[500px] h-[500px] bg-emerald-200/20 rounded-full blur-[150px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Floating Interactive Toast */}
      <AnimatePresence>
        {toastMessage.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 max-w-md w-[calc(100vw-3rem)] p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-emerald-300 shadow-2xl flex items-center justify-between gap-3 text-slate-900"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">
                  {toastMessage.title}
                </p>
                <p className="text-xs text-slate-600 line-clamp-1">
                  {toastMessage.description}
                </p>
              </div>
            </div>

            <Link
              href="/salur/baru"
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1 shrink-0 transition-colors shadow-xs"
            >
              <span>Lihat Boks</span>
              <ArrowRight size={13} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 1: HERO & LIVE SEARCH BAR */}
      <MaterialHeroSearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categories={dynamicCategories}
        totalResults={filteredMaterials.length}
      />

      {/* SECTION 2: LIVE MARKET PRICE GRID (DAFTAR MATERIAL) */}
      <MaterialPriceGrid
        materials={filteredMaterials}
        onSelectMaterial={setSelectedMaterial}
        onResetFilters={handleResetFilters}
      />

      {/* SECTION 4: MATERIAL YANG TIDAK DITERIMA (THE BLACKLIST) */}
      <MaterialBlacklistSection />

      {/* SECTION 3: PANDUAN PREPARASI (PREP GUIDE MODAL / DRAWER) */}
      <MaterialPrepDrawer
        material={selectedMaterial}
        onClose={() => setSelectedMaterial(null)}
        onItemAdded={handleItemAdded}
      />
    </div>
  );
}

