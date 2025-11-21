const { sum, multiply } = require('../src/index');

test('suma 2 + 3 = 5', () => {
  expect(sum(2, 3)).toBe(5);
});

test('multiplica 4 * 5 = 20', () => {
  expect(multiply(4, 5)).toBe(20);
});
