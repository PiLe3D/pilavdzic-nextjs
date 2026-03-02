'use client';

import { useState } from 'react';
import { weeklySchedule, trainingGroups, dayNames, dayNamesFull, members } from '@/app/aster/data';

export default function ScheduleView() {
  const [selectedMember, setSelectedMember] = useState('all');

  // Get unique students who have individual lessons
  const individualStudents = [...new Set(
    weeklySchedule
      .filter(s => s.type === 'individual')
      .map(s => s.student)
  )].sort();

  // Filter schedule based on selected member
  const filteredSchedule = selectedMember === 'all'
    ? weeklySchedule
    : weeklySchedule.filter(s => {
        if (s.type === 'individual') return s.student === selectedMember;
        // Show group classes that the member's group participates in
        return s.type === 'group';
      });

  const getGroupInfo = (groupId) => trainingGroups.find(g => g.id === groupId);

  const getSlotStyle = (slot) => {
    if (slot.type === 'individual') {
      return {
        borderLeft: '3px solid #f97316',
        background: 'rgba(249, 115, 22, 0.08)',
      };
    }
    const group = getGroupInfo(slot.group);
    if (group) {
      return {
        borderLeft: `3px solid ${group.color}`,
        background: `${group.color}10`,
      };
    }
    return {};
  };

  return (
    <div>
      {/* Filter */}
      <div className="mb-6 flex flex-wrap gap-3 items-center">
        <label className="text-sm font-medium text-gray-400">Prikaži raspored za:</label>
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
      <div className="mb-6 flex flex-wrap gap-2">
        {trainingGroups.map(g => (
          <span
            key={g.id}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
            style={{ background: `${g.color}20`, color: g.color }}
          >
            <span className="w-2 h-2 rounded-full" style={{ background: g.color }}></span>
            {g.name}
          </span>
        ))}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-orange-500/10 text-orange-400">
          <span className="w-2 h-2 rounded-full bg-orange-500"></span>
          Individualni
        </span>
      </div>

      {/* Desktop: Grid view */}
      <div className="hidden lg:grid grid-cols-7 gap-2">
        {dayNames.map((day, i) => (
          <div key={day}>
            {/* Day header */}
            <div className="text-center py-2 mb-2 rounded-lg bg-gray-800/50">
              <div className="text-xs text-gray-500 uppercase tracking-wider">{day}</div>
              <div className="text-sm font-semibold text-gray-300">{dayNamesFull[i]}</div>
            </div>

            {/* Time slots */}
            <div className="space-y-1.5">
              {filteredSchedule
                .filter(s => s.day === day)
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((slot, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg p-2.5 transition-all hover:scale-[1.02]"
                    style={getSlotStyle(slot)}
                  >
                    <div className="text-xs font-bold text-gray-300">{slot.time}</div>
                    {slot.type === 'group' ? (
                      <>
                        <div className="text-sm font-semibold mt-0.5" style={{ color: getGroupInfo(slot.group)?.color }}>
                          {getGroupInfo(slot.group)?.name}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {slot.duration} min
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-sm font-semibold text-orange-400 mt-0.5">
                          {slot.student}
                        </div>
                        {slot.dance && (
                          <div className="text-xs text-orange-300/60 mt-0.5">{slot.dance}</div>
                        )}
                        <div className="text-xs text-gray-500 mt-0.5">Individualni</div>
                      </>
                    )}
                  </div>
                ))}
              {filteredSchedule.filter(s => s.day === day).length === 0 && (
                <div className="text-xs text-gray-600 text-center py-4">Nema termina</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: Stack view */}
      <div className="lg:hidden space-y-3">
        {dayNames.map((day, i) => {
          const daySlots = filteredSchedule
            .filter(s => s.day === day)
            .sort((a, b) => a.time.localeCompare(b.time));

          if (daySlots.length === 0) return null;

          return (
            <div key={day} className="bg-gray-800/30 rounded-xl overflow-hidden">
              <div className="px-4 py-2.5 bg-gray-800/50 border-b border-gray-700/30">
                <span className="font-semibold text-gray-200">{dayNamesFull[i]}</span>
                <span className="text-xs text-gray-500 ml-2">{daySlots.length} termina</span>
              </div>
              <div className="divide-y divide-gray-800/50">
                {daySlots.map((slot, idx) => (
                  <div key={idx} className="flex items-center gap-3 px-4 py-3" style={getSlotStyle(slot)}>
                    <div className="text-sm font-mono font-bold text-gray-400 w-14 shrink-0">
                      {slot.time}
                    </div>
                    <div className="flex-1 min-w-0">
                      {slot.type === 'group' ? (
                        <>
                          <div className="text-sm font-semibold" style={{ color: getGroupInfo(slot.group)?.color }}>
                            {getGroupInfo(slot.group)?.name}
                          </div>
                          <div className="text-xs text-gray-500">{slot.duration} min</div>
                        </>
                      ) : (
                        <>
                          <div className="text-sm font-semibold text-orange-400">{slot.student}</div>
                          <div className="text-xs text-gray-500">
                            Individualni{slot.dance ? ` — ${slot.dance}` : ''}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
