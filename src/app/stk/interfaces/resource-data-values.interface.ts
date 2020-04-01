export interface ResourceDataValues {
  next?: string;
  prev?: string;
  first?: string;
  last?: string;
  items: { [key: string]: string | number }[];
}
