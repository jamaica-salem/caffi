export const Card = ({ title, children }) => (
  <div className="bg-white shadow-md rounded-xl p-4 mb-4">
    <h2 className="text-lg font-semibold mb-2 text-brown">{title}</h2>
    <div>{children}</div>
  </div>
);
