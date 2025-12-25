
import React, { useEffect, useState } from 'react';
import './App.css';
const API_URL = process.env.REACT_APP_API_URL || '';

const EQUIPMENT_TYPES = ['Machine', 'Vessel', 'Tank', 'Mixer'];
const STATUS_OPTIONS = ['Active', 'Inactive', 'Under Maintenance'];

function EquipmentForm({ onSubmit, onCancel, initial }) {
  const [form, setForm] = useState(
    initial || {
      name: '',
      type: '',
      status: '',
      lastCleaned: '',
    }
  );
  const [errors, setErrors] = useState({});

  function validate() {
    const errs = {};
    if (!form.name) errs.name = 'Name required';
    if (!form.type) errs.type = 'Type required';
    if (!form.status) errs.status = 'Status required';
    if (!form.lastCleaned) errs.lastCleaned = 'Date required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  }

  return (
    <form className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block font-semibold mb-1">Name</label>
        <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400" />
        {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
      </div>
      <div>
        <label className="block font-semibold mb-1">Type</label>
        <select name="type" value={form.type} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400">
          <option value="">Select</option>
          {EQUIPMENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        {errors.type && <span className="text-red-500 text-sm">{errors.type}</span>}
      </div>
      <div>
        <label className="block font-semibold mb-1">Status</label>
        <select name="status" value={form.status} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400">
          <option value="">Select</option>
          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        {errors.status && <span className="text-red-500 text-sm">{errors.status}</span>}
      </div>
      <div>
        <label className="block font-semibold mb-1">Last Cleaned</label>
        <input type="date" name="lastCleaned" value={form.lastCleaned} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400" />
        {errors.lastCleaned && <span className="text-red-500 text-sm">{errors.lastCleaned}</span>}
      </div>
      <div className="flex gap-3 justify-end pt-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Save</button>
        <button type="button" onClick={onCancel} className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition">Cancel</button>
      </div>
    </form>
  );
}

function EquipmentTable({ data, onEdit, onDelete, onSort, sortKey, sortDir }) {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-2 px-4 cursor-pointer" onClick={() => onSort('name')}>Name {sortKey==='name' ? (sortDir==='asc'?'▲':'▼') : ''}</th>
            <th className="py-2 px-4 cursor-pointer" onClick={() => onSort('type')}>Type {sortKey==='type' ? (sortDir==='asc'?'▲':'▼') : ''}</th>
            <th className="py-2 px-4 cursor-pointer" onClick={() => onSort('status')}>Status {sortKey==='status' ? (sortDir==='asc'?'▲':'▼') : ''}</th>
            <th className="py-2 px-4 cursor-pointer" onClick={() => onSort('lastCleaned')}>Last Cleaned {sortKey==='lastCleaned' ? (sortDir==='asc'?'▲':'▼') : ''}</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr><td colSpan={5} className="text-center py-4">No equipment found.</td></tr>
          ) : data.map(eq => (
              <tr key={eq._id} className="border-b hover:bg-blue-50">
                <td className="py-2 px-4">{eq.name}</td>
                <td className="py-2 px-4">{eq.type}</td>
                <td className="py-2 px-4">{eq.status}</td>
                <td className="py-2 px-4">{eq.lastCleaned}</td>
                <td className="py-2 px-4 flex gap-2">
                  <button onClick={() => onEdit(eq)} className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition">Edit</button>
                  <button onClick={() => onDelete(eq._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">Delete</button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function App() {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');
  const [sortKey, setSortKey] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/api/equipment`)
      .then(r => r.json())
      .then(setEquipment)
      .catch(() => setError('Failed to load equipment'))
      .finally(() => setLoading(false));
  }, []);

  function handleAdd() {
    setEditing(null);
    setShowForm(true);
  }

  function handleEdit(eq) {
    setEditing(eq);
    setShowForm(true);
  }

  function handleDelete(id) {
    if (!window.confirm('Delete this equipment?')) return;
    fetch(`${API_URL}/api/equipment/${id}`, { method: 'DELETE' })
      .then(r => r.ok ? setEquipment(equipment.filter(e => e._id !== id)) : setError('Delete failed'));
  }

  function handleFormSubmit(data) {
    if (editing) {
      fetch(`${API_URL}/api/equipment/${editing._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then(r => r.json())
        .then(updated => {
          setEquipment(equipment.map(e => e._id === editing._id ? updated : e));
          setShowForm(false);
        })
        .catch(() => setError('Update failed'));
    } else {
      fetch(`${API_URL}/api/equipment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then(r => r.json())
        .then(newEq => {
          setEquipment([...equipment, newEq]);
          setShowForm(false);
        })
        .catch(() => setError('Add failed'));
    }
  }

  function handleSort(key) {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  }

  let filtered = equipment.filter(eq =>
    (!search || eq.name.toLowerCase().includes(search.toLowerCase())) &&
    (!filterType || eq.type === filterType)
  );
  filtered = filtered.sort((a, b) => {
    let v1 = a[sortKey], v2 = b[sortKey];
    if (sortKey === 'lastCleaned') {
      v1 = v1 || '';
      v2 = v2 || '';
    }
    if (v1 < v2) return sortDir === 'asc' ? -1 : 1;
    if (v1 > v2) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">Equipment Tracker</h1>
        {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
          <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full md:w-auto">Add Equipment</button>
          <input
            className="border rounded px-3 py-2 w-full md:w-1/3 focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Search by name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="border rounded px-3 py-2 w-full md:w-auto focus:outline-none focus:ring focus:border-blue-400"
          >
            <option value="">All Types</option>
            {EQUIPMENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        {showForm && (
          <EquipmentForm
            onSubmit={handleFormSubmit}
            onCancel={() => setShowForm(false)}
            initial={editing}
          />
        )}
        {loading ? <div className="text-center text-blue-600">Loading...</div> : (
          <EquipmentTable
            data={filtered}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onSort={handleSort}
            sortKey={sortKey}
            sortDir={sortDir}
          />
        )}
      </div>
    </div>
  );
}

export default App;
