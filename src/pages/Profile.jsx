import { Card } from '../reusable/Card';
import { User } from 'lucide-react'; // or use a user-uploaded avatar

export default function Profile({ user, projects }) {
  return (
    <div className="p-6">
      <Card>
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar} alt={user.name}
              className="w-24 h-24 rounded-full ring-4 ring-accent"
            />
            <div>
              <h2 className="text-2xl font-bold text-primary">{user.name}</h2>
              <p className="text-primary-dark">{user.role}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href={`mailto:${user.email}`}
               className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-full hover:bg-accent/90 transition">
              <User size={18}/> Email
            </a>
            <a href={`tel:${user.phone}`}
               className="flex items-center gap-2 bg-accent-light text-accent px-4 py-2 rounded-full hover:bg-accent-light/90 transition">
              <User size={18}/> Call
            </a>
          </div>
        </div>

        {/* Bio & Info */}
        <div className="mb-8 space-y-4">
          <p className="text-primary-dark">{user.bio}</p>
          <div className="flex flex-wrap gap-6 text-primary">
            <div><strong>📍 Location:</strong> {user.location}</div>
            <div><strong>📱 Mobile:</strong> {user.phone}</div>
            <div><strong>✉️ Email:</strong> {user.email}</div>
          </div>
          <div className="flex gap-4 mt-4">
            {user.socials.map(s => (
              <a key={s.name} href={s.link} className="text-accent hover:underline">{s.name}</a>
            ))}
          </div>
        </div>

        {/* Projects / Portfolio */}
        <div>
          <h3 className="text-xl font-semibold text-primary mb-4">Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((p, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 shadow border flex items-center gap-4">
                <div className="bg-primary-lightest p-2 rounded-lg text-accent">
                  {/* optionally show p.icon */}
                  <User size={20}/>
                </div>
                <div>
                  <div className="font-semibold text-primary">{p.title}</div>
                  <div className="text-sm text-primary-dark mt-1">{p.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
