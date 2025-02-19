import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { AuthService } from '../api/AuthService';

const HIDDEN_STRING = '*********************************';

const ApiTokens = () => {
  const queryClient = useQueryClient();
  const [isHidden, setIsHidden] = useState(true);

  const {
    data: apiTokensResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['apiTokens'],
    queryFn: AuthService.fetchApiTokens,
  });

  const generateTokenMutation = useMutation({
    mutationFn: AuthService.generateApiToken,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apiTokens'] });
    },
  });

  if (isLoading) return <p>Loading API tokens...</p>;
  if (isError) return <p>Error loading API tokens.</p>;

  const apiToken = apiTokensResponse || {};

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-semibold mb-4">API Tokens</h1>

      <ul className="bg-white shadow-md rounded-lg p-4">
        {Object.keys(apiToken).length > 0 ? (
          <li className="mb-2">
            <span className="font-medium">Token: </span>
            <span className="ml-2 bg-gray-200 px-2 py-1 rounded-md">
              {isHidden ? HIDDEN_STRING : apiToken.apiToken}
            </span>
          </li>
        ) : (
          <p>No API tokens available.</p>
        )}
      </ul>

      <div className="mt-4 flex space-x-4">
        <button
          onClick={() => setIsHidden(!isHidden)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          {isHidden ? '👁 Show Tokens' : '🙈 Hide Tokens'}
        </button>

        <button
          onClick={() => generateTokenMutation.mutate()}
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
        >
          ➕ Generate New Token
        </button>
      </div>
    </div>
  );
};

export default ApiTokens;
