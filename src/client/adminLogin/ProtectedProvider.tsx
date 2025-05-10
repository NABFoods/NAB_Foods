import React, { FC } from 'react';
import { ProtectedProviderComponent } from '../../types';
import { Navigate } from 'react-router';

const ProtectedProvider: FC<ProtectedProviderComponent> = ({
  isAllowed,
  children,
}) => {
  if (!isAllowed) {
    return <Navigate to='/adminLogin' />;
  } else {
    return <>{children}</>;
  }
};

export default ProtectedProvider;
