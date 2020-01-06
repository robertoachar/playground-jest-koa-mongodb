import checkString from '../checkString';

describe('checkString', () => {
  test('should return true with a valid string', () => {
    const result = checkString('string', 'Error message');
    expect(result).toBe(true);
  });

  test('should throw an error with an empty string', () => {
    expect(() => {
      checkString('', 'Error message');
    }).toThrowErrorMatchingInlineSnapshot(`"Error message"`);
  });

  test('should throw an error with a string with spaces only', () => {
    expect(() => {
      checkString(' ', 'Error message');
    }).toThrowErrorMatchingInlineSnapshot(`"Error message"`);
  });

  test('should throw an error with an invalid string', () => {
    expect(() => {
      checkString(undefined, 'Error message');
    }).toThrowErrorMatchingInlineSnapshot(`"Error message"`);

    expect(() => {
      checkString(null, 'Error message');
    }).toThrowErrorMatchingInlineSnapshot(`"Error message"`);

    expect(() => {
      checkString(0, 'Error message');
    }).toThrowErrorMatchingInlineSnapshot(`"Error message"`);

    expect(() => {
      checkString(false, 'Error message');
    }).toThrowErrorMatchingInlineSnapshot(`"Error message"`);
  });
});
