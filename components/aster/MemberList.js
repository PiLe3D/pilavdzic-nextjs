'use client';

import { useState } from 'react';
import { useAster } from '@/app/aster/store';
import Link from 'next/link';

export default function MemberList() {
  const { members, categories } = useAster();
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterGroup, setFilterGroup] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const trainingGroupNames = [...new Set(members.map(m => m.trainingGroup))].sort();

  const filtered = members.filter(m => {
    if (filterCategory !== 'all' && m.category !== filterCategory) return false;
    if (filterGroup !== 'all' && m.trainingGroup !== filterGroup) return false;
    if (searchQuery && !m.fullName.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const grouped = {};
  for (const m of filtered) {
    const key = m.trainingGroup || 'Ostali';
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(m);
  }

  const getCategoryColor = (cat) => {
    const colors = { 'Pioniri 1': '#22c55e', 'Pioniri 2': '#3b82f6', 'Juniori 1': '#8b5cf6', 'Juniori 2': '#a855f7', 'Youth': '#ec4899', 'Adult': '#f43f5e' };
    return colors[cat] || '#6b7280';
  };

  const getLevelColor = (level) => {
    const colors = { 'D1': '#22c55e', 'D3': '#f59e0b', 'C': '#3b82f6', 'B': '#ec4899' };
    return colors[level] || '#6b7280';
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-3">
        <input type="text" placeholder="Pretraži po imenu..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none flex-1 min-w-[200px]" />
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}
          className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none">
          <option value="all">Sve kategorije</option>
          {categories.map(c => (<option key={c.name} value={c.name}>{c.name} ({c.ageRange})</option>))}
        </select>
        <select value={filterGroup} onChange={(e) => setFilterGroup(e.target.value)}
          className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none">
          <option value="all">Sve grupe</option>
          {trainingGroupNames.map(g => (<option key={g} value={g}>{g}</option>))}
        </select>
      </div>

      <div className="mb-6 flex gap-4 text-sm text-gray-400">
        <span>Prikazano: <strong className="text-white">{filtered.length}</strong></span>
        <span>Ukupno: <strong className="text-white">{members.length}</strong></span>
      </div>

      <div className="space-y-6">
        {Object.entries(grouped).map(([groupName, groupMembers]) => (
          <div key={groupName}>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              {groupName}
              <span className="text-xs text-gray-600 font-normal">({groupMembers.length})</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {groupMembers.map(m => (
                <Link key={m.id} href={`/aster/member/${m.id}`}
                  className="bg-gray-800/40 hover:bg-gray-800/70 rounded-xl p-3.5 transition-all border border-gray-800 hover:border-orange-500/30 flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                    style={{ background: `${getCategoryColor(m.category)}20`, color: getCategoryColor(m.category) }}>
                    {m.fullName.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-200 truncate group-hover:text-orange-400 transition-colors">{m.fullName}</div>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      {m.category && (
                        <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: `${getCategoryColor(m.category)}15`, color: getCategoryColor(m.category) }}>
                          {m.category}
                        </span>
                      )}
                      {m.level && (
                        <span className="text-xs px-1.5 py-0.5 rounded font-mono font-bold" style={{ background: `${getLevelColor(m.level)}15`, color: getLevelColor(m.level) }}>
                          {m.level}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-gray-600 group-hover:text-orange-400 transition-colors">→</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
