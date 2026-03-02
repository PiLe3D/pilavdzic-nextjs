'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as defaults from './data';

const AsterContext = createContext(null);

const API_BASE = 'http://159.223.22.99/api/aster';

// ============================================================
// API HELPER
// ============================================================
async function api(path, options = {}) {
  const url = `${API_BASE}${path}`;
  try {
    const res = await fetch(url, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...options.headers },
    });
    if (!res.ok) throw new Error(`API ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`API error (${path}):`, err.message);
    return null;
  }
}

// ============================================================
// PROVIDER
// ============================================================
export function AsterProvider({ children }) {
  const [data, setData] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load all data from API on mount (fallback to defaults)
  useEffect(() => {
    async function load() {
      try {
        const [members, trainers, groups, schedule, competitions, categories, anns] = await Promise.all([
          api('/members'),
          api('/trainers'),
          api('/groups'),
          api('/schedule'),
          api('/competitions'),
          api('/categories'),
          api('/announcements'),
        ]);

        setData({
          members: members || defaults.members,
          trainers: trainers || defaults.trainers,
          trainingGroups: groups || defaults.trainingGroups,
          weeklySchedule: schedule || defaults.weeklySchedule,
          competitions: competitions || defaults.competitions,
          categories: categories || defaults.categories,
        });
        setAnnouncements(anns || []);
      } catch {
        // Full fallback to static defaults
        setData({
          members: defaults.members,
          trainers: defaults.trainers,
          trainingGroups: defaults.trainingGroups,
          weeklySchedule: defaults.weeklySchedule,
          competitions: defaults.competitions,
          categories: defaults.categories,
        });
      }
      setIsLoaded(true);
    }
    load();
  }, []);

  // --- MEMBERS ---
  const updateMembers = useCallback(async (members) => {
    setData(prev => ({ ...prev, members }));
    // Sync full list: detect adds, updates, deletes vs current
    // For simplicity, we do a full replace strategy via individual calls
  }, []);

  const addMember = useCallback(async (member) => {
    const result = await api('/members', { method: 'POST', body: JSON.stringify(member) });
    if (result) setData(prev => ({ ...prev, members: [...prev.members, result] }));
    return result;
  }, []);

  const editMember = useCallback(async (id, member) => {
    const result = await api(`/members/${id}`, { method: 'PUT', body: JSON.stringify(member) });
    if (result) setData(prev => ({ ...prev, members: prev.members.map(m => m.id === id ? result : m) }));
    return result;
  }, []);

  const deleteMember = useCallback(async (id) => {
    await api(`/members/${id}`, { method: 'DELETE' });
    setData(prev => ({ ...prev, members: prev.members.filter(m => m.id !== id) }));
  }, []);

  // --- TRAINERS ---
  const addTrainer = useCallback(async (trainer) => {
    const result = await api('/trainers', { method: 'POST', body: JSON.stringify(trainer) });
    if (result) setData(prev => ({ ...prev, trainers: [...prev.trainers, result] }));
    return result;
  }, []);

  const editTrainer = useCallback(async (id, trainer) => {
    const result = await api(`/trainers/${id}`, { method: 'PUT', body: JSON.stringify(trainer) });
    if (result) setData(prev => ({ ...prev, trainers: prev.trainers.map(t => t.id === id ? result : t) }));
    return result;
  }, []);

  const deleteTrainer = useCallback(async (id) => {
    await api(`/trainers/${id}`, { method: 'DELETE' });
    setData(prev => ({ ...prev, trainers: prev.trainers.filter(t => t.id !== id) }));
  }, []);

  // --- GROUPS ---
  const addGroup = useCallback(async (group) => {
    const result = await api('/groups', { method: 'POST', body: JSON.stringify(group) });
    if (result) setData(prev => ({ ...prev, trainingGroups: [...prev.trainingGroups, result] }));
    return result;
  }, []);

  const editGroup = useCallback(async (id, group) => {
    const result = await api(`/groups/${id}`, { method: 'PUT', body: JSON.stringify(group) });
    if (result) setData(prev => ({ ...prev, trainingGroups: prev.trainingGroups.map(g => g.id === id ? result : g) }));
    return result;
  }, []);

  const deleteGroup = useCallback(async (id) => {
    await api(`/groups/${id}`, { method: 'DELETE' });
    setData(prev => ({ ...prev, trainingGroups: prev.trainingGroups.filter(g => g.id !== id) }));
  }, []);

  // --- SCHEDULE ---
  const addSlot = useCallback(async (slot) => {
    const result = await api('/schedule', { method: 'POST', body: JSON.stringify(slot) });
    if (result) setData(prev => ({ ...prev, weeklySchedule: [...prev.weeklySchedule, result] }));
    return result;
  }, []);

  const editSlot = useCallback(async (id, slot) => {
    const result = await api(`/schedule/${id}`, { method: 'PUT', body: JSON.stringify(slot) });
    if (result) setData(prev => ({ ...prev, weeklySchedule: prev.weeklySchedule.map(s => s.id === id ? result : s) }));
    return result;
  }, []);

  const deleteSlot = useCallback(async (id) => {
    await api(`/schedule/${id}`, { method: 'DELETE' });
    setData(prev => ({ ...prev, weeklySchedule: prev.weeklySchedule.filter(s => s.id !== id) }));
  }, []);

  // --- COMPETITIONS ---
  const addCompetition = useCallback(async (comp) => {
    const result = await api('/competitions', { method: 'POST', body: JSON.stringify(comp) });
    if (result) setData(prev => ({ ...prev, competitions: [...prev.competitions, result] }));
    return result;
  }, []);

  const editCompetition = useCallback(async (id, comp) => {
    const result = await api(`/competitions/${id}`, { method: 'PUT', body: JSON.stringify(comp) });
    if (result) setData(prev => ({ ...prev, competitions: prev.competitions.map(c => c.id === id ? result : c) }));
    return result;
  }, []);

  const deleteCompetition = useCallback(async (id) => {
    await api(`/competitions/${id}`, { method: 'DELETE' });
    setData(prev => ({ ...prev, competitions: prev.competitions.filter(c => c.id !== id) }));
  }, []);

  // --- ANNOUNCEMENTS ---
  const addAnnouncement = useCallback(async (text) => {
    const result = await api('/announcements', { method: 'POST', body: JSON.stringify({ text }) });
    if (result) setAnnouncements(prev => [result, ...prev]);
    return result;
  }, []);

  const removeAnnouncement = useCallback(async (id) => {
    await api(`/announcements/${id}`, { method: 'DELETE' });
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  }, []);

  // --- LEGACY BULK UPDATES (used by admin panel) ---
  const updateMembers_legacy = updateMembers;
  const updateTrainers = useCallback(async (trainers) => { setData(prev => ({ ...prev, trainers })); }, []);
  const updateGroups = useCallback(async (trainingGroups) => { setData(prev => ({ ...prev, trainingGroups })); }, []);
  const updateSchedule = useCallback(async (weeklySchedule) => { setData(prev => ({ ...prev, weeklySchedule })); }, []);
  const updateCompetitions = useCallback(async (competitions) => { setData(prev => ({ ...prev, competitions })); }, []);

  // --- RESET ---
  const resetToDefaults = useCallback(() => {
    // Not applicable with API backend — would need re-seed
  }, []);

  if (!isLoaded || !data) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full mx-auto mb-3"></div>
          <p className="text-gray-500 text-sm">Učitavanje podataka...</p>
        </div>
      </div>
    );
  }

  return (
    <AsterContext.Provider value={{
      ...data,
      announcements,
      // Legacy bulk updates (for components that use them)
      updateMembers, updateTrainers, updateGroups, updateSchedule, updateCompetitions,
      // New individual CRUD operations (for admin panel)
      addMember, editMember, deleteMember,
      addTrainer, editTrainer, deleteTrainer,
      addGroup, editGroup, deleteGroup,
      addSlot, editSlot, deleteSlot,
      addCompetition, editCompetition, deleteCompetition,
      addAnnouncement, removeAnnouncement,
      resetToDefaults,
      dayNames: defaults.dayNames,
      dayNamesFull: defaults.dayNamesFull,
    }}>
      {children}
    </AsterContext.Provider>
  );
}

export function useAster() {
  const ctx = useContext(AsterContext);
  if (!ctx) throw new Error('useAster must be inside AsterProvider');
  return ctx;
}
