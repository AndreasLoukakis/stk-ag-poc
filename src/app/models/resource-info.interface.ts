
export interface ResourceInfo {
  id?: number;
  propertyName: string;
  currieName?: string;
  href?: string;
  values?: {
    propertyName: string;
    href: string;
    currieName: string;
  };
}
