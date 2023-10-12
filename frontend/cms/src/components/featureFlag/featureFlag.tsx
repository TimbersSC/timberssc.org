import React from 'react';

interface Props {
  feature: boolean;
}

export const FeatureFlagComponent: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  feature,
}) => {
  if (feature) {
    return <>{children}</>;
  }
};
