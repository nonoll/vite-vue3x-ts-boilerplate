import {PERMISSION_TYPES} from '@/constants/permission.constants';

export interface RouteMeta {
  meta?: {
    permission?: PERMISSION_TYPES;
  };
}
