import { Card } from '../reusable/Card';
import { FolderKanban, CheckCircle, PlayCircle, Clock3, ArrowUpRight, ArrowDownRight, Plus, Upload, Video, Database, Code, RefreshCw, Smartphone, Laptop } from 'lucide-react';
import { ProjectAnalyticsCard } from '../components/ProjectAnalyticsCard';
import { RemindersCard } from '../components/RemindersCard';
import { KpiCard } from '../components/KpiCard';
import { ProjectsCard } from '../components/ProjectsCard';
import ActionButton from '../reusable/ActionButton';
import TeamCollaborationCard from '../components/TeamCollaborationCard.jsx';
import ProjectProgressCard from '../components/ProjectProgressCard.jsx';

export const Dashboard = () => {
  return (
    <div className="mt-4">
      <Card>

        {/* Header and Action Buttons */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-primary">Dashboard</h1>

          <div className="flex gap-3">
            <ActionButton
              label="Add Project"
              icon={Plus}
              variant="primary"
              onClick={() => console.log('Add Project clicked')}
            />
            <ActionButton
              label="Import Data"
              icon={Upload}
              variant="secondary"
              onClick={() => console.log('Import Data clicked')}
            />
          </div>
        </div>

        {/* First Row: KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">

          {/* Project Analytics */}
          <div className="lg:col-span-2">
            <ProjectAnalyticsCard />
          </div>

          {/* Reminders */}
          <div className="lg:col-span-1">
            <RemindersCard
              title="Meeting with Sir Lew Jason Nuda"
              time="Time: 2:00pm - 4:00pm"
              buttonLabel="Start Meeting"
              icon={Video}
              onButtonClick={() => console.log('Meeting Started')}
            />
          </div>

          {/* Projects */}
          <ProjectsCard />

          {/* Third Row - Combine TeamCollab and Progress */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-5">
            <TeamCollaborationCard />
            <ProjectProgressCard />
          </div>

        </div>

      </Card>
    </div>
  );
};
