import Timeout = NodeJS.Timeout;

export function useInterval (callback: (counter?: number) => any, delay: number) {
  let intervalId: Timeout;
  let counter: number = 0;
  if (delay > 0) {
    intervalId = setInterval(() => {
      counter += 1;
      callback(counter);
    }, delay);
  }
  return {
    clearInterval () {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = undefined;
      }
    },
  };
}
