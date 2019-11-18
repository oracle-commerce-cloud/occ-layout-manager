import { LayoutStructure, Region, WidgetInstance } from "../api/layoutStructure";

export interface IOperationStrategyParams {
  widgetIndex?: number;
  region: Region;
  layout: LayoutStructure;
  widget: WidgetInstance;
  refInstance: WidgetInstance;
  mainInstance: WidgetInstance;
}

export type InstanceOperationStrategy = (params: IOperationStrategyParams) => LayoutStructure;
