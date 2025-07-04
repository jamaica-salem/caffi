import { Card } from '../reusable/Card';
import { FolderKanban, CheckCircle, PlayCircle, Clock3, ArrowUpRight, ArrowDownRight, Plus, Upload } from 'lucide-react';
import { ProjectAnalyticsCard } from '../components/ProjectAnalyticsCard';
import { RemindersCard } from '../components/RemindersCard';
import { KpiCard } from '../components/KpiCard';

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
            <KpiCard
                title="Total Projects"
                value="28"
                change="+5% from last month"
                icon={FolderKanban}
                isIncrease={true}
                bgColor="bg-accent"
                textColor="text-white"
            />
            <KpiCard
                title="Ended Projects"
                value="8"
                change="-2% from last month"
                icon={CheckCircle}
                isIncrease={false}
                bgColor="bg-white"
                textColor="text-black"
            />
            <KpiCard
                title="Running Projects"
                value="12"
                change="+3% from last month"
                icon={PlayCircle}
                isIncrease={true}
                bgColor="bg-white"
                textColor="text-black"
            />
            <KpiCard
                title="Pending Projects"
                value="8"
                change="-1% from last month"
                icon={Clock3}
                isIncrease={false}
                bgColor="bg-white"
                textColor="text-black"
            />
        </div>


        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <ProjectAnalyticsCard />
          <RemindersCard />
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
