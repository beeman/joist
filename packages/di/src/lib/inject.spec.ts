import { getMetadataRef } from './metadata';
import { Inject } from './inject';

describe('Inject', () => {
  class A {}
  class B {}
  class C {
    constructor(@Inject(A) _a: A, @Inject(B) _b: B) {}
  }

  it('should add deps to metadata', () => {
    const metadata = getMetadataRef(C);

    expect(metadata.deps).toEqual([A, B]);
  });
});