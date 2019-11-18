import { instanceOperationFactory } from "../../../src/listr/strategies";
import { removeInstanceStrategy } from "../../../src/listr/strategies/removeInstanceStrategy";
import { OperationTypes } from "../../../src/types/inquirer/OperationTypes";
import { replaceInstanceStrategy } from "../../../src/listr/strategies/replaceInstanceStrategy";
import { insertInstanceBeforeStrategy } from "../../../src/listr/strategies/insertInstanceBeforeStrategy";
import { insertInstanceAfterStrategy } from "../../../src/listr/strategies/insertInstanceAfterStrategy";
import { moveInstanceBeforeStrategy } from "../../../src/listr/strategies/moveInstanceBeforeStrategy";
import { moveInstanceAfterStrategy } from "../../../src/listr/strategies/moveInstanceAfterStrategy";

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
