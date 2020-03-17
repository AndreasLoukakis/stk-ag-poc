import { ResourceInfo, PropertyInfo } from './';

export interface ResourceProperty {
  isResource: boolean;
  resourceInfo?: ResourceInfo;
  propertyInfo?: PropertyInfo;
}
