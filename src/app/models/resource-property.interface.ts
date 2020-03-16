import { RendererInfo } from './';

export interface ResourceProperty {
  isResource: boolean;
  renderInfo?: RendererInfo;
  displayInfo?: any;
}
