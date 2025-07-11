import { Plus, FolderKanban, Smartphone, Database, RefreshCw, Code, Laptop } from 'lucide-react';

export const ProjectsCard = () => {
  return (
    <div className="bg-white rounded-xl p-5 shadow border lg:col-span-1 lg:row-span-2 flex flex-col h-full">
      
      {/* Header with New Button */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-primary font-semibold text-base">Projects</h3>
        <button
          onClick={() => console.log('New Project')}
          className="flex items-center gap-2 bg-white text-accent border border-accent text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-accent hover:text-white transition"
        >
          <Plus size={14} />
          New
        </button>
      </div>

      {/* Project List */}
      <ul className="space-y-4 overflow-y-auto pr-1 flex-grow">

        <li className="flex items-start gap-3">
          <div className="bg-primary-lightest p-2 rounded-lg text-accent">
            <FolderKanban size={18} />
          </div>
          <div>
            <div className="font-semibold text-primary text-sm">Website Redesign</div>
            <div className="text-xs text-primary-dark mt-1">Due date: July 30, 2025</div>
          </div>
        </li>

        <li className="flex items-start gap-3">
          <div className="bg-primary-lightest p-2 rounded-lg text-accent">
            <Smartphone size={18} />
          </div>
          <div>
            <div className="font-semibold text-primary text-sm">Mobile App Launch</div>
            <div className="text-xs text-primary-dark mt-1">Due date: August 15, 2025</div>
          </div>
        </li>

        <li className="flex items-start gap-3">
          <div className="bg-primary-lightest p-2 rounded-lg text-accent">
            <Database size={18} />
          </div>
          <div>
            <div className="font-semibold text-primary text-sm">Database Migration</div>
            <div className="text-xs text-primary-dark mt-1">Due date: August 22, 2025</div>
          </div>
        </li>

        <li className="flex items-start gap-3">
          <div className="bg-primary-lightest p-2 rounded-lg text-accent">
            <RefreshCw size={18} />
          </div>
          <div>
            <div className="font-semibold text-primary text-sm">System Upgrade</div>
            <div className="text-xs text-primary-dark mt-1">Due date: August 31, 2025</div>
          </div>
        </li>

        <li className="flex items-start gap-3">
          <div className="bg-primary-lightest p-2 rounded-lg text-accent">
            <Code size={18} />
          </div>
          <div>
            <div className="font-semibold text-primary text-sm">New Feature Dev</div>
            <div className="text-xs text-primary-dark mt-1">Due date: September 10, 2025</div>
          </div>
        </li>

        <li className="flex items-start gap-3">
          <div className="bg-primary-lightest p-2 rounded-lg text-accent">
            <FolderKanban size={18} />
          </div>
          <div>
            <div className="font-semibold text-primary text-sm">Marketing Site Revamp</div>
            <div className="text-xs text-primary-dark mt-1">Due date: September 18, 2025</div>
          </div>
        </li>

        <li className="flex items-start gap-3">
          <div className="bg-primary-lightest p-2 rounded-lg text-accent">
            <Laptop size={18} />
          </div>
          <div>
            <div className="font-semibold text-primary text-sm">E-commerce Platform</div>
            <div className="text-xs text-primary-dark mt-1">Due date: October 5, 2025</div>
          </div>
        </li>

        <li className="flex items-start gap-3">
          <div className="bg-primary-lightest p-2 rounded-lg text-accent">
            <Smartphone size={18} />
          </div>
          <div>
            <div className="font-semibold text-primary text-sm">Mobile Design</div>
            <div className="text-xs text-primary-dark mt-1">Due date: November 11, 2025</div>
          </div>
        </li>

      </ul>
    </div>
  );
};
