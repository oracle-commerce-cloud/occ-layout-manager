import { Ora } from "ora";
import { t } from "../locales/translate";
import { useInterval } from "./useInterval";

export const authLoader = (spinner: Ora, length: number) => {
  spinner.start(t("spinnerLoginMsg"));
  const longWaitingTime = () =>
    useInterval((counter: number) => {
      spinner.text = t(`spinnerMsg${counter < length ? counter : length - 1}`);
    }, 9200);
  let interval = longWaitingTime();

  return {
    fail (msg: string) {
      spinner.fail(t(msg));
      interval.clearInterval();
    },
    loginSucceed () {
      interval.clearInterval();
      interval = longWaitingTime();
      spinner.start(t("spinnerLoginSucceedMsg"));
    },
    succeed () {
      spinner.stop();
      interval.clearInterval();
    },
    allDone () {
      spinner.succeed(t("spinnerSucceedMsg"));
      interval.clearInterval();
    },
  };
};
