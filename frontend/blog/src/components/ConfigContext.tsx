/**
 * Provide configuration settings
 */
import { createContext } from 'react';

import { Config } from '../config';

const ConfigContext = createContext<Config | undefined>(undefined);

export default ConfigContext;
