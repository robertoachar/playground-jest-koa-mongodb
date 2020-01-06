import checkObjectId from '../checkObjectId';

describe('checkObjectId', () => {
  test('should return true with a valid ObjectId', () => {
    const objectId = '507f191e810c19729de860ea';
    const result = checkObjectId(objectId, 'Error message');

    expect(result).toBe(true);
  });

  test('should throw an error with an empty ObjectId', () => {
    expect(() => {
      checkObjectId('', 'Error message');
    }).toThrowErrorMatchingInlineSnapshot(`"Error message"`);
  });

  test('should throw an error with a string with spaces only', () => {
    expect(() => {
      checkObjectId(' ', 'Error message');
    }).toThrowErrorMatchingInlineSnapshot(`"Error message"`);
  });

  test('should throw an error with an invalid ObjectId', () => {
    expect(() => {
      checkObjectId(undefined, 'Error message');
    }).toThrowErrorMatchingInlineSnapshot(`"Error message"`);

    expect(() => {
      checkObjectId(null, 'Error message');
    }).toThrowErrorMatchingInlineSnapshot(`"Error message"`);

    expect(() => {
      checkObjectId(0, 'Error message');
    }).toThrowErrorMatchingInlineSnapshot(`"Error message"`);

    expect(() => {
      checkObjectId(false, 'Error message');
    }).toThrowErrorMatchingInlineSnapshot(`"Error message"`);
  });
});
