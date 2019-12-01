import { instanceOperationFactory } from "@listr/strategies/widgetInstances";
import { removeInstanceStrategy } from "@listr/strategies/widgetInstances/removeInstanceStrategy";
import { OperationTypes } from "@Types/inquirer/operationTypes";
import { replaceInstanceStrategy } from "@listr/strategies/widgetInstances/replaceInstanceStrategy";
import { insertInstanceBeforeStrategy } from "@listr/strategies/widgetInstances/insertInstanceBeforeStrategy";
import { insertInstanceAfterStrategy } from "@listr/strategies/widgetInstances/insertInstanceAfterStrategy";
import { moveInstanceBeforeStrategy } from "@listr/strategies/widgetInstances/moveInstanceBeforeStrategy";
import { moveInstanceAfterStrategy } from "@listr/strategies/widgetInstances/moveInstanceAfterStrategy";

describe("instance Strategies", () => {
  describe("instanceOperationFactory", () => {
    it("should be defined", async () => {
      expect(instanceOperationFactory).toBeTruthy();
    });

    it("should return removeInstanceStrategy.", async () => {
      const operationExecutor = instanceOperationFactory(OperationTypes.removeInstance);
      expect(operationExecutor).toEqual(removeInstanceStrategy);
    });

    it("should return replaceInstanceStrategy.", async () => {
      const operationExecutor = instanceOperationFactory(OperationTypes.replaceInstance);
      expect(operationExecutor).toEqual(replaceInstanceStrategy);
    });

    it("should return insertInstanceBeforeStrategy.", async () => {
      const operationExecutor = instanceOperationFactory(OperationTypes.insertInstanceBefore);
      expect(operationExecutor).toEqual(insertInstanceBeforeStrategy);
    });

    it("should return insertInstanceAfterStrategy.", async () => {
      const operationExecutor = instanceOperationFactory(OperationTypes.insertInstanceAfter);
      expect(operationExecutor).toEqual(insertInstanceAfterStrategy);
    });

    it("should return moveInstanceBeforeStrategy.", async () => {
      const operationExecutor = instanceOperationFactory(OperationTypes.moveInstanceBefore);
      expect(operationExecutor).toEqual(moveInstanceBeforeStrategy);
    });

    it("should return moveInstanceAfterStrategy.", async () => {
      const operationExecutor = instanceOperationFactory(OperationTypes.moveInstanceAfter);
      expect(operationExecutor).toEqual(moveInstanceAfterStrategy);
    });
  });
});
