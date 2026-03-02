'use client';

import { useState, useEffect } from 'react';
import { AsterProvider, useAster } from '@/app/aster/store';
import Link from 'next/link';

// ============================================================
// ADMIN LOGIN
// ============================================================
function AdminLogin({ onLogin }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (user === 'admin' && pass === 'admin') {
      sessionStorage.setItem('aster_admin', 'true');
      onLogin();
    } else {
      setError('Pogrešan korisnik ili lozinka');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4">
      <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="text-3xl mb-2">🔐</div>
          <h1 className="text-xl font-bold text-white">Aster Admin</h1>
          <p className="text-sm text-gray-500 mt-1">Unesite pristupne podatke</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="text" placeholder="Korisnik" value={user} onChange={(e) => setUser(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none" />
          <input type="password" placeholder="Lozinka" value={pass} onChange={(e) => setPass(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none" />
          {error && <div className="text-red-400 text-sm text-center">{error}</div>}
          <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold py-3 rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all">
            Prijava
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link href="/aster" className="text-sm text-gray-500 hover:text-orange-400">← Nazad na Aster</Link>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// ADMIN TABS
// ============================================================
const adminTabs = [
  { id: 'members', label: 'Članice', icon: '👥' },
  { id: 'trainers', label: 'Treneri', icon: '🏋️' },
  { id: 'groups', label: 'Grupe', icon: '📋' },
  { id: 'schedule', label: 'Raspored', icon: '📅' },
  { id: 'competitions', label: 'Takmičenja', icon: '🏆' },
  { id: 'announcements', label: 'Obavijesti', icon: '📢' },
];

// ============================================================
// MODAL COMPONENT
// ============================================================
function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-gray-900 rounded-2xl border border-gray-700 w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-xl">✕</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// ============================================================
// FORM INPUT HELPERS
// ============================================================
function FormField({ label, children }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-400 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const inputClass = "w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none";
const selectClass = "w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none";
const btnPrimary = "bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium px-4 py-2 rounded-lg text-sm hover:from-orange-600 hover:to-pink-600 transition-all";
const btnSecondary = "bg-gray-800 text-gray-300 font-medium px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition-all border border-gray-700";
const btnDanger = "bg-red-500/20 text-red-400 font-medium px-3 py-1.5 rounded-lg text-xs hover:bg-red-500/30 transition-all border border-red-500/30";

// ============================================================
// MEMBERS ADMIN
// ============================================================
function MembersAdmin() {
  const { members, categories, trainingGroups, updateMembers } = useAster();
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState(null); // null = closed, {} = new, {id:...} = edit
  const [form, setForm] = useState({});

  const filtered = members.filter(m =>
    !search || m.fullName.toLowerCase().includes(search.toLowerCase())
  );

  const grouped = {};
  for (const m of filtered) {
    const key = m.trainingGroup || 'Ostali';
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(m);
  }

  const openNew = () => {
    setForm({ name: '', fullName: '', category: '', level: '', group: '', trainingGroup: '' });
    setEditing('new');
  };

  const openEdit = (m) => {
    setForm({ ...m });
    setEditing(m.id);
  };

  const save = () => {
    if (!form.fullName.trim()) return;
    let updated;
    if (editing === 'new') {
      const maxId = Math.max(0, ...members.map(m => m.id));
      const newMember = {
        ...form,
        id: maxId + 1,
        name: form.name || form.fullName.split(' ')[0],
        category: form.category || null,
        level: form.level || null,
        group: form.group || null,
      };
      updated = [...members, newMember];
    } else {
      updated = members.map(m => m.id === editing ? { ...m, ...form } : m);
    }
    updateMembers(updated);
    setEditing(null);
  };

  const remove = (id) => {
    if (confirm('Obrisati članicu?')) {
      updateMembers(members.filter(m => m.id !== id));
    }
  };

  const trainingGroupNames = [...new Set(members.map(m => m.trainingGroup))].filter(Boolean).sort();

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-5 items-center">
        <input type="text" placeholder="Pretraži..." value={search} onChange={e => setSearch(e.target.value)} className={inputClass + " max-w-xs"} />
        <button onClick={openNew} className={btnPrimary}>+ Nova članica</button>
        <span className="text-sm text-gray-500 ml-auto">{members.length} članica</span>
      </div>

      {Object.entries(grouped).map(([group, list]) => (
        <div key={group} className="mb-5">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">{group} ({list.length})</h3>
          <div className="space-y-1">
            {list.map(m => (
              <div key={m.id} className="flex items-center gap-3 bg-gray-800/40 rounded-lg px-4 py-2.5 border border-gray-800 hover:border-gray-700 transition-colors">
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-gray-200">{m.fullName}</span>
                  <div className="flex gap-2 mt-0.5 flex-wrap">
                    {m.category && <span className="text-xs text-gray-500">{m.category}</span>}
                    {m.level && <span className="text-xs text-orange-400 font-mono">{m.level}</span>}
                    {m.group && <span className="text-xs text-gray-600">· {m.group}</span>}
                  </div>
                </div>
                <button onClick={() => openEdit(m)} className="text-xs text-gray-500 hover:text-orange-400 transition-colors">Uredi</button>
                <button onClick={() => remove(m.id)} className="text-xs text-gray-600 hover:text-red-400 transition-colors">✕</button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {editing !== null && (
        <Modal title={editing === 'new' ? 'Nova članica' : 'Uredi članicu'} onClose={() => setEditing(null)}>
          <FormField label="Puno ime *">
            <input className={inputClass} value={form.fullName || ''} onChange={e => setForm({ ...form, fullName: e.target.value })} />
          </FormField>
          <FormField label="Kratko ime">
            <input className={inputClass} value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Auto iz punog imena" />
          </FormField>
          <FormField label="Kategorija">
            <select className={selectClass} value={form.category || ''} onChange={e => setForm({ ...form, category: e.target.value || null })}>
              <option value="">— Nema —</option>
              {categories.map(c => <option key={c.name} value={c.name}>{c.name} ({c.ageRange})</option>)}
            </select>
          </FormField>
          <FormField label="Nivo">
            <select className={selectClass} value={form.level || ''} onChange={e => setForm({ ...form, level: e.target.value || null })}>
              <option value="">— Nema —</option>
              <option value="D1">D1</option>
              <option value="D3">D3</option>
              <option value="C">C</option>
              <option value="B">B</option>
            </select>
          </FormField>
          <FormField label="Trening grupa">
            <select className={selectClass} value={form.trainingGroup || ''} onChange={e => setForm({ ...form, trainingGroup: e.target.value })}>
              <option value="">— Nema —</option>
              {trainingGroupNames.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </FormField>
          <FormField label="Takmičarska grupa">
            <input className={inputClass} value={form.group || ''} onChange={e => setForm({ ...form, group: e.target.value || null })} placeholder="npr. Grupa Pioniri 2" />
          </FormField>
          <div className="flex gap-3 mt-6">
            <button onClick={save} className={btnPrimary}>Sačuvaj</button>
            <button onClick={() => setEditing(null)} className={btnSecondary}>Otkaži</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ============================================================
// TRAINERS ADMIN
// ============================================================
function TrainersAdmin() {
  const { trainers, updateTrainers } = useAster();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  const openNew = () => {
    setForm({ name: '', role: '', groups: [] });
    setEditing('new');
  };

  const openEdit = (t) => {
    setForm({ ...t, groupsText: (t.groups || []).join(', ') });
    setEditing(t.id);
  };

  const save = () => {
    if (!form.name.trim()) return;
    const groups = (form.groupsText || '').split(',').map(s => s.trim()).filter(Boolean);
    let updated;
    if (editing === 'new') {
      const maxId = Math.max(0, ...trainers.map(t => t.id));
      updated = [...trainers, { id: maxId + 1, name: form.name, role: form.role, groups }];
    } else {
      updated = trainers.map(t => t.id === editing ? { ...t, name: form.name, role: form.role, groups } : t);
    }
    updateTrainers(updated);
    setEditing(null);
  };

  const remove = (id) => {
    if (confirm('Obrisati trenera?')) {
      updateTrainers(trainers.filter(t => t.id !== id));
    }
  };

  return (
    <div>
      <div className="flex gap-3 mb-5 items-center">
        <button onClick={openNew} className={btnPrimary}>+ Novi trener</button>
        <span className="text-sm text-gray-500 ml-auto">{trainers.length} trenera</span>
      </div>

      <div className="space-y-2">
        {trainers.map(t => (
          <div key={t.id} className="flex items-center gap-3 bg-gray-800/40 rounded-lg px-4 py-3 border border-gray-800">
            <div className="flex-1">
              <div className="text-sm font-semibold text-gray-200">{t.name}</div>
              <div className="text-xs text-gray-500">{t.role} · {(t.groups || []).join(', ')}</div>
            </div>
            <button onClick={() => openEdit(t)} className="text-xs text-gray-500 hover:text-orange-400">Uredi</button>
            <button onClick={() => remove(t.id)} className="text-xs text-gray-600 hover:text-red-400">✕</button>
          </div>
        ))}
      </div>

      {editing !== null && (
        <Modal title={editing === 'new' ? 'Novi trener' : 'Uredi trenera'} onClose={() => setEditing(null)}>
          <FormField label="Ime *">
            <input className={inputClass} value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} />
          </FormField>
          <FormField label="Uloga">
            <input className={inputClass} value={form.role || ''} onChange={e => setForm({ ...form, role: e.target.value })} placeholder="npr. Glavna trenerica" />
          </FormField>
          <FormField label="Grupe (odvojene zarezom)">
            <input className={inputClass} value={form.groupsText || ''} onChange={e => setForm({ ...form, groupsText: e.target.value })} placeholder="Djeca 1, Djeca 2" />
          </FormField>
          <div className="flex gap-3 mt-6">
            <button onClick={save} className={btnPrimary}>Sačuvaj</button>
            <button onClick={() => setEditing(null)} className={btnSecondary}>Otkaži</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ============================================================
// GROUPS ADMIN (with color picker)
// ============================================================
function GroupsAdmin() {
  const { trainingGroups, updateGroups } = useAster();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  const openNew = () => {
    setForm({ id: '', name: '', level: '', days: [], time: '', color: '#f59e0b' });
    setEditing('new');
  };

  const openEdit = (g) => {
    setForm({ ...g, daysText: (g.days || []).join(', ') });
    setEditing(g.id);
  };

  const save = () => {
    if (!form.name.trim()) return;
    const days = (form.daysText || '').split(',').map(s => s.trim()).filter(Boolean);
    const groupData = {
      id: form.id || form.name.toLowerCase().replace(/\s+/g, '_'),
      name: form.name,
      level: form.level || '',
      days,
      time: form.time || '',
      color: form.color || '#6b7280',
      bgColor: (form.color || '#6b7280') + '15',
    };
    let updated;
    if (editing === 'new') {
      updated = [...trainingGroups, groupData];
    } else {
      updated = trainingGroups.map(g => g.id === editing ? { ...g, ...groupData } : g);
    }
    updateGroups(updated);
    setEditing(null);
  };

  const remove = (id) => {
    if (confirm('Obrisati grupu?')) {
      updateGroups(trainingGroups.filter(g => g.id !== id));
    }
  };

  return (
    <div>
      <div className="flex gap-3 mb-5 items-center">
        <button onClick={openNew} className={btnPrimary}>+ Nova grupa</button>
        <span className="text-sm text-gray-500 ml-auto">{trainingGroups.length} grupa</span>
      </div>

      <div className="space-y-2">
        {trainingGroups.map(g => (
          <div key={g.id} className="flex items-center gap-3 bg-gray-800/40 rounded-lg px-4 py-3 border border-gray-800">
            <div className="w-4 h-4 rounded-full shrink-0" style={{ backgroundColor: g.color }}></div>
            <div className="flex-1">
              <div className="text-sm font-semibold" style={{ color: g.color }}>{g.name}</div>
              <div className="text-xs text-gray-500">{(g.days || []).join(', ')} · {g.time} · {g.level}</div>
            </div>
            <button onClick={() => openEdit(g)} className="text-xs text-gray-500 hover:text-orange-400">Uredi</button>
            <button onClick={() => remove(g.id)} className="text-xs text-gray-600 hover:text-red-400">✕</button>
          </div>
        ))}
      </div>

      {editing !== null && (
        <Modal title={editing === 'new' ? 'Nova grupa' : 'Uredi grupu'} onClose={() => setEditing(null)}>
          <FormField label="Naziv *">
            <input className={inputClass} value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} />
          </FormField>
          <FormField label="ID (automatski iz naziva)">
            <input className={inputClass} value={form.id || ''} onChange={e => setForm({ ...form, id: e.target.value })} placeholder="npr. pocetna" />
          </FormField>
          <FormField label="Nivo">
            <input className={inputClass} value={form.level || ''} onChange={e => setForm({ ...form, level: e.target.value })} placeholder="npr. Početni, Srednji, Napredni" />
          </FormField>
          <FormField label="Dani (odvojeni zarezom)">
            <input className={inputClass} value={form.daysText || ''} onChange={e => setForm({ ...form, daysText: e.target.value })} placeholder="Pon, Uto, Sri" />
          </FormField>
          <FormField label="Vrijeme">
            <input className={inputClass} value={form.time || ''} onChange={e => setForm({ ...form, time: e.target.value })} placeholder="18:00-19:00" />
          </FormField>
          <FormField label="Boja">
            <div className="flex items-center gap-3">
              <input type="color" value={form.color || '#f59e0b'} onChange={e => setForm({ ...form, color: e.target.value })}
                className="w-10 h-10 rounded-lg border border-gray-700 cursor-pointer bg-transparent" />
              <input className={inputClass} value={form.color || ''} onChange={e => setForm({ ...form, color: e.target.value })} placeholder="#f59e0b" />
              <div className="w-8 h-8 rounded-full" style={{ backgroundColor: form.color || '#6b7280' }}></div>
            </div>
          </FormField>
          <div className="flex gap-3 mt-6">
            <button onClick={save} className={btnPrimary}>Sačuvaj</button>
            <button onClick={() => setEditing(null)} className={btnSecondary}>Otkaži</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ============================================================
// SCHEDULE ADMIN
// ============================================================
function ScheduleAdmin() {
  const { weeklySchedule, trainingGroups, members, updateSchedule, dayNames } = useAster();
  const [filterDay, setFilterDay] = useState('all');
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  const filtered = filterDay === 'all' ? weeklySchedule : weeklySchedule.filter(s => s.day === filterDay);
  const sorted = [...filtered].sort((a, b) => {
    const dayOrder = dayNames.indexOf(a.day) - dayNames.indexOf(b.day);
    if (dayOrder !== 0) return dayOrder;
    return a.time.localeCompare(b.time);
  });

  const openNew = () => {
    setForm({ day: 'Pon', time: '', duration: 60, type: 'group', group: '', student: '', dance: '' });
    setEditing('new');
  };

  const openEdit = (slot, idx) => {
    setForm({ ...slot, _idx: idx });
    setEditing(idx);
  };

  const save = () => {
    if (!form.time) return;
    const slot = {
      day: form.day,
      time: form.time,
      duration: parseInt(form.duration) || 60,
      type: form.type,
    };
    if (form.type === 'group') {
      slot.group = form.group;
    } else {
      slot.student = form.student;
      slot.dance = form.dance || null;
    }

    let updated;
    if (editing === 'new') {
      updated = [...weeklySchedule, slot];
    } else {
      updated = weeklySchedule.map((s, i) => i === editing ? slot : s);
    }
    updateSchedule(updated);
    setEditing(null);
  };

  const remove = (globalIdx) => {
    if (confirm('Obrisati termin?')) {
      updateSchedule(weeklySchedule.filter((_, i) => i !== globalIdx));
    }
  };

  // Map filtered indices back to global indices
  const getGlobalIndex = (slot) => weeklySchedule.indexOf(slot);

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-5 items-center">
        <select value={filterDay} onChange={e => setFilterDay(e.target.value)} className={selectClass + " max-w-xs"}>
          <option value="all">Svi dani</option>
          {dayNames.slice(0, 6).map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <button onClick={openNew} className={btnPrimary}>+ Novi termin</button>
        <span className="text-sm text-gray-500 ml-auto">{weeklySchedule.length} termina</span>
      </div>

      <div className="space-y-1">
        {sorted.map((slot) => {
          const gi = getGlobalIndex(slot);
          const groupInfo = slot.type === 'group' ? trainingGroups.find(g => g.id === slot.group) : null;
          return (
            <div key={gi} className="flex items-center gap-3 bg-gray-800/40 rounded-lg px-4 py-2.5 border border-gray-800">
              <span className="text-xs font-mono font-bold text-gray-500 w-10">{slot.day}</span>
              <span className="text-sm font-mono font-bold text-gray-300 w-14">{slot.time}</span>
              {slot.type === 'group' ? (
                <div className="flex-1">
                  <span className="text-sm font-semibold" style={{ color: groupInfo?.color || '#6b7280' }}>{groupInfo?.name || slot.group}</span>
                  <span className="text-xs text-gray-500 ml-2">{slot.duration} min</span>
                </div>
              ) : (
                <div className="flex-1">
                  <span className="text-sm font-semibold text-orange-400">{slot.student}</span>
                  {slot.dance && <span className="text-xs text-orange-300/60 ml-2">{slot.dance}</span>}
                  <span className="text-xs text-gray-500 ml-2">{slot.duration} min · Individualni</span>
                </div>
              )}
              <button onClick={() => openEdit(slot, gi)} className="text-xs text-gray-500 hover:text-orange-400">Uredi</button>
              <button onClick={() => remove(gi)} className="text-xs text-gray-600 hover:text-red-400">✕</button>
            </div>
          );
        })}
      </div>

      {editing !== null && (
        <Modal title={editing === 'new' ? 'Novi termin' : 'Uredi termin'} onClose={() => setEditing(null)}>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Dan">
              <select className={selectClass} value={form.day} onChange={e => setForm({ ...form, day: e.target.value })}>
                {dayNames.slice(0, 6).map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </FormField>
            <FormField label="Vrijeme *">
              <input className={inputClass} value={form.time || ''} onChange={e => setForm({ ...form, time: e.target.value })} placeholder="18:00" />
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Trajanje (min)">
              <input type="number" className={inputClass} value={form.duration || ''} onChange={e => setForm({ ...form, duration: e.target.value })} />
            </FormField>
            <FormField label="Tip">
              <select className={selectClass} value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                <option value="group">Grupni</option>
                <option value="individual">Individualni</option>
              </select>
            </FormField>
          </div>

          {form.type === 'group' ? (
            <FormField label="Grupa">
              <select className={selectClass} value={form.group || ''} onChange={e => setForm({ ...form, group: e.target.value })}>
                <option value="">— Odaberi —</option>
                {trainingGroups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
              </select>
            </FormField>
          ) : (
            <>
              <FormField label="Učenica">
                <select className={selectClass} value={form.student || ''} onChange={e => setForm({ ...form, student: e.target.value })}>
                  <option value="">— Odaberi —</option>
                  {members.map(m => <option key={m.id} value={m.name}>{m.fullName} ({m.name})</option>)}
                </select>
              </FormField>
              <FormField label="Ples / Trener">
                <input className={inputClass} value={form.dance || ''} onChange={e => setForm({ ...form, dance: e.target.value })} placeholder="npr. Cha-cha/Jive" />
              </FormField>
            </>
          )}

          <div className="flex gap-3 mt-6">
            <button onClick={save} className={btnPrimary}>Sačuvaj</button>
            <button onClick={() => setEditing(null)} className={btnSecondary}>Otkaži</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ============================================================
// COMPETITIONS ADMIN
// ============================================================
function CompetitionsAdmin() {
  const { competitions, updateCompetitions } = useAster();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  const sorted = [...competitions].sort((a, b) => a.date.localeCompare(b.date));

  const openNew = () => {
    setForm({ date: '', endDate: '', city: '', country: '', flag: '', type: '', org: '', categories: '', venue: '', note: '', highlight: false });
    setEditing('new');
  };

  const openEdit = (c) => {
    setForm({ ...c });
    setEditing(c.id);
  };

  const save = () => {
    if (!form.date || !form.city) return;
    let updated;
    if (editing === 'new') {
      const maxId = Math.max(0, ...competitions.map(c => c.id));
      const newComp = { ...form, id: maxId + 1, endDate: form.endDate || undefined, highlight: form.highlight || false };
      updated = [...competitions, newComp];
    } else {
      updated = competitions.map(c => c.id === editing ? { ...c, ...form } : c);
    }
    updateCompetitions(updated);
    setEditing(null);
  };

  const remove = (id) => {
    if (confirm('Obrisati takmičenje?')) {
      updateCompetitions(competitions.filter(c => c.id !== id));
    }
  };

  const flagOptions = [
    { code: '🇧🇦', label: 'BiH' }, { code: '🇭🇷', label: 'Hrvatska' }, { code: '🇷🇸', label: 'Srbija' },
    { code: '🇹🇷', label: 'Turska' }, { code: '🇬🇷', label: 'Grčka' }, { code: '🇩🇪', label: 'Njemačka' },
    { code: '🇦🇹', label: 'Austrija' }, { code: '🇨🇿', label: 'Češka' }, { code: '🇪🇸', label: 'Španija' },
    { code: '🇮🇹', label: 'Italija' }, { code: '🇫🇷', label: 'Francuska' }, { code: '🇬🇧', label: 'UK' },
  ];

  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      <div className="flex gap-3 mb-5 items-center">
        <button onClick={openNew} className={btnPrimary}>+ Novo takmičenje</button>
        <span className="text-sm text-gray-500 ml-auto">{competitions.length} takmičenja · {competitions.filter(c => c.date >= today).length} nadolazećih</span>
      </div>

      <div className="space-y-1">
        {sorted.map(c => {
          const isPast = c.date < today;
          return (
            <div key={c.id} className={`flex items-center gap-3 rounded-lg px-4 py-2.5 border ${isPast ? 'bg-gray-800/20 border-gray-800/50 opacity-60' : c.highlight ? 'bg-orange-500/5 border-orange-500/20' : 'bg-gray-800/40 border-gray-800'}`}>
              <span className="text-sm font-mono text-gray-400 w-24 shrink-0">{c.date}</span>
              <span className="text-lg">{c.flag}</span>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-semibold text-white">{c.city}</span>
                <span className="text-xs text-gray-500 ml-2">{c.type}</span>
                {c.org && <span className="text-xs text-gray-600 ml-2">({c.org})</span>}
                {c.highlight && <span className="text-xs text-orange-400 ml-2">⭐</span>}
              </div>
              <button onClick={() => openEdit(c)} className="text-xs text-gray-500 hover:text-orange-400">Uredi</button>
              <button onClick={() => remove(c.id)} className="text-xs text-gray-600 hover:text-red-400">✕</button>
            </div>
          );
        })}
      </div>

      {editing !== null && (
        <Modal title={editing === 'new' ? 'Novo takmičenje' : 'Uredi takmičenje'} onClose={() => setEditing(null)}>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Datum *">
              <input type="date" className={inputClass} value={form.date || ''} onChange={e => setForm({ ...form, date: e.target.value })} />
            </FormField>
            <FormField label="Kraj datuma">
              <input type="date" className={inputClass} value={form.endDate || ''} onChange={e => setForm({ ...form, endDate: e.target.value })} />
            </FormField>
          </div>
          <FormField label="Grad *">
            <input className={inputClass} value={form.city || ''} onChange={e => setForm({ ...form, city: e.target.value })} />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Država">
              <input className={inputClass} value={form.country || ''} onChange={e => setForm({ ...form, country: e.target.value })} placeholder="BA, HR, RS..." />
            </FormField>
            <FormField label="Zastava">
              <select className={selectClass} value={form.flag || ''} onChange={e => setForm({ ...form, flag: e.target.value })}>
                <option value="">— Odaberi —</option>
                {flagOptions.map(f => <option key={f.code} value={f.code}>{f.code} {f.label}</option>)}
              </select>
            </FormField>
          </div>
          <FormField label="Tip takmičenja">
            <input className={inputClass} value={form.type || ''} onChange={e => setForm({ ...form, type: e.target.value })} placeholder="Solo, grupa, formacija" />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Organizacija">
              <select className={selectClass} value={form.org || ''} onChange={e => setForm({ ...form, org: e.target.value })}>
                <option value="">— Nema —</option>
                <option value="WDSF">WDSF</option>
                <option value="IDO">IDO</option>
                <option value="Državno">Državno</option>
              </select>
            </FormField>
            <FormField label="Istaknuto">
              <label className="flex items-center gap-2 mt-2 cursor-pointer">
                <input type="checkbox" checked={form.highlight || false} onChange={e => setForm({ ...form, highlight: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-600 text-orange-500 focus:ring-orange-500 bg-gray-800" />
                <span className="text-sm text-gray-300">Europsko / Svjetsko</span>
              </label>
            </FormField>
          </div>
          <FormField label="Kategorije">
            <input className={inputClass} value={form.categories || ''} onChange={e => setForm({ ...form, categories: e.target.value })} />
          </FormField>
          <FormField label="Dvorana / Lokacija">
            <input className={inputClass} value={form.venue || ''} onChange={e => setForm({ ...form, venue: e.target.value })} />
          </FormField>
          <FormField label="Napomena">
            <input className={inputClass} value={form.note || ''} onChange={e => setForm({ ...form, note: e.target.value })} />
          </FormField>
          <div className="flex gap-3 mt-6">
            <button onClick={save} className={btnPrimary}>Sačuvaj</button>
            <button onClick={() => setEditing(null)} className={btnSecondary}>Otkaži</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ============================================================
// ANNOUNCEMENTS ADMIN
// ============================================================
function AnnouncementsAdmin() {
  const { announcements, addAnnouncement, removeAnnouncement } = useAster();
  const [text, setText] = useState('');

  const send = () => {
    if (!text.trim()) return;
    addAnnouncement(text.trim());
    setText('');
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-400 mb-3">Nova obavijest</h3>
        <div className="flex gap-3">
          <input className={inputClass + " flex-1"} value={text} onChange={e => setText(e.target.value)} placeholder="Unesite poruku za roditelje..."
            onKeyDown={e => e.key === 'Enter' && send()} />
          <button onClick={send} className={btnPrimary}>Pošalji</button>
        </div>
        <p className="text-xs text-gray-600 mt-2">Obavijesti se prikazuju na glavnoj stranici. Prikazuju se zadnje 3 obavijesti.</p>
      </div>

      <h3 className="text-sm font-semibold text-gray-400 mb-3">Aktivne obavijesti ({announcements.length})</h3>
      {announcements.length === 0 ? (
        <div className="text-sm text-gray-600 text-center py-8">Nema aktivnih obavijesti</div>
      ) : (
        <div className="space-y-2">
          {announcements.map(ann => (
            <div key={ann.id} className="flex items-start gap-3 bg-orange-500/5 border border-orange-500/20 rounded-xl px-4 py-3">
              <span className="text-orange-400 shrink-0 mt-0.5">📢</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-200">{ann.text}</div>
                <div className="text-xs text-gray-500 mt-1">{new Date(ann.date).toLocaleString('bs')}</div>
              </div>
              <button onClick={() => removeAnnouncement(ann.id)} className="text-xs text-gray-600 hover:text-red-400 shrink-0">✕ Obriši</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================
// MAIN ADMIN CONTENT
// ============================================================
function AdminContent() {
  const { resetToDefaults } = useAster();
  const [activeTab, setActiveTab] = useState('members');

  const handleReset = () => {
    if (confirm('Resetovati sve podatke na originalne vrijednosti? Ovo će obrisati sve promjene.')) {
      resetToDefaults();
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-10">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/aster" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-orange-400 transition-colors">
            ← Nazad na Aster
          </Link>
          <button onClick={handleReset} className={btnDanger}>↻ Reset na default</button>
        </div>

        <header className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-600 rounded-xl flex items-center justify-center text-lg">
              ⚙️
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
              <p className="text-sm text-gray-500">Upravljanje podacima Aster PK</p>
            </div>
          </div>

          <div className="flex gap-1 bg-gray-900/50 p-1 rounded-xl border border-gray-800 overflow-x-auto">
            {adminTabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap
                  ${activeTab === tab.id
                    ? 'bg-gradient-to-r from-orange-500/20 to-pink-500/20 text-orange-400 border border-orange-500/20'
                    : 'text-gray-500 hover:text-gray-300 border border-transparent'}`}>
                <span className="text-sm">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </header>

        <main className="min-h-[60vh]">
          {activeTab === 'members' && <MembersAdmin />}
          {activeTab === 'trainers' && <TrainersAdmin />}
          {activeTab === 'groups' && <GroupsAdmin />}
          {activeTab === 'schedule' && <ScheduleAdmin />}
          {activeTab === 'competitions' && <CompetitionsAdmin />}
          {activeTab === 'announcements' && <AnnouncementsAdmin />}
        </main>

        <footer className="mt-12 pt-6 border-t border-gray-800/50 text-center">
          <p className="text-xs text-gray-600">Aster Admin Panel · Podaci se čuvaju u lokalnom pregledniku (localStorage)</p>
        </footer>
      </div>
    </div>
  );
}

// ============================================================
// MAIN PAGE (with auth gate)
// ============================================================
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setAuthed(sessionStorage.getItem('aster_admin') === 'true');
    setChecked(true);
  }, []);

  if (!checked) return null;

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />;

  return (
    <AsterProvider>
      <AdminContent />
    </AsterProvider>
  );
}
