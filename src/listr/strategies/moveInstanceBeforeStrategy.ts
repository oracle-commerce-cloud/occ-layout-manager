import { IOperationStrategyParams as Props } from "../../types/listr/InstanceOperationStrategy";
import { findInstance } from "../../helpers/findInstance";
import { removeInstanceStrategy } from "./removeInstanceStrategy";
import { insertInstanceBeforeStrategy } from "./insertInstanceBeforeStrategy";

export const moveInstanceBeforeStrategy = (params: Props) => {
  const { layout, mainInstance } = params;
  const { region, widgetIndex } = findInstance({ layout, instanceId: mainInstance.repositoryId });
  removeInstanceStrategy({ ...params, region, widgetIndex });
  insertInstanceBeforeStrategy({ ...params });
  return layout;
};
