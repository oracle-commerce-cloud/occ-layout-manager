import { IOperationStrategyParams as Props } from "../../../types/listr/InstanceOperationStrategy";

export const removeInstanceStrategy = ({ layout, region, widgetIndex }: Props) => {
  region.widgets.splice(widgetIndex, 1);
  return layout;
};
