import React, { useEffect, useState } from 'react';
import { X, Plus } from 'lucide-react';

const AuditorModal = ({ isOpen, onClose, onSubmit, editData, agencies = [] }) => {
  const [formData, setFormData] = useState({
    name: '',
    agency_id: '',
    expertise: [],
    email: '',
    status: 1,
    active: true,
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        ...editData,
        expertise: editData.expertise || [],
        active: [0, 2, 3].includes(editData.status) ? false : editData.active,
      });
    } else {
      setFormData({
        name: '',
        agency_id: '',
        expertise: [],
        email: '',
        status: 1,
        active: true,
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value, type, checked, options } = e.target;

    if (name === 'expertise') {
      const selected = Array.from(options).filter(o => o.selected).map(o => o.value);
      setFormData(prev => ({ ...prev, expertise: selected }));
    } else if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'status') {
      const newStatus = Number(value);
      setFormData(prev => ({
        ...prev,
        status: newStatus,
        active: [0, 2, 3].includes(newStatus) ? false : prev.active
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          {editData ? 'Edit Auditor' : 'Add Auditor'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Agency</label>
            <select
              name="agency_id"
              value={formData.agency_id}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Select Agency</option>
              {agencies.map(a => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Expertise</label>
            <select
              name="expertise"
              multiple
              value={formData.expertise}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 h-32"
            >
              <option value="Database">Database</option>
              <option value="Networking">Networking</option>
              <option value="Security">Security</option>
              <option value="Web Development">Web Development</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
              <option value={2}>Suspended</option>
              <option value={3}>Retired</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Active</label>
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
              disabled={[0, 2, 3].includes(Number(formData.status))}
              className="w-4 h-4"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            {editData ? 'Update Auditor' : 'Add Auditor'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuditorModal;
