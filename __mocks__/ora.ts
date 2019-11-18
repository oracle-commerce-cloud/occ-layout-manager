interface Ora {
  text: string;

  start (text?: string): Ora;
  stop (): Ora;
  succeed (text?: string): Ora;
  fail (text?: string): Ora;
}

module.exports = jest.fn(
  (): Ora => {
    const ora = {
      text: "",

      start: jest.fn(
        (text?: string): Ora => {
          ora.text = text;
          return ora;
        },
      ),
      stop: jest.fn(
        (): Ora => {
          ora.text = undefined;
          return ora;
        },
      ),
      succeed: jest.fn(
        (text?: string): Ora => {
          ora.text = text;
          return ora;
        },
      ),
      fail: jest.fn(
        (text?: string): Ora => {
          ora.text = text;
          return ora;
        },
      ),
    };
    return ora;
  },
);
