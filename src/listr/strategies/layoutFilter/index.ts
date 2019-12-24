import { OperationTypes } from "@Types/inquirer/operationTypes";
import { filterByInstanceStrategy } from "./filterByInstanceStrategy";
import { filterByBothStrategy } from "./filterByBothStrategy";
import { LayoutBase, LayoutFilterStrategy } from "@Types/listr/LayoutFilterStrategy";

const OperationMapping = {
  [OperationTypes.removeInstance]: filterByInstanceStrategy,
  [OperationTypes.replaceInstance]: filterByInstanceStrategy,
  [OperationTypes.insertInstanceBefore]: filterByInstanceStrategy,
  [OperationTypes.insertInstanceAfter]: filterByInstanceStrategy,
  [OperationTypes.moveInstanceBefore]: filterByBothStrategy,
  [OperationTypes.moveInstanceAfter]: filterByBothStrategy,
};

export const filterOperationFactory = (operationType: OperationTypes): LayoutFilterStrategy<LayoutBase> =>
  OperationMapping[operationType];
