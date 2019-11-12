import { authLoader } from "../../src/helpers/authLoader";
import ora = require("ora");
import { t } from "../../src/locales/translate";

jest.useFakeTimers();
let spinner = ora();

describe("authLoader", () => {
  afterEach(() => (spinner = ora()));

  it("should be defined", async () => {
    expect(authLoader).toBeTruthy();
  });

  it("should use Ora mock.", async () => {
    expect(jest.isMockFunction(spinner.start)).toBeTruthy();
  });

  it("should initialize spinner and useIntervale.", async () => {
    authLoader(spinner, 3);
    expect(spinner.start).toHaveBeenCalledWith(t("spinnerLoginMsg"));
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 9200);

    // Fast-forward until all timers have been executed
    jest.runOnlyPendingTimers();

    expect(spinner.text).toEqual(t(`spinnerMsg1`));

    // Fast-forward until all timers have been executed
    jest.runOnlyPendingTimers();

    expect(spinner.text).toEqual(t(`spinnerMsg2`));

    // Fast-forward until all timers have been executed
    jest.runOnlyPendingTimers();

    expect(spinner.text).toEqual(t(`spinnerMsg2`));
  });

  it("should return the fail method.", async () => {
    authLoader(spinner, 0).fail("spinnerSucceedMsg");
    expect(spinner.fail).toHaveBeenCalledTimes(1);
    expect(spinner.fail).toHaveBeenCalledWith(t("spinnerSucceedMsg"));
  });

  it("should return the loginSucceed method.", async () => {
    authLoader(spinner, 0).loginSucceed();
    expect(spinner.start).toHaveBeenCalledTimes(2);
    expect(spinner.start).toHaveBeenCalledWith(t("spinnerLoginSucceedMsg"));
  });

  it("should return the succeed method.", async () => {
    authLoader(spinner, 0).succeed();
    expect(spinner.stop).toHaveBeenCalledTimes(1);
    expect(spinner.stop).toHaveBeenCalledWith();
  });

  it("\"should return the allDone method.", async () => {
    authLoader(spinner, 0).allDone();
    expect(spinner.succeed).toHaveBeenCalledTimes(1);
    expect(spinner.succeed).toHaveBeenCalledWith(t("spinnerSucceedMsg"));
  });
});
