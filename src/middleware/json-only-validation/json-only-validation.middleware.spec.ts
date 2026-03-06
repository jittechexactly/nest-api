import { JsonOnlyValidationMiddleware } from './json-only-validation.middleware';

describe('JsonOnlyValidationMiddleware', () => {
  it('should be defined', () => {
    expect(new JsonOnlyValidationMiddleware()).toBeDefined();
  });
});
