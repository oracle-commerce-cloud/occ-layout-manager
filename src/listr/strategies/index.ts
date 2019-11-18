import { OperationTypes } from "../../types/inquirer/OperationTypes";
import { replaceInstanceStrategy } from "./replaceInstanceStrategy";
import { moveInstanceAfterStrategy } from "./moveInstanceAfterStrategy";
import { moveInstanceBeforeStrategy } from "./moveInstanceBeforeStrategy";
import { insertInstanceAfterStrategy } from "./insertInstanceAfterStrategy";
import { insertInstanceBeforeStrategy } from "./insertInstanceBeforeStrategy";
import { removeInstanceStrategy } from "./removeInstanceStrategy";
import { InstanceOperationStrategy } from "../../types/listr/InstanceOperationStrategy";

const OperationMapping = {
  [OperationTypes.removeInstance]: removeInstanceStrategy,
  [OperationTypes.replaceInstance]: replaceInstanceStrategy,
  [OperationTypes.insertInstanceBefore]: insertInstanceBeforeStrategy,
  [OperationTypes.insertInstanceAfter]: insertInstanceAfterStrategy,
  [OperationTypes.moveInstanceBefore]: moveInstanceBeforeStrategy,
  [OperationTypes.moveInstanceAfter]: moveInstanceAfterStrategy,
};

export const instanceOperationFactory = (operationType: OperationTypes): InstanceOperationStrategy =>
  OperationMapping[operationType];
