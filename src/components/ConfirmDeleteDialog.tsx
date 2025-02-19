import React from 'react';

interface ConfirmDeleteDialogProps {
  onCancel: () => void;
  onConfirm: () => void;
  isPending: boolean;
}

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  onCancel,
  onConfirm,
  isPending,
}) => {
  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
      <div className="card w-96 p-6">
        <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
        <p>Are you sure you want to delete this feature flag?</p>
        <div className="flex justify-end space-x-4 mt-6">
          <button onClick={onCancel} className="button-secondary">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="button-danger"
            disabled={isPending}
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteDialog;
