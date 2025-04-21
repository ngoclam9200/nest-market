// LoadingContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import Loading from '../components/share/Loading/Loading';
 

// Định nghĩa kiểu cho context
interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

// Tạo context với giá trị mặc định
const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  setIsLoading: () => { },
});

// Provider cho context
interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
      {isLoading && <Loading />}
    </LoadingContext.Provider>
  );
};

// Hook tùy chỉnh để sử dụng context
export const useLoading = () => useContext(LoadingContext);
