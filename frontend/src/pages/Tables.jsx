import React, { useState } from "react";
import { Edit3, Trash2, Eye, X, FolderKanban } from "lucide-react";
import { Card } from "../reusable/Card";
import { motion, AnimatePresence } from "framer-motion";

export const Tables = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const users = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin", status: "Online", employed: "2023-01-15" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "Author", status: "Offline", employed: "2022-07-08" },
    { id: 3, name: "Michael Lee", email: "michael.lee@example.com", role: "Moderator", status: "Online", employed: "2021-03-12" },
    { id: 4, name: "Anna Reyes", email: "anna.reyes@example.com", role: "Contributor", status: "Online", employed: "2020-11-03" },
    { id: 5, name: "Carlos Dela Cruz", email: "carlos.delacruz@example.com", role: "Subscriber", status: "Offline", employed: "2019-05-21" },
    { id: 6, name: "Emily Santos", email: "emily.santos@example.com", role: "Editor", status: "Online", employed: "2023-06-09" },
  ];

  const projects = [
    { id: 1, title: "Project Alpha", members: ["JD", "JS", "ML"], budget: "₱500,000", completion: 75, description: "Project Alpha is focused on developing new features.\nKey milestones include frontend overhaul and database optimization." },
    { id: 2, title: "Project Beta", members: ["JS", "ML"], budget: "₱380,200", completion: 50, description: "Project Beta aims to improve user experience and accessibility.\nThe project is halfway through completion." },
    { id: 3, title: "Project Gamma", members: ["JD"], budget: "₱120,500", completion: 90, description: "Gamma is near completion and currently undergoing testing and bug fixes." },
    { id: 4, title: "Project Delta", members: ["AR", "CD"], budget: "₱750,000", completion: 30, description: "Delta is in the planning phase, focusing on requirement gathering." },
    { id: 5, title: "Project Epsilon", members: ["ES", "JD", "ML"], budget: "₱1,200,000", completion: 60, description: "Epsilon is a large-scale project aimed at system integration across departments." },
    { id: 6, title: "Project Zeta", members: ["CD", "AR"], budget: "₱950,000", completion: 85, description: "Zeta focuses on security improvements and infrastructure upgrade." },
  ];


  const getInitials = (name) => {
    const words = name.trim().split(" ");
    return words.length === 1 ? words[0][0] : words[0][0] + words[1][0];
  };

  return (
    <div className="p-6">
      <Card>
        <h1 className="text-2xl font-bold mb-6 text-[#1f3329]">Tables</h1>

        <div className="space-y-10">

          {/* Users Table */}
          <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-[#1f3329]">Users Table</h2>
            <table className="min-w-full text-sm">
              <thead className="bg-[#226440] text-white uppercase text-xs">
                <tr>
                  <th className="px-4 py-2 text-left">User</th>
                  <th className="px-4 py-2 text-left">Role</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Employed</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t border-gray-200 hover:bg-[#f5faf7]">
                    <td className="px-4 py-2 flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-[#c6d6cc] flex items-center justify-center text-xs text-[#1f3329] border border-white uppercase">
                        {getInitials(user.name)}
                      </div>
                      <div>
                        <div className="font-medium text-[#1f3329]">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-4 py-2">{user.role}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${
                          user.status === "Online"
                            ? "bg-[#d1e7dd] text-[#1f3329]"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {user.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-2">{user.employed}</td>
                    <td className="px-4 py-2 flex items-center space-x-2">
                      <button className="text-[#1f3329] hover:text-[#3d5a45]">
                        <Edit3 size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 size={16} />
                      </button>
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Projects Table */}
          <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-[#1f3329]">Projects Table</h2>
            <table className="min-w-full text-sm">
              <thead className="bg-[#226440] text-white uppercase text-xs">
                <tr>
                  <th className="px-4 py-2 text-left">Project Title</th>
                  <th className="px-4 py-2 text-left">Members</th>
                  <th className="px-4 py-2 text-left">Budget</th>
                  <th className="px-4 py-2 text-left">Completion</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr
                    key={project.id}
                    className="border-t border-gray-200 hover:bg-[#f5faf7] cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <td className="px-4 py-2">{project.title}</td>
                    <td className="px-4 py-2">
                      <div className="flex -space-x-2">
                        {project.members.map((member, index) => (
                          <div
                            key={index}
                            className="w-8 h-8 rounded-full bg-[#c6d6cc] flex items-center justify-center text-xs text-[#1f3329] border border-white"
                            title={member}
                          >
                            {member}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-2">{project.budget}</td>
                    <td className="px-4 py-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-[#1f3329] h-2.5 rounded-full"
                          style={{ width: `${project.completion}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">{project.completion}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </Card>

      {/* User Modal */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedUser(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-lg relative"
            >
              <div className="flex items-center gap-4 border-b pb-4 mb-4">
                <div className="bg-[#d4e2da] w-12 h-12 flex items-center justify-center rounded-full text-[#1f3329] text-lg font-semibold shadow border border-white uppercase">
                  {getInitials(selectedUser.name)}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-primary">{selectedUser.name}</h4>
                  <p className="text-sm text-primary-dark">{selectedUser.role}</p>
                </div>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-2 text-sm text-[#1f3329]">
                <div><strong>Email:</strong> {selectedUser.email}</div>
                <div><strong>Status:</strong> {selectedUser.status}</div>
                <div><strong>Employed Since:</strong> {selectedUser.employed}</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

       {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-lg w-full relative"
            >

              {/* Modal Header */}
              <div className="bg-gradient-to-r from-[#f5faf7] to-[#e9f3ee] p-6 flex items-center gap-4 border-b border-gray-200">
                <div className="bg-[#d4e2da] p-3 rounded-xl text-accent shadow">
                  <FolderKanban size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-primary">{selectedProject.title}</h4>
                  <p className="text-sm text-primary-dark mt-1">Project Details</p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-4 text-primary text-sm leading-relaxed max-h-[70vh] overflow-y-auto">
                <p><strong>Members:</strong> {selectedProject.members.join(", ")}</p>
                <p><strong>Budget:</strong> {selectedProject.budget}</p>
                <p><strong>Completion:</strong> {selectedProject.completion}%</p>
                {selectedProject.description.split('\n').map((line, idx) => (
                  <p key={idx}>{line.trim()}</p>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-gray-100 bg-[#fafdfb] text-right">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="bg-accent text-white px-4 py-2 rounded-full hover:bg-accent/90 transition text-sm"
                >
                  Close
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
