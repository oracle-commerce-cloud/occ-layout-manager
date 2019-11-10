import { useApi } from "../../src/api";
import mockAxios from "jest-mock-axios";

import layoutStructure from "../mock/layoutStructure.json";

const { node, applicationKey } = process.env || { node: "https://test.com", applicationKey: "hhhhh" };
const { saveLayoutStructure } = useApi({ node, applicationKey });

describe("useApi.saveLayoutStructure", () => {
  it("should be defined", async () => {
    expect(saveLayoutStructure).toBeDefined();
    expect(saveLayoutStructure).not.toBeNull();
  });

  it("save the structure of a layout including regions and widgets based on the id=homePageLayout", async () => {
    const repositoryId = "homePageLayout";
    const { layout } = layoutStructure;
    const catchFn = jest.fn((err: any) => console.trace(err));
    const thenFn = jest.fn();

    // using the component, which should make a server response

    const promise = saveLayoutStructure(repositoryId, layoutStructure)
      .then(thenFn)
      .catch(catchFn);

    // since `post` method is a spy, we can check if the server request was correct
    // a) the correct method was used (post)
    // b) went to the correct Endpoint URL ('/layouts/${repositoryId}/structure')
    // c) if the payload was correct (grant_type, Authorization, Content-Type)
    expect(mockAxios.put).toHaveBeenCalledWith(`/layouts/${repositoryId}/structure`, { layout });

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
