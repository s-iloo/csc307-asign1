import mut from "./module.js";

test("Testing sum -- success", () => {
  const expected = 30;
  const got = mut.sum(12, 18);
  expect(got).toBe(expected);
});

test("Testing div -- success", () => {
  const expected = 30;
  const got = mut.div(60, 2);
  expect(got).toBe(expected);
});

test("Testing contains numbers -- success", () => {
  const expected = true;
  const got = mut.containsNumbers("hello123");
  expect(got).toBe(expected);
});

test("Testing contains number -- success", () => {
  const got = mut.containsNumbers("hello");
  expect(got).toBeFalsy();
});

test("Testing contains numbers -- success", () => {
  const expected = true;
  const got = mut.containsNumbers(123);
  expect(got).toBe(expected);
});
