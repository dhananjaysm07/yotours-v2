'use client';

import React, { useEffect } from 'react';

const BsImport: React.FC = () => {
  useEffect(() => {
    const loadBootstrap = async () => {
      try {
        await import('bootstrap/dist/js/bootstrap.bundle.min.js');
      } catch (error) {
        console.error('Failed to load Bootstrap:', error);
      }
    };

    loadBootstrap();
  }, []);

  return <React.Fragment />;
};

export default BsImport;
