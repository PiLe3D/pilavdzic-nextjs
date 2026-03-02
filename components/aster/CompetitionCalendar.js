'use client';

import { useState } from 'react';
import { useAster } from '@/app/aster/store';

export default function CompetitionCalendar() {
  const { competitions } = useAster();
  const [filterOrg, setFilterOrg] = useState('all');
  const [showPast, setShowPast] = useState(false);

  const now = new Date();
  const today = now.toISOString().split('T')[0];

  const filtered = competitions.filter(c => {
    if (filterOrg !== 'all' && c.org !== filterOrg) return false;
    if (!showPast && c.date < today) return false;
    return true;
  });

  const orgs = [...new Set(competitions.map(c => c.org).filter(Boolean))];

  const formatDate = (dateStr, endDateStr) => {
    const d = new Date(dateStr + 'T00:00:00');
    const months = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
    const day = d.getDate();
    const month = months[d.getMonth()];

    if (endDateStr) {
      const e = new Date(endDateStr + 'T00:00:00');
      if (d.getMonth() === e.getMonth()) {
        return `${day}.–${e.getDate()}. ${month}`;
      }
      return `${day}. ${month} – ${e.getDate()}. ${months[e.getMonth()]}`;
    }
    return `${day}. ${month}`;
  };

  const getDaysUntil = (dateStr) => {
    const d = new Date(dateStr + 'T00:00:00');
    const diff = Math.ceil((d - now) / (1000 * 60 * 60 * 24));
    if (diff === 0) return 'Danas!';
    if (diff === 1) return 'Sutra!';
    if (diff < 0) return `Prije ${Math.abs(diff)} dana`;
    if (diff <= 7) return `Za ${diff} dana`;
    if (diff <= 30) return `Za ${Math.ceil(diff / 7)} sedmica`;
    return `Za ${Math.round(diff / 30)} mj.`;
  };

  const getOrgBadge = (org) => {
    const styles = {
      'WDSF': { bg: '#3b82f620', color: '#60a5fa', text: 'WDSF' },
      'IDO': { bg: '#8b5cf620', color: '#a78bfa', text: 'IDO' },
      'Državno': { bg: '#f59e0b20', color: '#fbbf24', text: 'DRŽ' },
    };
    return styles[org] || { bg: '#6b728020', color: '#9ca3af', text: org || '—' };
  };

  // Group by month
  const byMonth = {};
  for (const c of filtered) {
    const d = new Date(c.date + 'T00:00:00');
    const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const monthNames = ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Juni', 'Juli', 'August', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'];
    const monthLabel = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
    if (!byMonth[monthKey]) byMonth[monthKey] = { label: monthLabel, items: [] };
    byMonth[monthKey].items.push(c);
  }

  return (
    <div>
      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-3 items-center">
        <select
          value={filterOrg}
          onChange={(e) => setFilterOrg(e.target.value)}
          className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
        >
          <option value="all">Sve organizacije</option>
          {orgs.map(o => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
          <input
            type="checkbox"
            checked={showPast}
            onChange={(e) => setShowPast(e.target.checked)}
            className="rounded bg-gray-800 border-gray-700 text-orange-500 focus:ring-orange-500"
          />
          Prikaži prošla
        </label>
        <span className="text-sm text-gray-500 ml-auto">
          {filtered.length} takmičenja
        </span>
      </div>

      {/* Timeline */}
      <div className="space-y-8">
        {Object.entries(byMonth).map(([monthKey, { label, items }]) => (
          <div key={monthKey}>
            <h3 className="text-lg font-bold text-gray-300 mb-4 flex items-center gap-2">
              <span className="w-3 h-0.5 bg-orange-500 rounded"></span>
              {label}
            </h3>
            <div className="space-y-2 ml-2 border-l-2 border-gray-800 pl-4">
              {items.map(comp => {
                const isPast = comp.date < today;
                const isNext = !isPast && filtered.indexOf(comp) === filtered.findIndex(c => c.date >= today);
                const badge = getOrgBadge(comp.org);

                return (
                  <div
                    key={comp.id}
                    className={`
                      relative rounded-xl p-4 transition-all
                      ${comp.highlight ? 'bg-orange-500/5 border border-orange-500/20 hover:border-orange-500/40' :
                        isPast ? 'bg-gray-800/20 opacity-60' :
                        isNext ? 'bg-gray-800/50 border border-orange-500/30 ring-1 ring-orange-500/10' :
                        'bg-gray-800/30 hover:bg-gray-800/50 border border-transparent'}
                    `}
                  >
                    {/* Next badge */}
                    {isNext && (
                      <div className="absolute -top-2 right-3 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        SLJEDEĆE
                      </div>
                    )}

                    {/* Highlight badge */}
                    {comp.highlight && (
                      <div className="absolute -top-2 left-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {comp.note || 'HIGHLIGHT'}
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      {/* Date */}
                      <div className="shrink-0 w-24">
                        <div className="text-sm font-bold text-gray-300">{formatDate(comp.date, comp.endDate)}</div>
                        <div className={`text-xs mt-0.5 ${isPast ? 'text-gray-600' : isNext ? 'text-orange-400 font-semibold' : 'text-gray-500'}`}>
                          {getDaysUntil(comp.date)}
                        </div>
                      </div>

                      {/* Main info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-lg">{comp.flag}</span>
                          <span className="text-sm font-bold text-white">{comp.city}</span>
                          <span
                            className="text-xs px-2 py-0.5 rounded-full font-semibold"
                            style={{ background: badge.bg, color: badge.color }}
                          >
                            {badge.text}
                          </span>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">{comp.type}</div>
                        {comp.categories && (
                          <div className="text-xs text-gray-500 mt-0.5">{comp.categories}</div>
                        )}
                        {comp.venue && (
                          <div className="text-xs text-gray-600 mt-0.5 italic">{comp.venue}</div>
                        )}
                      </div>

                      {/* Note */}
                      {comp.note && !comp.highlight && (
                        <div className="text-xs text-orange-400/60 shrink-0">{comp.note}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-4xl mb-3">🏆</div>
          <div>Nema takmičenja za prikaz</div>
        </div>
      )}
    </div>
  );
}
