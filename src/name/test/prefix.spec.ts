import { Prefix } from '../lib/prefix.class';

describe(Prefix.name, () => {
  let namePrefix: Prefix;

  beforeEach(() => namePrefix = new Prefix());

  it('is DEFINED', () => expect(namePrefix).toBeDefined());
  it('initially set prefix to $$', () => expect(new Prefix('$$').get).toEqual('$$'));
  it('set prefix to $$', () => expect(namePrefix.set('$$').get).toEqual('$$'));
});
