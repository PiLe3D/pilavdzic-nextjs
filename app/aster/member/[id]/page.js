'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { AsterProvider, useAster } from '@/app/aster/store';

function MemberProfile() {
  const { id } = useParams();
  const { members, weeklySchedule, trainingGroups, competitions, dayNames, dayNamesFull } = useAster();

  const member = members.find(m => m.id === parseInt(id));
  if (!member) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🤷</div>
          <h1 className="text-xl font-bold mb-2">Članica nije pronađena</h1>
          <Link href="/aster" className="text-orange-400 hover:text-orange-300">← Nazad</Link>
        </div>
      </div>
    );
  }

  // Find individual lessons for this member
  const individualLessons = weeklySchedule.filter(
    s => s.type === 'individual' && (s.student === member.name || s.student === member.fullName)
  );

  // Find group classes the member likely attends (based on group assignments)
  const groupClasses = weeklySchedule.filter(s => s.type === 'group');

  // Find upcoming competitions for this member's category
  const today = new Date().toISOString().split('T')[0];
  const upcomingComps = competitions.filter(c => c.date >= today).slice(0, 8);

  const getGroupInfo = (groupId) => trainingGroups.find(g => g.id === groupId);

  const getCategoryColor = (cat) => {
    const colors = { 'Pioniri 1': '#22c55e', 'Pioniri 2': '#3b82f6', 'Juniori 1': '#8b5cf6', 'Juniori 2': '#a855f7', 'Youth': '#ec4899', 'Adult': '#f43f5e' };
    return colors[cat] || '#6b7280';
  };

  const getLevelColor = (level) => {
    const colors = { 'D1': '#22c55e', 'D3': '#f59e0b', 'C': '#3b82f6', 'B': '#ec4899' };
    return colors[level] || '#6b7280';
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-6 sm:py-10">
        <div className="mb-6">
          <Link href="/aster" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-orange-400 transition-colors">
            ← Nazad na Aster
          </Link>
        </div>

        {/* Profile Header */}
        <div className="bg-gray-800/30 rounded-2xl p-6 mb-6 border border-gray-800">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold"
              style={{ background: `${getCategoryColor(member.category)}20`, color: getCategoryColor(member.category) }}>
              {member.fullName.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">{member.fullName}</h1>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                {member.category && (
                  <span className="text-sm px-2.5 py-0.5 rounded-full" style={{ background: `${getCategoryColor(member.category)}15`, color: getCategoryColor(member.category) }}>
                    {member.category}
                  </span>
                )}
                {member.level && (
                  <span className="text-sm px-2.5 py-0.5 rounded-full font-mono font-bold" style={{ background: `${getLevelColor(member.level)}15`, color: getLevelColor(member.level) }}>
                    {member.level}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            {member.trainingGroup && (
              <div className="bg-gray-800/50 rounded-xl p-3">
                <div className="text-xs text-gray-500">Trening grupa</div>
                <div className="text-sm font-semibold text-gray-200 mt-0.5">{member.trainingGroup}</div>
              </div>
            )}
            {member.group && (
              <div className="bg-gray-800/50 rounded-xl p-3">
                <div className="text-xs text-gray-500">Takmičarska grupa</div>
                <div className="text-sm font-semibold text-gray-200 mt-0.5">{member.group}</div>
              </div>
            )}
            <div className="bg-gray-800/50 rounded-xl p-3">
              <div className="text-xs text-gray-500">Individualni termini</div>
              <div className="text-sm font-semibold text-orange-400 mt-0.5">{individualLessons.length}</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-3">
              <div className="text-xs text-gray-500">Nadolazeća takm.</div>
              <div className="text-sm font-semibold text-purple-400 mt-0.5">{upcomingComps.length}</div>
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div className="bg-gray-800/30 rounded-2xl p-6 mb-6 border border-gray-800">
          <h2 className="text-lg font-bold text-gray-200 mb-4 flex items-center gap-2">
            <span>📅</span> Sedmični raspored
          </h2>

          {individualLessons.length > 0 && (
            <>
              <h3 className="text-sm font-semibold text-orange-400 mb-3">Individualni časovi</h3>
              <div className="space-y-2 mb-6">
                {individualLessons.map((lesson, i) => (
                  <div key={i} className="flex items-center gap-3 bg-orange-500/5 rounded-xl p-3 border-l-3" style={{ borderLeft: '3px solid #f97316' }}>
                    <div className="w-20 shrink-0">
                      <div className="text-sm font-bold text-gray-200">{dayNamesFull[dayNames.indexOf(lesson.day)]}</div>
                    </div>
                    <div className="text-sm font-mono font-bold text-gray-400">{lesson.time}</div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-300">{lesson.duration} min</div>
                      {lesson.dance && <div className="text-xs text-orange-400">{lesson.dance}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <h3 className="text-sm font-semibold text-gray-400 mb-3">Grupni treninzi</h3>
          <div className="space-y-2">
            {groupClasses.map((gc, i) => {
              const group = getGroupInfo(gc.group);
              if (!group) return null;
              return (
                <div key={i} className="flex items-center gap-3 rounded-xl p-3" style={{ borderLeft: `3px solid ${group.color}`, background: `${group.color}08` }}>
                  <div className="w-20 shrink-0">
                    <div className="text-sm font-bold text-gray-300">{dayNamesFull[dayNames.indexOf(gc.day)]}</div>
                  </div>
                  <div className="text-sm font-mono font-bold text-gray-400">{gc.time}</div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold" style={{ color: group.color }}>{group.name}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Competitions */}
        <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-lg font-bold text-gray-200 mb-4 flex items-center gap-2">
            <span>🏆</span> Nadolazeća takmičenja
          </h2>
          <div className="space-y-2">
            {upcomingComps.map(comp => {
              const d = new Date(comp.date + 'T00:00:00');
              const months = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
              return (
                <div key={comp.id} className={`flex items-center gap-3 rounded-xl p-3 ${comp.highlight ? 'bg-orange-500/5 border border-orange-500/20' : 'bg-gray-800/30'}`}>
                  <div className="text-sm font-bold text-gray-400 w-20 shrink-0">
                    {d.getDate()}. {months[d.getMonth()]}
                  </div>
                  <div className="text-lg">{comp.flag}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-white truncate">{comp.city}</div>
                    <div className="text-xs text-gray-500">{comp.type}</div>
                  </div>
                  {comp.org && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-400 shrink-0">{comp.org}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MemberPage() {
  return (
    <AsterProvider>
      <MemberProfile />
    </AsterProvider>
  );
}
