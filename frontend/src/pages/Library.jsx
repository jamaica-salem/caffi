import { useState, useMemo, useRef, useEffect } from 'react';
import { Card } from '../reusable/Card';
import { Search, Plus, X, Trash2 } from 'lucide-react';
import clsx from 'clsx';
import api from '../api';

export const Library = () => {
  const [activeTab, setActiveTab] = useState('agencies');
  const [searchTerm, setSearchTerm] = useState('');
  const [classificationFilter, setClassificationFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [agencyModalOpen, setAgencyModalOpen] = useState(false);
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



  
  const [auditorModalOpen, setAuditorModalOpen] = useState(false);
  const [auditor, setAuditor] = useState({
    classification: 'Internal',
    active: true,
    lastName: '',
    firstName: '',
    middleName: '',
    suffix: '',
    prefix: '',
    position: '',
    salary: '',
    agency: '',
    expertise: [],
    email: '',
    tin: '',
    birthdate: '',
    contact: '',
    status: '',
  });


  const fileInputRef = useRef(null);

  const [agencies, setAgencies] = useState([]);
  const [editingAgencyId, setEditingAgencyId] = useState(null);

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


  const auditorData = [
    {
      name: 'Juan Dela Cruz',
      agency: 'DOST Region I',
      position: 'Internal Auditor',
      contact: 'juan@email.com / 09051234567',
      birthdate: '1990-06-15',
      expertise: 'Financial Audit',
      engagements: 'ICT Audit 2023',
      rating: '4.8',
      classification: 'Internal',
      status: 'Connected',
    },
    {
      name: 'Ana Santos',
      agency: 'Private Firm',
      position: 'Consultant',
      contact: 'ana@email.com / 09174569870',
      birthdate: '1982-04-10',
      expertise: 'Risk Management',
      engagements: 'DOST External 2024',
      rating: '4.5',
      classification: 'External',
      status: 'Retired',
    },
  ];

  const filteredAgencies = useMemo(() => {
    return agencies.filter((entry) =>
      entry.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, agencies]);

  const filteredAuditors = useMemo(() => {
    return auditorData.filter(
      (entry) =>
        entry.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (classificationFilter ? entry.classification === classificationFilter : true) &&
        (statusFilter ? entry.status === statusFilter : true)
    );
  }, [searchTerm, classificationFilter, statusFilter]);

  const handleClearSearch = () => setSearchTerm('');
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchTerm('');
    setClassificationFilter('');
    setStatusFilter('');
    setAgencyModalOpen(false);
  };

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

  const handleSaveAgency = async () => {
    const formData = new FormData();
    formData.append('name', newAgency.name || '');
    formData.append('short_name', newAgency.shortName || '');
    formData.append('classification', newAgency.classification || '');
    formData.append('address', newAgency.address || '');
    formData.append('head_name', newAgency.head || '');
    formData.append('head_position', newAgency.position || '');
    formData.append('contact_details', newAgency.contact || '');
    formData.append('is_active', newAgency.active ? '1' : '0'); // convert boolean to string

    if (newAgency.logo) {
      formData.append('logo', newAgency.logo);
    }

    try {
      if (editingAgencyId) {
        await api.post(`/agencies/${editingAgencyId}?_method=PUT`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await api.post('/agencies', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
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

  


  const handleDeleteAgency = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this agency?');
    if (!confirmDelete || !editingAgencyId) return;

    try {
      await api.delete(`/agencies/${editingAgencyId}`);
      fetchAgencies();
      setAgencyModalOpen(false);
    } catch (error) {
      console.error('Failed to delete agency:', error);
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
                onClick={() => setAuditorModalOpen(true)}
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
                    <th className="p-3">Engagements</th>
                    <th className="p-3">Rating</th>
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
                      <td className="p-3">{item.name}</td>
                      <td className="p-3">{item.agency} - {item.position}</td>
                      <td className="p-3">{item.contact}</td>
                      <td className="p-3">{item.birthdate}</td>
                      <td className="p-3">{item.expertise}</td>
                      <td className="p-3">{item.engagements}</td>
                      <td className="p-3">{item.rating}</td>
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
                  <input type="radio" name="aud_class" value="Internal" checked={auditor.classification === 'Internal'} onChange={(e) => setAuditor({ ...auditor, classification: e.target.value })} />
                  <span className="text-gray-700">Internal</span>
                </label>
                <label className="flex items-center gap-1">
                  <input type="radio" name="aud_class" value="External" checked={auditor.classification === 'External'} onChange={(e) => setAuditor({ ...auditor, classification: e.target.value })} />
                  <span className="text-gray-700">External</span>
                </label>
              </div>

              <div className="flex justify-end items-center">
                <label className="mr-3 font-medium text-gray-700">Active:</label>
                <div
                  onClick={() => setAuditor({ ...auditor, active: !auditor.active })}
                  className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition ${
                    auditor.active ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                      auditor.active ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </div>
              </div>

              {/* Second Row */}
              <input type="text" placeholder="Last Name" value={auditor.lastName} onChange={(e) => setAuditor({ ...auditor, lastName: e.target.value })} className="border border-gray-300 rounded px-3 py-2 w-full" />
              <input type="text" placeholder="First Name" value={auditor.firstName} onChange={(e) => setAuditor({ ...auditor, firstName: e.target.value })} className="border border-gray-300 rounded px-3 py-2 w-full" />

              {/* Third Row */}
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                <input type="text" placeholder="Middle Name" value={auditor.middleName} onChange={(e) => setAuditor({ ...auditor, middleName: e.target.value })} className="border border-gray-300 rounded px-3 py-2 w-full" />
                <input type="text" placeholder="ex. Jr." value={auditor.suffix} onChange={(e) => setAuditor({ ...auditor, suffix: e.target.value })} className="border border-gray-300 rounded px-3 py-2 w-full" />
                <input type="text" placeholder="ex. Mr." value={auditor.prefix} onChange={(e) => setAuditor({ ...auditor, prefix: e.target.value })} className="border border-gray-300 rounded px-3 py-2 w-full" />
              </div>

              {/* Fourth Row */}
              <input type="text" placeholder="Position" value={auditor.position} onChange={(e) => setAuditor({ ...auditor, position: e.target.value })} className="border border-gray-300 rounded px-3 py-2 w-full" />
              <input type="text" placeholder="Salary Grade" value={auditor.salary} onChange={(e) => setAuditor({ ...auditor, salary: e.target.value })} className="border border-gray-300 rounded px-3 py-2 w-full" />

              {/* Fifth Row */}
              <div className="flex items-center gap-2 md:col-span-2">
                <select className="w-full border border-gray-300 rounded px-3 py-2" value={auditor.agency} onChange={(e) => setAuditor({ ...auditor, agency: e.target.value })}>
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
                <select multiple className="w-full border border-gray-300 rounded px-3 py-2" value={auditor.expertise} onChange={(e) => setAuditor({ ...auditor, expertise: Array.from(e.target.selectedOptions, opt => opt.value) })}>
                  {['Project Management', 'IT Audit', 'Data Analysis', 'Financial Audit', 'Risk Management'].map((skill, idx) => (
                    <option key={idx} value={skill}>{skill}</option>
                  ))}
                </select>
                <button type="button" className="bg-accent text-white px-3 py-2 rounded hover:bg-green-700">+</button>
              </div>

              {/* Seventh Row */}
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                <input type="email" placeholder="Email Address" value={auditor.email} onChange={(e) => setAuditor({ ...auditor, email: e.target.value })} className="border border-gray-300 rounded px-3 py-2 w-full" />
                <input type="text" placeholder="000-000-000" value={auditor.tin} onChange={(e) => setAuditor({ ...auditor, tin: e.target.value })} className="border border-gray-300 rounded px-3 py-2 w-full" />
                <input type="date" value={auditor.birthdate} onChange={(e) => setAuditor({ ...auditor, birthdate: e.target.value })} className="border border-gray-300 rounded px-3 py-2 w-full" />
              </div>

              {/* Eighth Row */}
              <input type="text" placeholder="Contact Number" value={auditor.contact} onChange={(e) => setAuditor({ ...auditor, contact: e.target.value })} className="border border-gray-300 rounded px-3 py-2 w-full" />
              <select value={auditor.status} onChange={(e) => {
                const status = e.target.value;
                setAuditor({
                  ...auditor,
                  status,
                  active: ['Not Connected', 'Retired', 'Deceased'].includes(status) ? false : auditor.active,
                });
              }} className="border border-gray-300 rounded px-3 py-2 w-full">
                <option value="">Select Status</option>
                <option value="Not Connected">Not Connected</option>
                <option value="Connected">Connected</option>
                <option value="Retired">Retired</option>
                <option value="Deceased">Deceased</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                className="bg-white border border-accent text-accent px-4 py-2 rounded hover:bg-green-50"
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this auditor?')) {
                    console.log('Deleting auditor...');
                    setAuditorModalOpen(false);
                  }
                }}
              >
                Delete
              </button>
              <button
                className="bg-accent text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={() => {
                  console.log('Saving auditor:', auditor);
                  setAuditorModalOpen(false);
                }}
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
