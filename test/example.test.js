const sum = require("./sum");

test("it should add numbers", () => {
  expect(sum(1, 2)).toBe(3);
});
