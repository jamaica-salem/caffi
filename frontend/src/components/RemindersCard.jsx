export const RemindersCard = ({ title, time, buttonLabel, icon: Icon, onButtonClick }) => (
  <div className="bg-white rounded-xl p-6 shadow border">
    <h3 className="text-primary font-semibold text-base mb-5">Reminders</h3>

    <div className="text-primary-darkest space-y-4">

      <div className="flex flex-col gap-3">
        <div className="font-bold text-accent text-xl md:text-2xl">{title}</div>
        <div className="text-primary text-sm md:text-base">{time}</div>
        <button
          onClick={onButtonClick}
          className="mt-2 inline-flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-full text-sm md:text-base font-medium hover:bg-accent/90 transition"
        >
          {Icon && <Icon size={16} />}
          {buttonLabel}
        </button>
      </div>

    </div>
  </div>
);
