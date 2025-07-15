import { Plus, User } from 'lucide-react';

const TeamCollaborationCard = () => {
  const teamMembers = [
    { name: 'Jane D.', project: 'Design Phase', status: 'In Progress' },
    { name: 'John S.', project: 'Development', status: 'Completed' },
    { name: 'Maria T.', project: 'Testing', status: 'Pending' },
    { name: 'Jamaica S.', project: 'Development', status: 'In Progress' },
  ];

  const statusStyles = {
    'Completed': 'bg-green-100 text-green-600',
    'In Progress': 'bg-yellow-100 text-yellow-600',
    'Pending': 'bg-red-100 text-red-600',
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow border flex flex-col h-full">
      
      {/* Header with Add Member button */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-primary font-semibold text-base">Team Collaboration</h3>
        <button
          onClick={() => console.log('Add Member')}
          className="flex items-center gap-2 bg-white text-accent border border-accent text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-accent hover:text-white transition"
        >
          <Plus size={14} />
          Add Member
        </button>
      </div>

      {/* Members List */}
      <ul className="space-y-4 flex-grow overflow-y-auto pr-1 text-sm">
        {teamMembers.map((member, index) => (
          <li key={index} className="flex items-center justify-between gap-3">
            
            {/* Avatar + Name + Project */}
            <div className="flex items-start gap-3">
              <div className="bg-primary-lightest p-2 rounded-full text-accent">
                <User size={16} />
              </div>
              <div>
                <div className="font-semibold text-primary">{member.name}</div>
                <div className="text-xs text-primary-dark mt-0.5">
                  Working on <span className="font-semibold text-primary">{member.project}</span>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className={`px-2 py-0.5 rounded-md text-xs font-medium ${statusStyles[member.status]}`}>
              {member.status}
            </div>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamCollaborationCard;
