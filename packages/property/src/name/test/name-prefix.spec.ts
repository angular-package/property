import { NamePrefix } from '../lib/name-prefix.class';

describe('NamePrefix', () => {
  let namePrefix: NamePrefix;
  beforeEach(() => {
    namePrefix = new NamePrefix();
  });
  it('is DEFINED', () => expect(NamePrefix).toBeDefined());
  it('initially set prefix to $$', () => expect(new NamePrefix('$$').get).toEqual('$$'));
  it('set prefix to $$', () => {
    namePrefix.set('$$');
    expect(namePrefix.get).toEqual('$$');
  });
});
