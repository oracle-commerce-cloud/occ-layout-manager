import { useApi } from "../../src/api";
import mockAxios from "jest-mock-axios";

const { node, applicationKey } = process.env;
const client = useApi({ node, applicationKey });

describe("useApi", () => {

  describe("create client", () => {
    it("should be able to create client without crashing", () => {
      expect(client).toBeDefined();
      expect(client).not.toBeNull();
    });

    it("should implement the UseApi interface", () => {
      expect(client.login).toBeDefined();
      expect(client.listLayouts).toBeDefined();
      expect(client.listInstances).toBeDefined();
      expect(client.getLayoutStructure).toBeDefined();
      expect(client.saveLayoutStructure).toBeDefined();
    });
  });

  describe("client should be singleton", () => {
    it("get the same instance for the same applicationKey", () => {
      const client2 = useApi({ node, applicationKey });
      expect(client).toEqual(client2);
    });

    it("get a new instance for new applicationKey", () => {
      const client2 = useApi({ node: "test", applicationKey: "test" });
      expect(client).not.toEqual(client2);
    });
  });
});
