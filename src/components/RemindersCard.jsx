import { Video } from 'lucide-react';

export const RemindersCard = () => (
  <div className="bg-white rounded-xl p-6 shadow border">
    <h3 className="text-primary font-semibold text-lg mb-6">Reminders</h3>

    <div className="text-primary-darkest space-y-4">

      {/* Reminder Item */}
      <div className="flex flex-col gap-3">
        <div className="font-bold text-accent text-3xl">Meeting with Sir Lew Jayson Nuda</div>
        <div className="text-primary text-base">Time: 2:00pm - 4:00pm</div>
        <button className="mt-2 inline-flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-full text-base font-medium hover:bg-accent/90 transition">
          <Video size={18} />
          Start Meeting
        </button>
      </div>

    </div>
  </div>
);
