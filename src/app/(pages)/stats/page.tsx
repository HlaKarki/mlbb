'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { RanksType } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import StatsTable from '@/components/stats/Stats';

export default function Statistics() {
  const [rank, setRank] = useState<RanksType>('Overall');
  const {
    data: stats,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const response = await fetch(
        '/api/mlbb/final?rank=' + encodeURIComponent(rank)
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    enabled: false,
  });

  useEffect(() => {
    refetch().catch(error => console.error(error));
  }, [rank, refetch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <motion.h1
          className="text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Hero Statistics
        </motion.h1>
        <motion.div
          className="bg-gray-800 rounded-lg shadow-lg p-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <StatsTable
            stats={stats?.data}
            isLoading={isFetching}
            error={error}
            currentRank={rank}
            setRank={setRank}
          />
        </motion.div>
      </div>
    </div>
  );
}
