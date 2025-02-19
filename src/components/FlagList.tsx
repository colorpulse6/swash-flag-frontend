import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ToggleSwitch from './ToggleSwitch';
import FlagService from '../api/FlagsService';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';

const FlagList: React.FC = () => {
  const queryClient = useQueryClient();
  const [flagToDelete, setFlagToDelete] = useState<string | null>(null);

  const {
    data: flags,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['flags'],
    queryFn: FlagService.fetchFlags,
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, enabled }: { id: string; enabled: boolean }) =>
      FlagService.toggleFlag(id, enabled),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flags'] });
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: FlagService.deleteFlag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flags'] });
      setFlagToDelete(null);
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleDelete = (id: string) => {
    setFlagToDelete(id);
  };

  const confirmDelete = () => {
    if (flagToDelete) {
      deleteMutation.mutate(flagToDelete);
    }
  };

  if (isLoading) return <p>Loading feature flags...</p>;

  if (isError) {
    return (
      <p className="text-red-600">Error: {error && (error as Error).message}</p>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="space-y-4">
        {Array.isArray(flags) &&
          flags?.map((flag) => (
            <div
              key={flag.id}
              className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
            >
              <span className="text-gray-800 font-medium">{flag.name}</span>
              <div className="flex items-center space-x-4">
                <ToggleSwitch
                  enabled={flag.enabled}
                  onChange={() =>
                    toggleMutation.mutate({
                      id: flag.id,
                      enabled: flag.enabled,
                    })
                  }
                />
                <button
                  onClick={() => handleDelete(flag.id)}
                  className="text-red-600 hover:text-red-800 transition-transform transform hover:scale-110 cursor-pointer"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
      </div>

      {flagToDelete && (
        <ConfirmDeleteDialog
          onCancel={() => setFlagToDelete(null)}
          onConfirm={confirmDelete}
          isPending={deleteMutation.isPending}
        />
      )}
    </div>
  );
};

export default FlagList;
