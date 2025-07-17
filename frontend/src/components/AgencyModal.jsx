import React, { useState, useRef } from 'react';
import { X, Trash2 } from 'lucide-react';

const classificationOptions = [
  { value: 'C0', label: 'DOST-CO' },
  { value: 'SC', label: 'Sectoral Planning Council' },
  { value: 'CB', label: 'Collegial Bodies' },
  { value: 'RD', label: 'Research and Development Institutes' },
  { value: 'ST', label: 'Scientific and Technical Service' },
  { value: 'R0', label: 'Regional Offices' },
];

const AgencyModal = ({ isOpen, onClose, onSave, onDelete }) => {
  const [logo, setLogo] = useState(null);
  const [hovering, setHovering] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const fileInputRef = useRef();

  const [form, setForm] = useState({
    name: '',
    shortName: '',
    classification: '',
    address: '',
    headName: '',
    headPosition: '',
    contact: '',
  });

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 240 * 1024 && file.type === 'image/jpeg') {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result);
      reader.readAsDataURL(file);
    } else {
      alert('Only JPEG images under 240KB are allowed.');
    }
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-6 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Agency</h2>
          <button onClick={onClose}><X className="w-6 h-6" /></button>
        </div>

        <div className="flex justify-between items-start mb-4">
          <div
            className="relative w-32 h-32 border rounded bg-gray-100 flex items-center justify-center"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onDoubleClick={() => fileInputRef.current.click()}
          >
            {logo ? (
              <img src={logo} alt="Logo" className="object-cover w-full h-full" />
            ) : (
              <span className="text-sm text-gray-500 text-center px-2">Double-click to upload</span>
            )}
            {hovering && logo && (
              <button
                className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
                onClick={() => setLogo(null)}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            )}
            <input
              type="file"
              accept="image/jpeg"
              className="hidden"
              ref={fileInputRef}
              onChange={handleLogoChange}
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm">Active</label>
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="w-5 h-5 accent-green-500"
            />
          </div>
        </div>

        {/* Fields */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium">Short Name / Acronym</label>
              <input
                name="shortName"
                type="text"
                value={form.shortName}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium">Classification / Group</label>
              <select
                name="classification"
                value={form.classification}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select</option>
                {classificationOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium">Name of Head of Agency</label>
            <input
              name="headName"
              type="text"
              value={form.headName}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Position of Head of Agency</label>
            <input
              name="headPosition"
              type="text"
              value={form.headPosition}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Contact Details</label>
            <input
              name="contact"
              type="text"
              value={form.contact}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            onClick={() => {
              if (window.confirm('Delete this agency?')) {
                onDelete?.();
                onClose();
              }
            }}
          >
            Delete
          </button>
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            onClick={() => {
              onSave?.({ ...form, logo, isActive });
              onClose();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgencyModal;
