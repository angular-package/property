import { NamePrefix } from '../lib/name-prefix.class';

describe('NamePrefix', () => {
  let namePrefix: NamePrefix;
  beforeEach(() => namePrefix = new NamePrefix());

  it('is DEFINED', () => expect(namePrefix).toBeDefined());
  it('initially set prefix to $$', () => expect(new NamePrefix('$$').get).toEqual('$$'));
  it('set prefix to $$', () => expect(namePrefix.set('$$').get).toEqual('$$'));
});
