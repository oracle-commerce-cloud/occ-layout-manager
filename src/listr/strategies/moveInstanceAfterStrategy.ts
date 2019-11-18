import { IOperationStrategyParams as Props } from "../../types/listr/InstanceOperationStrategy";
import { findInstance } from "../../helpers/findInstance";
import { removeInstanceStrategy } from "./removeInstanceStrategy";
import { insertInstanceAfterStrategy } from "./insertInstanceAfterStrategy";

export const moveInstanceAfterStrategy = (params: Props) => {
  const { layout, mainInstance } = params;
  const { region, widgetIndex } = findInstance({ layout, instanceId: mainInstance.repositoryId });
  removeInstanceStrategy({ ...params, region, widgetIndex });
  insertInstanceAfterStrategy({ ...params });
  return layout;
};
