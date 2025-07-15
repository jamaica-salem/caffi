import { useState, useMemo } from 'react';
import { Card } from '../reusable/Card';
import { Search, Plus, X } from 'lucide-react';
import clsx from 'clsx'; // Replacing `cn` with `clsx`

export const Library = () => {
  const [activeTab, setActiveTab] = useState('agencies');
  const [searchTerm, setSearchTerm] = useState('');
  const [classificationFilter, setClassificationFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

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
  };

  return (
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
          <button className="bg-accent text-white rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-green-700 transition">
            <Plus size={16} /> Add
          </button>
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
            {activeTab === 'agencies'
              ? filteredAgencies.map((item, index) => (
                  <tr key={index} className="hover:bg-primary-light/40 transition">
                    <td className="p-3">{item.name}</td>
                    <td className="p-3">{item.contact}</td>
                    <td className="p-3">{item.head}</td>
                    <td className="p-3">{item.group}</td>
                  </tr>
                ))
              : filteredAuditors.map((item, index) => (
                  <tr key={index} className="hover:bg-primary-light/40 transition">
                    <td className="p-3">{item.name}</td>
                    <td className="p-3">
                      {item.agency} - {item.position}
                    </td>
                    <td className="p-3">{item.contact}</td>
                    <td className="p-3">{item.birthdate}</td>
                    <td className="p-3">{item.expertise}</td>
                    <td className="p-3">{item.engagements}</td>
                    <td className="p-3">{item.rating}</td>
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
  );
};
