export default function ProjectsTable({ projects }) {
  return (
    <div className="bg-white rounded-xl shadow border p-4 mt-6">
      <h3 className="text-primary font-semibold mb-4">Projects</h3>
      <div className="overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-primary-lightest">
            <tr>
              <th className="px-4 py-2 text-left">Project Title</th>
              <th className="px-4 py-2 text-center">Members</th>
              <th className="px-4 py-2 text-right">Budget</th>
              <th className="px-4 py-2 text-right">Completion</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {projects.map(p => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-primary-dark">{p.title}</td>
                <td className="px-4 py-2 text-center">
                  <div className="flex justify-center -space-x-2">
                    {p.members.slice(0, 3).map((m, i) => (
                      <img key={i} src={m.avatar} alt="" className="w-6 h-6 rounded-full border border-white" />
                    ))}
                    {p.members.length > 3 && (
                      <span className="w-6 h-6 bg-gray-200 text-xs rounded-full flex items-center justify-center border border-white">
                        +{p.members.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-2 text-right">{p.budget}</td>
                <td className="px-4 py-2 text-right">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full" style={{ width: `${p.completion}%` }} />
                  </div>
                  <div className="text-xs text-primary-dark mt-1">{p.completion}%</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
