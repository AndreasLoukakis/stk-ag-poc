import { ResourceInfo, PropertyInfo } from '.';

export interface ResourceData {
  resources: {[key: string]: ResourceInfo};
  properties: any;
}
