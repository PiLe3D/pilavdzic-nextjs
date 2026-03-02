'use client';

import { useState } from 'react';
import { useAster } from '@/app/aster/store';
import Link from 'next/link';

export default function ScheduleView() {
  const { weeklySchedule, trainingGroups, dayNames, dayNamesFull, members } = useAster();
  const [selectedMember, setSelectedMember] = useState('all');
  const [weekOffset, setWeekOffset] = useState(0);

  // Calculate current week dates
  const getWeekDates = (offset) => {
    const now = new Date();
    const monday = new Date(now);
    monday.setDate(now.getDate() - ((now.getDay() + 6) % 7) + offset * 7);
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      dates.push(d);
    }
    return dates;
  };

  const weekDates = getWeekDates(weekOffset);
  const weekStart = weekDates[0];
  const weekEnd = weekDates[6];

  const formatDate = (d) => `${d.getDate()}.${d.getMonth() + 1}.`;
  const formatDateFull = (d) => {
    const months = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
    return `${d.getDate()}. ${months[d.getMonth()]} ${d.getFullYear()}.`;
  };

  const isToday = (d) => {
    const now = new Date();
    return d.getDate() === now.getDate() && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  };

  // Get unique students who have individual lessons
  const individualStudents = [...new Set(
    weeklySchedule.filter(s => s.type === 'individual').map(s => s.student)
  )].sort();

  // Find member by name for linking
  const findMember = (name) => members.find(m => m.name === name || m.fullName === name);

  // Filter schedule
  const filteredSchedule = selectedMember === 'all'
    ? weeklySchedule
    : weeklySchedule.filter(s => {
        if (s.type === 'individual') return s.student === selectedMember;
        return s.type === 'group';
      });

  const getGroupInfo = (groupId) => trainingGroups.find(g => g.id === groupId);

  const getSlotStyle = (slot) => {
    if (slot.type === 'individual') {
      return { borderLeft: '3px solid #f97316', background: 'rgba(249, 115, 22, 0.08)' };
    }
    const group = getGroupInfo(slot.group);
    if (group) {
      return { borderLeft: `3px solid ${group.color}`, background: `${group.color}10` };
    }
    return {};
  };

  return (
    <div>
      {/* Week Navigation */}
      <div className="mb-5 flex items-center justify-between">
        <button
          onClick={() => setWeekOffset(o => o - 1)}
          className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
        >
          ← Prethodna
        </button>
        <div className="text-center">
          <div className="text-sm font-semibold text-gray-200">
            {formatDateFull(weekStart)} — {formatDateFull(weekEnd)}
          </div>
          {weekOffset !== 0 && (
            <button
              onClick={() => setWeekOffset(0)}
              className="text-xs text-orange-400 hover:text-orange-300 mt-1"
            >
              ↻ Trenutna sedmica
            </button>
          )}
        </div>
        <button
          onClick={() => setWeekOffset(o => o + 1)}
          className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
        >
          Sljedeća →
        </button>
      </div>

      {/* Filter */}
      <div className="mb-5 flex flex-wrap gap-3 items-center">
        <label className="text-sm font-medium text-gray-400">Prikaži za:</label>
        <select
          value={selectedMember}
          onChange={(e) => setSelectedMember(e.target.value)}
          className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
        >
          <option value="all">Sve grupe i individualne</option>
          <optgroup label="Individualni časovi">
            {individualStudents.map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </optgroup>
        </select>
      </div>

      {/* Legend */}
      <div className="mb-5 flex flex-wrap gap-2">
        {trainingGroups.map(g => (
          <span key={g.id} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium" style={{ background: `${g.color}20`, color: g.color }}>
            <span className="w-2 h-2 rounded-full" style={{ background: g.color }}></span>
            {g.name}
          </span>
        ))}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-orange-500/10 text-orange-400">
          <span className="w-2 h-2 rounded-full bg-orange-500"></span>
          Individualni
        </span>
      </div>

      {/* Desktop Grid */}
      <div className="hidden lg:grid grid-cols-7 gap-2">
        {dayNames.map((day, i) => {
          const date = weekDates[i];
          const today = isToday(date);
          const daySlots = filteredSchedule.filter(s => s.day === day).sort((a, b) => a.time.localeCompare(b.time));

          return (
            <div key={day}>
              <div className={`text-center py-2 mb-2 rounded-lg ${today ? 'bg-orange-500/20 ring-1 ring-orange-500/30' : 'bg-gray-800/50'}`}>
                <div className="text-xs text-gray-500 uppercase tracking-wider">{day}</div>
                <div className={`text-sm font-semibold ${today ? 'text-orange-400' : 'text-gray-300'}`}>{formatDate(date)}</div>
                {today && <div className="text-xs text-orange-400/70 mt-0.5">Danas</div>}
              </div>
              <div className="space-y-1.5">
                {daySlots.map((slot, idx) => (
                  <div key={idx} className="rounded-lg p-2.5 transition-all hover:scale-[1.02]" style={getSlotStyle(slot)}>
                    <div className="text-xs font-bold text-gray-300">{slot.time}</div>
                    {slot.type === 'group' ? (
                      <>
                        <div className="text-sm font-semibold mt-0.5" style={{ color: getGroupInfo(slot.group)?.color }}>
                          {getGroupInfo(slot.group)?.name}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">{slot.duration} min</div>
                      </>
                    ) : (
                      <>
                        {(() => {
                          const m = findMember(slot.student);
                          return m ? (
                            <Link href={`/aster/member/${m.id}`} className="text-sm font-semibold text-orange-400 mt-0.5 hover:text-orange-300 block">
                              {slot.student}
                            </Link>
                          ) : (
                            <div className="text-sm font-semibold text-orange-400 mt-0.5">{slot.student}</div>
                          );
                        })()}
                        {slot.dance && <div className="text-xs text-orange-300/60 mt-0.5">{slot.dance}</div>}
                        <div className="text-xs text-gray-500 mt-0.5">Individualni</div>
                      </>
                    )}
                  </div>
                ))}
                {daySlots.length === 0 && (
                  <div className="text-xs text-gray-700 text-center py-6">—</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Stack */}
      <div className="lg:hidden space-y-3">
        {dayNames.map((day, i) => {
          const date = weekDates[i];
          const today = isToday(date);
          const daySlots = filteredSchedule.filter(s => s.day === day).sort((a, b) => a.time.localeCompare(b.time));

          return (
            <div key={day} className={`rounded-xl overflow-hidden ${today ? 'ring-1 ring-orange-500/30' : ''} ${daySlots.length === 0 ? 'bg-gray-800/10' : 'bg-gray-800/30'}`}>
              <div className={`px-4 py-2.5 border-b border-gray-700/30 flex items-center justify-between ${today ? 'bg-orange-500/10' : 'bg-gray-800/50'}`}>
                <div>
                  <span className={`font-semibold ${today ? 'text-orange-400' : 'text-gray-200'}`}>{dayNamesFull[i]}</span>
                  <span className={`text-sm ml-2 ${today ? 'text-orange-400/70' : 'text-gray-500'}`}>{formatDate(date)}</span>
                  {today && <span className="text-xs text-orange-400 ml-2 bg-orange-500/10 px-2 py-0.5 rounded-full">Danas</span>}
                </div>
                <span className="text-xs text-gray-600">{daySlots.length > 0 ? `${daySlots.length} termina` : 'Slobodno'}</span>
              </div>
              {daySlots.length > 0 && (
                <div className="divide-y divide-gray-800/50">
                  {daySlots.map((slot, idx) => (
                    <div key={idx} className="flex items-center gap-3 px-4 py-3" style={getSlotStyle(slot)}>
                      <div className="text-sm font-mono font-bold text-gray-400 w-14 shrink-0">{slot.time}</div>
                      <div className="flex-1 min-w-0">
                        {slot.type === 'group' ? (
                          <>
                            <div className="text-sm font-semibold" style={{ color: getGroupInfo(slot.group)?.color }}>{getGroupInfo(slot.group)?.name}</div>
                            <div className="text-xs text-gray-500">{slot.duration} min</div>
                          </>
                        ) : (
                          <>
                            {(() => {
                              const m = findMember(slot.student);
                              return m ? (
                                <Link href={`/aster/member/${m.id}`} className="text-sm font-semibold text-orange-400 hover:text-orange-300">
                                  {slot.student} →
                                </Link>
                              ) : (
                                <div className="text-sm font-semibold text-orange-400">{slot.student}</div>
                              );
                            })()}
                            <div className="text-xs text-gray-500">Individualni{slot.dance ? ` — ${slot.dance}` : ''}</div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
