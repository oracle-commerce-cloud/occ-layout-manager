import { LayoutStructure, WidgetInstance } from "../api/layoutStructure";

export interface LayoutBase {
  layout: any;
  repositoryId: string;
}

export interface ILayoutFilterStrategyParams<T> {
  layouts: T[];
  refInstance: WidgetInstance;
  mainInstance: WidgetInstance;
}

export type LayoutFilterStrategy<T extends LayoutBase> = (params: ILayoutFilterStrategyParams<T>) => T[];
