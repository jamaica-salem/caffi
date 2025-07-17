// Imports
import { useState, useMemo, useRef, useEffect } from 'react';
import { Card } from '../reusable/Card';
import { Search, Plus, X, Trash2 } from 'lucide-react';
import clsx from 'clsx';
import api from '../api';

export const Library = () => {
  // -------------------------------
  // General State
  // -------------------------------
  const [activeTab, setActiveTab] = useState('agencies');
  const [searchTerm, setSearchTerm] = useState('');
  const [classificationFilter, setClassificationFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const fileInputRef = useRef(null);

  // -------------------------------
  // Agency States & Effects
  // -------------------------------
  const [agencyModalOpen, setAgencyModalOpen] = useState(false);
  const [agencies, setAgencies] = useState([]);
  const [editingAgencyId, setEditingAgencyId] = useState(null);
  const [newAgency, setNewAgency] = useState({
    logo: null,
    logoPreview: null,
    active: false,
    name: '',
    shortName: '',
    classification: '',
    address: '',
    head: '',
    position: '',
    contact: '',
  });

  useEffect(() => {
    fetchAgencies();
  }, []);

  const fetchAgencies = async () => {
    try {
      const response = await api.get('/agencies');
      setAgencies(response.data);
    } catch (error) {
      console.error('Error fetching agencies:', error);
    }
  };

  const filteredAgencies = useMemo(() => {
    return agencies.filter((entry) =>
      entry.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, agencies]);

  const handleAddAgency = () => {
    setEditingAgencyId(null);
    setNewAgency({
      logo: null,
      logoPreview: null,
      active: false,
      name: '',
      shortName: '',
      classification: '',
      address: '',
      head: '',
      position: '',
      contact: '',
    });
    setAgencyModalOpen(true);
  };

  const handleSaveAgency = async () => {
    const formData = new FormData();
    formData.append('name', newAgency.name || '');
    formData.append('short_name', newAgency.shortName || '');
    formData.append('classification', newAgency.classification || '');
    formData.append('address', newAgency.address || '');
    formData.append('head_name', newAgency.head || '');
    formData.append('head_position', newAgency.position || '');
    formData.append('contact_details', newAgency.contact || '');
    formData.append('is_active', newAgency.active ? '1' : '0');

    if (newAgency.logo) {
      formData.append('logo', newAgency.logo);
    }

    try {
      const url = editingAgencyId
        ? `/agencies/${editingAgencyId}?_method=PUT`
        : '/agencies';

      await api.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      fetchAgencies();
      setAgencyModalOpen(false);
    } catch (error) {
      if (error.response?.data?.errors) {
        console.error('Validation errors:', error.response.data.errors);
      } else {
        console.error('Failed to save agency:', error);
      }
    }
  };

  const handleEditAgency = (agency) => {
    setEditingAgencyId(agency.id);
    setNewAgency({
      logo: null,
      logoPreview: agency.logo_path ? `${import.meta.env.VITE_API_URL}/storage/${agency.logo_path}` : null,
      active: agency.is_active,
      name: agency.name,
      shortName: agency.short_name,
      classification: agency.classification,
      address: agency.address,
      head: agency.head_name,
      position: agency.head_position,
      contact: agency.contact_details,
    });
    setAgencyModalOpen(true);
  };

  const handleDeleteAgency = async () => {
    if (!editingAgencyId || !window.confirm('Are you sure you want to delete this agency?')) return;

    try {
      await api.delete(`/agencies/${editingAgencyId}`);
      fetchAgencies();
      setAgencyModalOpen(false);
    } catch (error) {
      console.error('Failed to delete agency:', error);
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'image/jpeg' && file.size <= 240 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewAgency((prev) => ({
          ...prev,
          logo: file,
          logoPreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      alert('Only JPEG images under 240KB are allowed.');
    }
  };

  const handleLogoDelete = () => {
    setNewAgency((prev) => ({
      ...prev,
      logo: null,
      logoPreview: null,
    }));
  };

  // -------------------------------
  // Auditor States & Effects
  // -------------------------------
  const [auditorModalOpen, setAuditorModalOpen] = useState(false);
  const [auditors, setAuditors] = useState([]);
  const [editingAuditorId, setEditingAuditorId] = useState(null);
  const [newAuditor, setNewAuditor] = useState({
    is_external: false,
    is_active: false,
    last_name: '',
    first_name: '',
    middle_name: '',
    suffix: '',
    prefix: '',
    position: '',
    salary: '',
    agency_id: '',
    expertise: '',
    email: '',
    tin: '',
    birthdate: '',
    contact_no: '',
    status: '',
  });

  useEffect(() => {
    fetchAuditors();
  }, []);

  const fetchAuditors = async () => {
    try {
      const response = await api.get('/auditors');
      setAuditors(response.data);
    } catch (error) {
      console.error('Error fetching auditors:', error);
    }
  };

  const filteredAuditors = useMemo(() => {
    return auditors.filter((entry) =>
      entry.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.last_name.toLowerCase().includes(searchTerm.toLowerCase())
    ).filter(entry =>
      (classificationFilter ? entry.classification === classificationFilter : true) &&
      (statusFilter ? entry.status === statusFilter : true)
    );
  }, [searchTerm, classificationFilter, statusFilter, auditors]);

  const handleAddAuditor = () => {
    setEditingAuditorId(null);
    setNewAuditor({
      is_external: false,
      is_active: false,
      last_name: '',
      first_name: '',
      middle_name: '',
      suffix: '',
      prefix: '',
      position: '',
      salary: '',
      agency_id: '',
      expertise: '',
      email: '',
      tin: '',
      birthdate: '',
      contact_no: '',
      status: '',
    });
    setAuditorModalOpen(true);
  };

  const handleSaveAuditor = async () => {
    const formData = new FormData();
    formData.append('is_external', newAuditor.is_external ? '1' : '0');
    formData.append('is_active', newAuditor.is_active ? '1' : '0');
    formData.append('last_name', newAuditor.last_name || '');
    formData.append('first_name', newAuditor.first_name || '');
    formData.append('middle_name', newAuditor.middle_name || '');
    formData.append('suffix', newAuditor.suffix || '');
    formData.append('prefix', newAuditor.prefix || '');
    formData.append('position', newAuditor.position || '');
    formData.append('salary', newAuditor.salary || '');
    formData.append('agency_id', newAuditor.agency_id || '');
    formData.append('expertise', newAuditor.expertise || '');
    formData.append('email', newAuditor.email || '');
    formData.append('tin', newAuditor.tin || '');
    formData.append('birthdate', newAuditor.birthdate || '');
    formData.append('contact_no', newAuditor.contact_no || '');
    formData.append('status', newAuditor.status === 0 || newAuditor.status ? newAuditor.status : '');


    try {
      const url = editingAuditorId
        ? `/auditors/${editingAuditorId}?_method=PUT`
        : '/auditors';

      await api.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      fetchAuditors();
      setAuditorModalOpen(false);
    } catch (error) {
      if (error.response?.data?.errors) {
        console.error('Validation errors:', error.response.data.errors);
      } else {
        console.error('Failed to save newAuditor:', error);
      }
    }
  };

  const handleEditAuditor = (auditor) => {
    setEditingAuditorId(auditor.id);
    setNewAuditor({
      is_external: auditor.is_external,
      is_active: auditor.is_active,
      last_name: auditor.last_name || '',
      first_name: auditor.first_name || '',
      middle_name: auditor.middle_name || '',
      suffix: auditor.suffix || '',
      prefix: auditor.prefix || '',
      position: auditor.position || '',
      salary: auditor.salary || '',
      agency_id: auditor.agency_id || '',
      expertise: auditor.expertise || '',
      email: auditor.email || '',
      tin: auditor.tin || '',
      birthdate: auditor.birthdate || '',
      contact_no: auditor.contact_no || '',
      status: auditor.status || '',
    });
    setAuditorModalOpen(true);
  };


  const handleDeleteAuditor = async () => {
    if (!editingAuditorId || !window.confirm('Are you sure you want to delete this newAuditor?')) return;

    try {
      await api.delete(`/auditors/${editingAuditorId}`);
      fetchAuditors();
      setAuditorModalOpen(false);
    } catch (error) {
      console.error('Failed to delete newAuditor:', error);
    }
  };

  // -------------------------------
  // Miscellaneous Handlers
  // -------------------------------
  const handleClearSearch = () => setSearchTerm('');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchTerm('');
    setClassificationFilter('');
    setStatusFilter('');
    setAgencyModalOpen(false);
    setAuditorModalOpen(false);
  };

  return (
    <>
      <Card title="Library">
        {/* Tab Navigation */}
        <div className="flex border-b mb-4">
          {['agencies', 'auditors'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={clsx(
                'px-4 py-2 font-semibold capitalize transition',
                activeTab === tab
                  ? 'border-b-4 border-accent text-accent'
                  : 'text-gray-500 hover:text-primary-darkest'
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Top Controls */}
        <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
          {/* Search and Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Search ${activeTab === 'agencies' ? 'agencies' : 'auditors'}...`}
                className="pl-10 pr-8 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:outline-none"
              />
              {searchTerm && (
                <X
                  size={18}
                  className="absolute right-2 top-2.5 cursor-pointer text-gray-500 hover:text-red-500"
                  onClick={handleClearSearch}
                />
              )}
            </div>

            {activeTab === 'auditors' && (
              <>
                <select
                  value={classificationFilter}
                  onChange={(e) => setClassificationFilter(e.target.value)}
                  className="py-2 px-3 rounded-lg border border-gray-300 text-sm"
                >
                  <option value="">All Classifications</option>
                  <option value="Internal">Internal</option>
                  <option value="External">External</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="py-2 px-3 rounded-lg border border-gray-300 text-sm"
                >
                  <option value="">All Status</option>
                  <option value="Not Connected">Not Connected</option>
                  <option value="Connected">Connected</option>
                  <option value="Retired">Retired</option>
                  <option value="Deceased">Deceased</option>
                </select>
              </>
            )}
          </div>

          {/* Right Side - Entries and Add Button */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {activeTab === 'agencies'
                ? `${filteredAgencies.length} entries`
                : `${filteredAuditors.length} entries`}
            </span>
            {activeTab === 'agencies' && (
              <button
                className="bg-accent text-white rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-green-700 transition"
                onClick={handleAddAgency}
              >
                <Plus size={16} /> Add
              </button>
            )}

            {activeTab === 'auditors' && (
              <button
                className="bg-accent text-white rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-green-700 transition"
                onClick={handleAddAuditor}
              >
                <Plus size={16} /> Add
              </button>
            )}
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-primary-lightest text-left text-sm text-primary-darkest uppercase tracking-wide">
              <tr>
                {activeTab === 'agencies' ? (
                  <>
                    <th className="p-3">Name</th>
                    <th className="p-3">Contact Details</th>
                    <th className="p-3">Head of Agency & Position</th>
                    <th className="p-3">Classification Group</th>
                  </>
                ) : (
                  <>
                    <th className="p-3">Name</th>
                    <th className="p-3">Agency & Position</th>
                    <th className="p-3">Contact Details</th>
                    <th className="p-3">Birthdate</th>
                    <th className="p-3">Expertise</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="text-sm text-primary-darkest">
              {(activeTab === 'agencies' ? filteredAgencies : filteredAuditors).map((item, index) => (
                <tr key={index} className="hover:bg-primary-light/40 transition">
                  {activeTab === 'agencies' ? (
                    <>
                      <td className="p-3 cursor-pointer hover:underline" onClick={() => handleEditAgency(item)}>
                        {item.name}
                      </td>
                      <td className="p-3 cursor-pointer hover:underline" onClick={() => handleEditAgency(item)}>
                        {item.contact_details}
                      </td>
                      <td className="p-3 cursor-pointer hover:underline" onClick={() => handleEditAgency(item)}>
                        {item.head_name} - {item.head_position}
                      </td>
                      <td className="p-3 cursor-pointer hover:underline" onClick={() => handleEditAgency(item)}>
                        {item.classification}
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-3 cursor-pointer hover:underline" onClick={() => handleEditAuditor(item)}>
                        {item.first_name} {item.middle_name ? item.middle_name + ' ' : ''}{item.last_name} {item.suffix ? item.suffix : ''}
                      </td>
                      <td className="p-3 cursor-pointer hover:underline" onClick={() => handleEditAuditor(item)}>
                        {item.short_name} {item.position}
                      </td>
                      <td className="p-3 cursor-pointer hover:underline" onClick={() => handleEditAuditor(item)}>
                        {item.email} {item.contact_no ? `(${item.contact_no})` : ''}
                      </td>
                      <td className="p-3 cursor-pointer hover:underline" onClick={() => handleEditAuditor(item)}>
                        {item.birthdate ? new Date(item.birthdate).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="p-3 cursor-pointer hover:underline" onClick={() => handleEditAuditor(item)}>
                        {item.expertise ?? 'N/A'}
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {(activeTab === 'agencies' ? filteredAgencies : filteredAuditors).length === 0 && (
                <tr>
                  <td colSpan={activeTab === 'agencies' ? 4 : 7} className="p-4 text-center text-gray-500">
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* AGENCY MODAL FORM */}
      {agencyModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white w-full max-w-3xl p-6 rounded-2xl shadow-2xl relative overflow-auto max-h-screen">
            
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Agency</h2>
              <X
                className="w-6 h-6 text-gray-500 hover:text-red-600 cursor-pointer transition"
                onClick={() => setAgencyModalOpen(false)}
              />
            </div>

            {/* Form Rows */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              
              {/* Logo and Active Toggle */}
              <div className="flex flex-col gap-2 relative group">
                <div
                  onDoubleClick={() => fileInputRef.current.click()}
                  className="w-32 h-32 border rounded-lg bg-gray-100 flex items-center justify-center cursor-pointer relative"
                >
                  {newAgency.logoPreview ? (
                    <img
                      src={newAgency.logoPreview}
                      alt="Agency Logo"
                      className="object-contain h-full w-full rounded-lg"
                    />
                  ) : (
                    <span className="text-xs text-gray-400 text-center px-2">Double click to upload</span>
                  )}
                  {newAgency.logoPreview && (
                    <Trash2
                      className="absolute top-1 right-1 text-red-500 opacity-0 group-hover:opacity-100 cursor-pointer"
                      size={18}
                      onClick={handleLogoDelete}
                    />
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg"
                  className="hidden"
                  onChange={handleLogoChange}
                />
              </div>

              <div className="flex justify-end items-center">
                <label className="mr-3 font-medium text-gray-700">Active:</label>
                <div
                  onClick={() => setNewAgency({ ...newAgency, active: !newAgency.active })}
                  className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition ${
                    newAgency.active ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                      newAgency.active ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </div>
              </div>

              {/* Name */}
              <div className="col-span-2">
                <input
                  type="text"
                  placeholder="Full Name of Agency"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-accent"
                  value={newAgency.name}
                  onChange={(e) => setNewAgency({ ...newAgency, name: e.target.value })}
                />
              </div>

              {/* Short Name and Classification */}
              <input
                type="text"
                placeholder="Short Name / Acronym"
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                value={newAgency.shortName}
                onChange={(e) => setNewAgency({ ...newAgency, shortName: e.target.value })}
              />
              <select
                className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-700"
                value={newAgency.classification}
                onChange={(e) => setNewAgency({ ...newAgency, classification: e.target.value })}
              >
                <option value="">Select Classification</option>
                <option value="C0">DOST-CO</option>
                <option value="SC">Sectoral Planning Council</option>
                <option value="CB">Collegial Bodies</option>
                <option value="RD">Research and Development Institutes</option>
                <option value="ST">Scientific and Technical Service</option>
                <option value="R0">Regional Offices</option>
              </select>

              {/* Address */}
              <div className="col-span-2">
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={newAgency.address}
                  onChange={(e) => setNewAgency({ ...newAgency, address: e.target.value })}
                />
              </div>

              {/* Head */}
              <div className="col-span-2">
                <input
                  type="text"
                  placeholder="Name of Head of Agency"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={newAgency.head}
                  onChange={(e) => setNewAgency({ ...newAgency, head: e.target.value })}
                />
              </div>

              {/* Position */}
              <div className="col-span-2">
                <input
                  type="text"
                  placeholder="Position of Head"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={newAgency.position}
                  onChange={(e) => setNewAgency({ ...newAgency, position: e.target.value })}
                />
              </div>

              {/* Contact */}
              <div className="col-span-2">
                <input
                  type="text"
                  placeholder="Contact Details"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={newAgency.contact}
                  onChange={(e) => setNewAgency({ ...newAgency, contact: e.target.value })}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-end gap-3">
              <button
                className="bg-white border border-accent text-accent px-4 py-2 rounded hover:bg-green-50"
                onClick={handleDeleteAgency}
              >
                Delete
              </button>
              <button
                className="bg-accent text-white px-5 py-2 rounded-md hover:bg-green-700 transition"
                onClick={handleSaveAgency}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AUDITOR MODAL FORM */}

      {auditorModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white w-full max-w-5xl p-6 rounded-2xl shadow-xl overflow-y-auto max-h-screen text-sm">
            
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h2 className="text-xl font-bold text-gray-800">Auditor</h2>
              <X className="cursor-pointer hover:text-red-500" onClick={() => setAuditorModalOpen(false)} />
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* First Row */}
              <div className="flex items-center gap-4">
                <label className="font-medium text-gray-700">Type:</label>
                <label className="flex items-center gap-1">
                  <input type="radio" name="aud_class" value="Internal" checked={newAuditor.classification === 'Internal'} onChange={(e) => setNewAuditor({ ...newAuditor, classification: e.target.value })} />
                  <span className="text-gray-700">Internal</span>
                </label>
                <label className="flex items-center gap-1">
                  <input type="radio" name="aud_class" value="External" checked={newAuditor.classification === 'External'} onChange={(e) => setNewAuditor({ ...newAuditor, classification: e.target.value })} />
                  <span className="text-gray-700">External</span>
                </label>
              </div>

              <div className="flex justify-end items-center">
                <label className="mr-3 font-medium text-gray-700">Active:</label>
                <div
                  onClick={() => setNewAuditor({ ...newAuditor, active: !newAuditor.active })}
                  className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition ${
                    newAuditor.active ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                      newAuditor.active ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </div>
              </div>

              {/* Second Row */}
              <input type="text" placeholder="Last Name" value={newAuditor.last_name} onChange={(e) => setNewAuditor({ ...newAuditor, last_name: e.target.value })} className="border border-gray-300 rounded px-3 py-2 w-full" />
              <input type="text" placeholder="First Name" value={newAuditor.first_name} onChange={(e) => setNewAuditor({ ...newAuditor, first_name: e.target.value })} className="border border-gray-300 rounded px-3 py-2 w-full" />

              {/* Third Row */}
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                <input type="text" placeholder="Middle Name" value={newAuditor.middle_name} onChange={(e) => setNewAuditor({ ...newAuditor, middle_name: e.target.value })} className="border border-gray-300 rounded px-3 py-2 w-full" />
                <input type="text" placeholder="ex. Jr." value={newAuditor.suffix} onChange={(e) => setNewAuditor({ ...newAuditor, suffix: e.target.value })} className="border border-gray-300 rounded px-3 py-2 w-full" />
                <input type="text" placeholder="ex. Mr." value={newAuditor.prefix} onChange={(e) => setNewAuditor({ ...newAuditor, prefix: e.target.value })} className="border border-gray-300 rounded px-3 py-2 w-full" />
              </div>

              {/* Fourth Row */}
              <input type="text" placeholder="Position" value={newAuditor.position} onChange={(e) => setNewAuditor({ ...newAuditor, position: e.target.value })} className="border border-gray-300 rounded px-3 py-2 w-full" />
              <input type="text" placeholder="Salary Grade" value={newAuditor.salary} onChange={(e) => setNewAuditor({ ...newAuditor, salary: e.target.value })} className="border border-gray-300 rounded px-3 py-2 w-full" />

              {/* Fifth Row */}
              <div className="flex items-center gap-2 md:col-span-2">
                <select className="w-full border border-gray-300 rounded px-3 py-2" value={newAuditor.agency} onChange={(e) => setNewAuditor({ ...newAuditor, agency: e.target.value })}>
                  <option value="">Select Agency</option>
                  {agencies.map((agency, idx) => (
                    <option key={idx} value={agency.name}>{agency.name}</option>
                  ))}
                </select>
                <button type="button" onClick={() => { setAuditorModalOpen(false); setAgencyModalOpen(true); }} className="bg-accent text-white px-3 py-2 rounded hover:bg-green-700">
                  +
                </button>
              </div>

              {/* Sixth Row */}
              <div className="flex items-center gap-2 md:col-span-2">
                <select
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={newAuditor.expertise || ''}
                  onChange={(e) =>
                    setNewAuditor({ ...newAuditor, expertise: e.target.value })
                  }
                >
                  <option value="" disabled>Select expertise</option>
                  {[
                    'Project Management',
                    'IT Audit',
                    'Data Analysis',
                    'Financial Audit',
                    'Risk Management',
                  ].map((skill, idx) => (
                    <option key={idx} value={skill}>
                      {skill}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="bg-accent text-white px-3 py-2 rounded hover:bg-green-700"
                >
                  +
                </button>
              </div>


              {/* Seventh Row */}
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                <input type="email" placeholder="Email Address" value={newAuditor.email} onChange={(e) => setNewAuditor({ ...newAuditor, email: e.target.value })} className="border border-gray-300 rounded px-3 py-2 w-full" />
                <input type="text" placeholder="000-000-000" value={newAuditor.tin} onChange={(e) => setNewAuditor({ ...newAuditor, tin: e.target.value })} className="border border-gray-300 rounded px-3 py-2 w-full" />
                <input type="date" value={newAuditor.birthdate} onChange={(e) => setNewAuditor({ ...newAuditor, birthdate: e.target.value })} className="border border-gray-300 rounded px-3 py-2 w-full" />
              </div>

              {/* Eighth Row */}
              <input type="text" placeholder="Contact Number" value={newAuditor.contact} onChange={(e) => setNewAuditor({ ...newAuditor, contact: e.target.value })} className="border border-gray-300 rounded px-3 py-2 w-full" />
              <select
                value={newAuditor.status ?? ''}
                onChange={(e) => {
                  const status = e.target.value;
                  setNewAuditor({
                    ...newAuditor,
                    status: parseInt(status),
                    active: ['0', '2', '3'].includes(status) ? false : newAuditor.active,
                  });
                }}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              >
                <option value="">Select Status</option>
                <option value={0}>Not Connected</option>
                <option value={1}>Connected</option>
                <option value={2}>Retired</option>
                <option value={3}>Deceased</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                className="bg-white border border-accent text-accent px-4 py-2 rounded hover:bg-green-50"
                onClick={handleDeleteAuditor}
              >
                Delete
              </button>
              <button
                className="bg-accent text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={handleSaveAuditor}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}


    </>
  );
};
