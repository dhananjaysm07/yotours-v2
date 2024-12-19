'use client';

import React, { useContext, createContext } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CONTENT_QUERY } from '../graphql/query';
import { staticContentData } from './initial-data';
const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const {
    loading: contentLoading,
    error: contentError,
    data: contentData,
  } = useQuery(GET_CONTENT_QUERY);

  const contextValue = {
    contentData: contentData || staticContentData,
    contentLoading,
    contentError,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
