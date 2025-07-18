export const Card = ({ title, children }) => (
  <div className="bg-primary-light shadow-md rounded-2xl mt-3 px-6 py-6 max-w-full">
    <h2 className="text-2xl font-bold mb-4 text-black">{title}</h2>
    <div>{children}</div>
  </div>
);
