import { useApi } from "../../src/api";
import mockAxios from "jest-mock-axios";

import layoutStructure from "../mock/layoutStructure.json";

const { node, applicationKey } = process.env || { node: "https://test.com", applicationKey: "hhhhh" };
const { getLayoutStructure } = useApi({ node, applicationKey });

describe("useApi.getLayoutStructure", () => {
  it("should be defined", async () => {
    expect(getLayoutStructure).toBeDefined();
    expect(getLayoutStructure).not.toBeNull();
  });

  it("get the structure of a layout including regions and widgets based on the id=homePageLayout", async () => {
    const repositoryId = "homePageLayout";
    const catchFn = jest.fn((err: any) => console.trace(err));
    const thenFn = jest.fn();

    // using the component, which should make a server response

    const promise = getLayoutStructure(repositoryId)
      .then(thenFn)
      .catch(catchFn);

    // since `get` method is a spy, we can check if the server request was correct
    // a) the correct method was used (get)
    // b) went to the correct Endpoint URL ('/layouts/${repositoryId}/structure')
    expect(mockAxios.get).toHaveBeenCalledWith(`/layouts/${repositoryId}/structure`);

    // simulating a server response
    mockAxios.mockResponse({ data: layoutStructure });

    await promise;

    // checking the `then` spy has been called and if the
    // response from the server was converted to upper case
    expect(thenFn).toHaveBeenCalledWith(layoutStructure);

    // catch should not have been called
    expect(catchFn).not.toHaveBeenCalled();
  });
});
