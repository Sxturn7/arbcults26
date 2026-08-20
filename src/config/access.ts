/**
 * ARB '26 Event Management - Centralized Access Configuration
 */

export const CORE_ACCESS_PASSWORD = 'BLUE';

export type AccessRole = 'ec' | 'core';

export interface AccessRoleConfig {
  id: AccessRole;
  title: string;
  badge: string;
  requiresPassword: boolean;
}

export const ACCESS_ROLES: Record<AccessRole, AccessRoleConfig> = {
  ec: {
    id: 'ec',
    title: 'EC (Extended Core)',
    badge: 'EC (EXTENDED CORE)',
    requiresPassword: false,
  },
  core: {
    id: 'core',
    title: 'Core Team / PoCs',
    badge: 'CORE TEAM / POCS',
    requiresPassword: true,
  },
};
