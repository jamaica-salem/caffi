import { useState, useMemo, useRef, useEffect } from 'react';
import { Card } from '../reusable/Card';
import { Search, Plus, X, Trash2 } from 'lucide-react';
import clsx from 'clsx';

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

  const agencyData = [
    {
      name: 'Department of Agriculture',
      contact: 'da@email.com / 09123456789',
      head: 'Atty. Jose Reyes - Director',
      group: 'National',
    },
    {
      name: 'DOST Region I',
      contact: 'dost1@email.com / 09999887766',
      head: 'Engr. Maria Lopez - Regional Director',
      group: 'Regional',
    },
  ];

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
    return agencyData.filter((entry) =>
      entry.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

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

  const handleSaveAgency = () => {
    // In production, you would POST this data to the server
    console.log('Saving agency:', newAgency);
    setAgencyModalOpen(false);
  };

  const handleDeleteAgency = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this agency?');
    if (confirmDelete) {
      console.log('Deleted agency');
      setAgencyModalOpen(false);
    }
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
                      <td className="p-3">{item.name}</td>
                      <td className="p-3">{item.contact}</td>
                      <td className="p-3">{item.head}</td>
                      <td className="p-3">{item.group}</td>
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
          <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg relative overflow-auto max-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Agency</h2>
              <X
                className="cursor-pointer hover:text-red-500"
                onClick={() => setAgencyModalOpen(false)}
              />
            </div>

            {/* Form Rows */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Logo and Active Toggle */}
              <div className="flex flex-col items-start gap-2 relative">
                <div
                  onDoubleClick={() => fileInputRef.current.click()}
                  className="w-32 h-32 border rounded bg-gray-100 flex items-center justify-center cursor-pointer relative group"
                >
                  {newAgency.logoPreview ? (
                    <img src={newAgency.logoPreview} alt="Agency Logo" className="object-contain h-full" />
                  ) : (
                    <span className="text-sm text-gray-500">Double click to upload</span>
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

              <div className="flex items-center gap-2 mt-4">
                <label className="font-medium">Active:</label>
                <input
                  type="checkbox"
                  checked={newAgency.active}
                  onChange={(e) => setNewAgency({ ...newAgency, active: e.target.checked })}
                />
              </div>

              <input
                type="text"
                placeholder="Name"
                className="col-span-2 border rounded px-3 py-2"
                value={newAgency.name}
                onChange={(e) => setNewAgency({ ...newAgency, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Short Name / Acronym"
                className="border rounded px-3 py-2"
                value={newAgency.shortName}
                onChange={(e) => setNewAgency({ ...newAgency, shortName: e.target.value })}
              />
              <select
                className="border rounded px-3 py-2"
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
              <input
                type="text"
                placeholder="Address"
                className="col-span-2 border rounded px-3 py-2"
                value={newAgency.address}
                onChange={(e) => setNewAgency({ ...newAgency, address: e.target.value })}
              />
              <input
                type="text"
                placeholder="Name of Head of Agency"
                className="col-span-2 border rounded px-3 py-2"
                value={newAgency.head}
                onChange={(e) => setNewAgency({ ...newAgency, head: e.target.value })}
              />
              <input
                type="text"
                placeholder="Position of Head"
                className="col-span-2 border rounded px-3 py-2"
                value={newAgency.position}
                onChange={(e) => setNewAgency({ ...newAgency, position: e.target.value })}
              />
              <input
                type="text"
                placeholder="Contact Details"
                className="col-span-2 border rounded px-3 py-2"
                value={newAgency.contact}
                onChange={(e) => setNewAgency({ ...newAgency, contact: e.target.value })}
              />
            </div>

            {/* Actions */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={handleDeleteAgency}
              >
                Delete
              </button>
              <button
                className="bg-accent text-white px-4 py-2 rounded hover:bg-green-700"
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
          <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg relative overflow-auto max-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Auditor</h2>
              <X
                className="cursor-pointer hover:text-red-500"
                onClick={() => setAuditorModalOpen(false)}
              />
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {/* Row 1: Classification + Active */}
              <div className="flex items-center gap-4">
                <label className="font-medium">Type:</label>
                <label><input type="radio" name="aud_class" value="Internal" checked={auditor.classification === 'Internal'} onChange={(e) => setAuditor({ ...auditor, classification: e.target.value })} /> Internal</label>
                <label><input type="radio" name="aud_class" value="External" checked={auditor.classification === 'External'} onChange={(e) => setAuditor({ ...auditor, classification: e.target.value })} /> External</label>
              </div>
              <div className="flex items-center gap-2">
                <label className="font-medium">Active:</label>
                <input
                  type="checkbox"
                  checked={auditor.active}
                  onChange={(e) => setAuditor({ ...auditor, active: e.target.checked })}
                />
              </div>

              {/* Row 2 */}
              <input type="text" placeholder="Last Name" value={auditor.lastName} onChange={(e) => setAuditor({ ...auditor, lastName: e.target.value })} className="border rounded px-3 py-2" />
              <input type="text" placeholder="First Name" value={auditor.firstName} onChange={(e) => setAuditor({ ...auditor, firstName: e.target.value })} className="border rounded px-3 py-2" />

              {/* Row 3 */}
              <input type="text" placeholder="Middle Name" value={auditor.middleName} onChange={(e) => setAuditor({ ...auditor, middleName: e.target.value })} className="border rounded px-3 py-2" />
              <input type="text" placeholder="Name Suffix" value={auditor.suffix} onChange={(e) => setAuditor({ ...auditor, suffix: e.target.value })} className="border rounded px-3 py-2" />
              <input type="text" placeholder="Prefix / Title" value={auditor.prefix} onChange={(e) => setAuditor({ ...auditor, prefix: e.target.value })} className="border rounded px-3 py-2 md:col-span-2" />

              {/* Row 4 */}
              <input type="text" placeholder="Position" value={auditor.position} onChange={(e) => setAuditor({ ...auditor, position: e.target.value })} className="border rounded px-3 py-2" />
              <input type="number" placeholder="Salary" value={auditor.salary} onChange={(e) => setAuditor({ ...auditor, salary: e.target.value })} className="border rounded px-3 py-2" />

              {/* Row 5 */}
              <div className="flex items-center gap-2 md:col-span-2">
                <select
                  className="w-full border rounded px-3 py-2"
                  value={auditor.agency}
                  onChange={(e) => setAuditor({ ...auditor, agency: e.target.value })}
                >
                  <option value="">Select Agency</option>
                  {agencyData.map((agency, idx) => (
                    <option key={idx} value={agency.name}>{agency.name}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => {
                    setAuditorModalOpen(false);
                    setAgencyModalOpen(true);
                  }}
                  className="bg-accent text-white px-2 py-1 rounded hover:bg-green-700"
                >
                  +
                </button>
              </div>

              {/* Row 6 */}
              <div className="flex items-center gap-2 md:col-span-2">
                <select
                  multiple
                  className="w-full border rounded px-3 py-2"
                  value={auditor.expertise}
                  onChange={(e) => setAuditor({ ...auditor, expertise: Array.from(e.target.selectedOptions, opt => opt.value) })}
                >
                  {['Project Management', 'IT Audit', 'Data Analysis', 'Financial Audit', 'Risk Management'].map((skill, idx) => (
                    <option key={idx} value={skill}>{skill}</option>
                  ))}
                </select>
                <button
                  type="button"
                  className="bg-accent text-white px-2 py-1 rounded hover:bg-green-700"
                >
                  +
                </button>
              </div>

              {/* Row 7 */}
              <input type="email" placeholder="Email Address" value={auditor.email} onChange={(e) => setAuditor({ ...auditor, email: e.target.value })} className="border rounded px-3 py-2" />
              <input type="text" placeholder="TIN" value={auditor.tin} onChange={(e) => setAuditor({ ...auditor, tin: e.target.value })} className="border rounded px-3 py-2" />
              <input type="date" value={auditor.birthdate} onChange={(e) => setAuditor({ ...auditor, birthdate: e.target.value })} className="border rounded px-3 py-2" />

              {/* Row 8 */}
              <input type="text" placeholder="Contact Number" value={auditor.contact} onChange={(e) => setAuditor({ ...auditor, contact: e.target.value })} className="border rounded px-3 py-2 md:col-span-1" />
              <select
                value={auditor.status}
                onChange={(e) => {
                  const status = e.target.value;
                  setAuditor({
                    ...auditor,
                    status,
                    active: ['Not Connected', 'Retired', 'Deceased'].includes(status) ? false : auditor.active,
                  });
                }}
                className="border rounded px-3 py-2"
              >
                <option value="">Select Status</option>
                <option value="Not Connected">Not Connected</option>
                <option value="Connected">Connected</option>
                <option value="Retired">Retired</option>
                <option value="Deceased">Deceased</option>
              </select>
            </div>

            {/* Actions */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
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
