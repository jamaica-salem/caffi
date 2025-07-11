import React, { useState } from 'react';
import { Mail, Phone, Linkedin, Github, Facebook, Instagram, FolderKanban, X } from 'lucide-react';
import { Card } from '../reusable/Card';
import profilePic from '../assets/profile.jpg';
import { motion, AnimatePresence } from 'framer-motion';

const Profile = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const user = {
    avatar: profilePic,
    name: 'Jamaica Salem',
    role: 'Co-Founder & Lead Developer',
    bio: 'Passionate about building meaningful digital products and solving real-world problems through technology.',
    location: 'Olongapo City, Zambales, Philippines',
    phone: '+639998541937',
    email: 'jamaica.esalem@gmail.com',
    socials: [
      { name: 'LinkedIn', link: 'https://www.linkedin.com/in/jamaica-salem-ba435b26a/' },
      { name: 'GitHub', link: 'https://github.com/jamaica-salem' },
      { name: 'Facebook', link: 'https://facebook.com/itsjmcslm' },
      { name: 'Instagram', link: 'https://instagram.com/jmc.slm' },
    ],
  };

  const projects = [
    {
      title: 'Barangay Health Center EMR',
      description: `A full-featured digital record system for managing patient data at barangay health centers. 
Tech Stack: Laravel, MySQL, Bootstrap. 
Features: Patient registration, medical history tracking, appointment scheduling, and reporting. 
Built to improve healthcare efficiency and accessibility in local communities.`,
    },
    {
      title: 'Well-Being Journaling App',
      description: `A responsive web application focused on mental wellness through journaling and reflective writing.
Tech Stack: React.js, Firebase, Tailwind CSS.
Features: Daily journal entries, mood tracking, chat integration for support, and secure cloud storage. 
Designed to promote self-care and mental health awareness.`,
    },
    {
      title: 'Aircraft Maintenance Logbook',
      description: `A digital logbook system for aviation maintenance teams to track inspections, repairs, and certifications.
Tech Stack: PHP, MySQL, Vanilla JavaScript.
Features: Real-time logging of maintenance tasks, compliance checks, PDF export, and user access control.
Aimed at streamlining aircraft safety record-keeping.`,
    },
    {
      title: 'Pokedex Web App',
      description: `An interactive Pokedex application for Pokemon fans, powered by a public API.
Tech Stack: HTML, CSS, JavaScript, PokéAPI.
Features: Search and filter Pokemon, view stats, abilities, types, and images with a responsive interface.
Built as a fun coding challenge and portfolio piece.`,
    },
    {
      title: 'Information Systems Strategic Plan (ISSP)',
      description: `An internal system for managing ICT resource planning for DOST-PES.
Tech Stack: Laravel, Vue.js, MySQL, Tailwind CSS.
Features: Multi-year ICT planning, budget management, project tracking, PDF reports.
Developed to help government agencies align ICT resources with strategic goals.`,
    },
    {
      title: 'Clinic Website',
      description: `A professional and responsive website for a dermatology clinic.
Tech Stack: HTML, CSS, JavaScript.
Features: Service showcase, appointment inquiry form, location map, and responsive design.
Created to enhance the clinic's online presence and improve patient reach.`,
    },
  ];

  const socialIcons = {
    LinkedIn: <Linkedin size={18} />,
    GitHub: <Github size={18} />,
    Facebook: <Facebook size={18} />,
    Instagram: <Instagram size={18} />,
  };

  return (
    <div className="p-6 relative">
      <Card>
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-full ring-4 ring-accent object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold text-primary">{user.name}</h2>
              <p className="text-primary-dark font-medium">{user.role}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href={`mailto:${user.email}`} className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-full hover:bg-accent/90 transition">
              <Mail size={18} /> Email
            </a>
            <a href={`tel:${user.phone}`} className="flex items-center gap-2 bg-accent-light text-accent px-4 py-2 rounded-full hover:bg-accent-light/90 transition">
              <Phone size={18} /> Call
            </a>
          </div>
        </div>

        <div className="mb-10 space-y-4">
          <p className="text-primary text-base leading-relaxed">{user.bio}</p>
          <div className="flex flex-wrap gap-6 text-primary font-medium">
            <div><strong>Location:</strong> {user.location}</div>
            <div><strong>Mobile:</strong> {user.phone}</div>
            <div><strong>Email:</strong> {user.email}</div>
          </div>
          <div className="flex gap-5 mt-4">
            {user.socials.map((s) => (
              <a key={s.name} href={s.link} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-dark transition">
                {socialIcons[s.name]}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-primary mb-5">Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedProject(p)}
                className="bg-white rounded-xl p-4 shadow border flex items-center gap-4 hover:shadow-md transition text-left w-full"
              >
                <div className="bg-primary-lightest p-3 rounded-lg text-accent">
                  <FolderKanban size={20} />
                </div>
                <div>
                  <div className="font-semibold text-primary text-base">{p.title}</div>
                  <div className="text-sm text-primary mt-1">{p.description.split('.')[0]}.</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Card>

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
              {selectedProject.description.split('\n').map((line, idx) => (
                <p key={idx}>{line.trim()}</p>
              ))}
            </div>

            {/* Modal Footer (optional) */}
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

export default Profile;
