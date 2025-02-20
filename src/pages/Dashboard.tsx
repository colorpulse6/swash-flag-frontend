import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import CreateFlagModal from '../components/CreateFlagModal';
import FlagList from '../components/FlagList.tsx';

const Dashboard = () => {
  const { logout } = useContext(AuthContext)!;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="flex-1 transition-all duration-200 ">
        <Navbar onLogout={logout} />
        <div className="container mx-auto py-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Feature Flags</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              + Create Flag
            </button>
          </div>
        </div>
        <CreateFlagModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
        <FlagList />
      </div>
    </div>
  );
};

export default Dashboard;
