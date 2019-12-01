import { WidgetInstance } from "../api/layoutStructure";

export interface FindInstancesOptions {
  name: string;
  message: string;
  instances: WidgetInstance[];
  when?: (answersSoFar?: any) => boolean;
}
