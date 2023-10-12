import { useContext } from 'react';

import FeatureFlagContext, {
  FeatureFlagContextProps,
} from './FeatureFlagContext';

/**
 * Hook to read application feature flags
 */
export default function useFeatureFlags(): FeatureFlagContextProps {
  const featureFlag = useContext(FeatureFlagContext);
  return featureFlag;
}
