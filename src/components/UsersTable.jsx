export default function UsersTable({ users }) {
  return (
    <div className="bg-white rounded-xl shadow border p-4">
      <h3 className="text-primary font-semibold mb-4">Users</h3>
      <div className="overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-primary-lightest">
            <tr>
              <th className="px-4 py-2 text-left">User</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-center">Status</th>
              <th className="px-4 py-2 text-center">Employed</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 flex items-center gap-3">
                  <img src={user.avatar} alt="" className="w-8 h-8 rounded-full" />
                  <span className="text-primary-dark">{user.name}</span>
                </td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2 text-center">
                  <span className={`px-2 py-1 text-xs rounded-full ${user.online ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                    {user.online ? 'Online' : 'Offline'}
                  </span>
                </td>
                <td className="px-4 py-2 text-center">{user.employed}</td>
                <td className="px-4 py-2 text-right space-x-2">
                  <button className="text-sm text-accent hover:underline">View</button>
                  <button className="text-sm text-accent hover:underline">Edit</button>
                  <button className="text-sm text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
