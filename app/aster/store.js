'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import * as defaults from './data';

const AsterContext = createContext(null);

const STORAGE_KEY = 'aster_data';
const ANNOUNCEMENTS_KEY = 'aster_announcements';

export function AsterProvider({ children }) {
  const [data, setData] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load from localStorage or use defaults
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setData({ ...getDefaults(), ...parsed });
      } else {
        setData(getDefaults());
      }
      const savedAnn = localStorage.getItem(ANNOUNCEMENTS_KEY);
      if (savedAnn) setAnnouncements(JSON.parse(savedAnn));
    } catch {
      setData(getDefaults());
    }
    setIsLoaded(true);
  }, []);

  function getDefaults() {
    return {
      members: defaults.members,
      trainers: defaults.trainers,
      trainingGroups: defaults.trainingGroups,
      weeklySchedule: defaults.weeklySchedule,
      competitions: defaults.competitions,
      categories: defaults.categories,
    };
  }

  function saveData(newData) {
    setData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  }

  function saveAnnouncements(ann) {
    setAnnouncements(ann);
    localStorage.setItem(ANNOUNCEMENTS_KEY, JSON.stringify(ann));
  }

  function updateMembers(members) { saveData({ ...data, members }); }
  function updateTrainers(trainers) { saveData({ ...data, trainers }); }
  function updateGroups(trainingGroups) { saveData({ ...data, trainingGroups }); }
  function updateSchedule(weeklySchedule) { saveData({ ...data, weeklySchedule }); }
  function updateCompetitions(competitions) { saveData({ ...data, competitions }); }

  function addAnnouncement(text) {
    const ann = [{ id: Date.now(), text, date: new Date().toISOString() }, ...announcements];
    saveAnnouncements(ann);
  }

  function removeAnnouncement(id) {
    saveAnnouncements(announcements.filter(a => a.id !== id));
  }

  function resetToDefaults() {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(ANNOUNCEMENTS_KEY);
    setData(getDefaults());
    setAnnouncements([]);
  }

  if (!isLoaded || !data) return null;

  return (
    <AsterContext.Provider value={{
      ...data,
      announcements,
      updateMembers, updateTrainers, updateGroups, updateSchedule, updateCompetitions,
      addAnnouncement, removeAnnouncement, resetToDefaults,
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
