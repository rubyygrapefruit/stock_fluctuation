const sum = require("./sum");

test("it should add numbers", () => {
  expect(sum(2, 2)).toBe(4);
});
