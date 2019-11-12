import { useInterval } from "../../src/helpers/useInterval";
import { useTranslate } from "../mock/useTranslateMock";
import { timeInterval } from "rxjs/internal/operators";

jest.useFakeTimers();
const timeIntervalMock: any = setInterval;

describe("useInterval", () => {
  beforeEach(timeIntervalMock.mockClear);

  it("should be defined", async () => {
    expect(useInterval).toBeTruthy();
  });

  it("useIntervale.", async () => {
    const callback = jest.fn();
    const { clearInterval } = useInterval(callback, 9200);
    // At this point in time, the callback should not have been called yet
    expect(callback).not.toBeCalled();

    // Fast-forward until all timers have been executed
    jest.runOnlyPendingTimers();

    // Now our callback should have been called!
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(1);

    jest.runOnlyPendingTimers();

    // Now our callback should have been called a second time !
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenCalledWith(2);

    clearInterval();

    jest.runOnlyPendingTimers();

    // Now our callback should not call for the 3rd time!
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenCalledWith(2);

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 9200);
  });

  it("useIntervale 2.", async () => {
    const callback = jest.fn();
    const { clearInterval } = useInterval(callback, 0);
    useInterval(callback, -1000);
    // At this point in time, the callback should not have been called yet
    expect(callback).not.toBeCalled();

    // Fast-forward until all timers have been executed
    jest.runOnlyPendingTimers();

    // Now our callback should have been called!
    expect(callback).not.toBeCalled();

    clearInterval();

    expect(setInterval).toHaveBeenCalledTimes(0);
  });
});
