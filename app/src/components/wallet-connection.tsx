'use client';

import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';
import { useState } from 'react';

export function WalletConnection() {
  const account = useCurrentAccount();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  return (
    <div className="relative">
      {!account ? (
        <ConnectButton connectText="Connect Wallet" />
      ) : (
        <div>
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span className="hidden sm:inline">
              {account.address.slice(0, 6)}...{account.address.slice(-4)}
            </span>
            <span className="sm:hidden">
              {account.address.slice(0, 4)}...
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-60 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10 border border-gray-200 dark:border-gray-700">
              <div className="p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Connected Address</p>
                <p className="text-sm font-mono break-all mt-1">{account.address}</p>
                <ConnectButton connectText="Disconnect" className="w-full mt-3" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}