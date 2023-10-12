/**
 * Provide configuration settings
 */
import { createContext } from 'react';

export interface FeatureFlagContextProps {}

const FeatureFlagContext = createContext<FeatureFlagContextProps>({});

export default FeatureFlagContext;
