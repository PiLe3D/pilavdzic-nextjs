'use client';

import { useState } from 'react';
import { AsterProvider, useAster } from '@/app/aster/store';
import ScheduleView from '@/components/aster/ScheduleView';
import MemberList from '@/components/aster/MemberList';
import CompetitionCalendar from '@/components/aster/CompetitionCalendar';
import { ASTER_VERSION, changelog } from '@/app/aster/changelog';

const tabs = [
  { id: 'schedule', label: 'Raspored', icon: '📅' },
  { id: 'members', label: 'Članice', icon: '👥' },
  { id: 'competitions', label: 'Takmičenja', icon: '🏆' },
];

function AsterContent() {
  const { members, competitions, announcements } = useAster();
  const [activeTab, setActiveTab] = useState('schedule');
  const [showChangelog, setShowChangelog] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const nextComp = competitions.find(c => c.date >= today);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-6 sm:py-10">
        <div className="mb-6">
          <a href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-orange-400 transition-colors">
            <span>←</span><span>pilavdzic.org</span>
          </a>
        </div>

        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-600 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-orange-500/20">
                  💃
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                    ASTER
                  </h1>
                  <p className="text-sm text-gray-500">Plesni Klub — Sarajevo</p>
                </div>
              </div>
            </div>
            <div className="flex gap-4 sm:ml-auto text-center">
              <div className="bg-gray-800/30 rounded-xl px-4 py-2.5 border border-gray-800">
                <div className="text-lg font-bold text-orange-400">{members.length}</div>
                <div className="text-xs text-gray-500">Članica</div>
              </div>
              <div className="bg-gray-800/30 rounded-xl px-4 py-2.5 border border-gray-800">
                <div className="text-lg font-bold text-purple-400">{competitions.filter(c => c.date >= today).length}</div>
                <div className="text-xs text-gray-500">Takmičenja</div>
              </div>
              {nextComp && (
                <div className="bg-gray-800/30 rounded-xl px-4 py-2.5 border border-gray-800 hidden sm:block">
                  <div className="text-lg font-bold text-white">{nextComp.flag} {nextComp.city.split('/')[0].split(' ')[0]}</div>
                  <div className="text-xs text-gray-500">Sljedeće takm.</div>
                </div>
              )}
            </div>
          </div>

          {/* Announcements */}
          {announcements.length > 0 && (
            <div className="mb-6 space-y-2">
              {announcements.slice(0, 3).map(ann => (
                <div key={ann.id} className="bg-orange-500/5 border border-orange-500/20 rounded-xl px-4 py-3 flex items-start gap-3">
                  <span className="text-orange-400 shrink-0 mt-0.5">📢</span>
                  <div className="flex-1">
                    <div className="text-sm text-gray-200">{ann.text}</div>
                    <div className="text-xs text-gray-500 mt-1">{new Date(ann.date).toLocaleDateString('bs')}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tabs */}
          <div className="flex gap-1 bg-gray-900/50 p-1 rounded-xl border border-gray-800 overflow-x-auto">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex-1 justify-center
                  ${activeTab === tab.id
                    ? 'bg-gradient-to-r from-orange-500/20 to-pink-500/20 text-orange-400 border border-orange-500/20'
                    : 'text-gray-500 hover:text-gray-300 border border-transparent'}`}>
                <span className="text-base">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </header>

        <main className="min-h-[60vh]">
          {activeTab === 'schedule' && <ScheduleView />}
          {activeTab === 'members' && <MemberList />}
          {activeTab === 'competitions' && <CompetitionCalendar />}
        </main>

        <footer className="mt-12 pt-6 border-t border-gray-800/50">
          <div className="text-center">
            <p className="text-xs text-gray-600">Aster Plesni Klub &bull; Sarajevo &bull; Trenerice: Andrea Brekalo, Lamija Svraka, Esma Ahmić</p>
            <button
              onClick={() => setShowChangelog(v => !v)}
              className="text-xs text-gray-700 hover:text-orange-400 mt-2 transition-colors inline-flex items-center gap-1"
            >
              {ASTER_VERSION} {showChangelog ? '▲' : '▼'}
            </button>
          </div>

          {showChangelog && (
            <div className="mt-4 max-w-2xl mx-auto">
              {changelog.map(release => (
                <div key={release.version} className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded">{release.version}</span>
                    <span className="text-xs text-gray-600">{release.date}</span>
                  </div>
                  <ul className="space-y-1 pl-4">
                    {release.changes.map((change, i) => (
                      <li key={i} className="text-xs text-gray-500 flex items-start gap-2">
                        <span className="text-orange-500/40 mt-0.5 shrink-0">•</span>
                        <span>{change}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </footer>
      </div>
    </div>
  );
}

export default function AsterPage() {
  return (
    <AsterProvider>
      <AsterContent />
    </AsterProvider>
  );
}
