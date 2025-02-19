const Navbar = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <nav className="bg-white shadow py-4 px-6 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold text-gray-800">Swash Flag</h1>
      </div>
      <button
        onClick={onLogout}
        className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
      >
        Log Out
      </button>
    </nav>
  );
};

export default Navbar;
