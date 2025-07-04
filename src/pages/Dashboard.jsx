import { Card } from '../reusable/Card';
import { Plus, Upload } from 'lucide-react';

export const Dashboard = () => {
  return (
    <div className="mt-4">
      <Card>

        {/* Header and Action Buttons */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Dashboard</h1>

          <div className="flex gap-4">
            <button className="flex items-center gap-3 bg-accent text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-accent/90 transition">
              <Plus size={20} />
              Add Project
            </button>
            <button className="flex items-center gap-3 bg-white text-accent border border-accent px-6 py-3 rounded-full text-lg font-semibold hover:bg-accent hover:text-white transition">
              <Upload size={20} />
              Import Data
            </button>
          </div>
        </div>

        {/* First Row: KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-primary-light rounded-xl p-6 shadow text-accent">
            <h3 className="font-semibold text-base mb-2">Total Projects</h3>
            <p className="text-3xl font-bold">28</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow text-primary-darkest">
            <h3 className="font-semibold text-base mb-2">Ended Projects</h3>
            <p className="text-3xl font-bold">8</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow text-primary-darkest">
            <h3 className="font-semibold text-base mb-2">Running Projects</h3>
            <p className="text-3xl font-bold">12</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow text-primary-darkest">
            <h3 className="font-semibold text-base mb-2">Pending Projects</h3>
            <p className="text-3xl font-bold">8</p>
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl p-6 shadow border">
            <h3 className="text-primary font-semibold text-lg mb-5">Project Analytics</h3>
            <div className="h-40 flex items-center justify-center text-gray-400 text-base">[Chart Placeholder]</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow border">
            <h3 className="text-primary font-semibold text-lg mb-5">Reminders</h3>
            <ul className="text-primary-darkest text-base space-y-3">
              <li>Submit Q3 Report - July 10</li>
              <li>Client Meeting - July 12</li>
              <li>Design Review - July 15</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl p-6 shadow border">
            <h3 className="text-primary font-semibold text-lg mb-5">Projects</h3>
            <ul className="text-primary-darkest text-base space-y-3">
              <li>Website Redesign - July 30</li>
              <li>Mobile App Launch - August 15</li>
              <li>Database Migration - August 22</li>
            </ul>
          </div>
        </div>

        {/* Third Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow border">
            <h3 className="text-primary font-semibold text-lg mb-5">Team Collaboration</h3>
            <ul className="text-primary-darkest text-base space-y-3">
              <li>Jane D. - Design Phase - In Progress</li>
              <li>John S. - Development - Completed</li>
              <li>Maria T. - Testing - Pending</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl p-6 shadow border">
            <h3 className="text-primary font-semibold text-lg mb-5">Project Progress</h3>
            <div className="h-40 flex items-center justify-center text-gray-400 text-base">[Progress Chart]</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow border">
            <h3 className="text-primary font-semibold text-lg mb-5">Time Tracker</h3>
            <div className="h-40 flex items-center justify-center text-gray-400 text-base">[Time Tracker Placeholder]</div>
          </div>
        </div>

      </Card>
    </div>
  );
};
