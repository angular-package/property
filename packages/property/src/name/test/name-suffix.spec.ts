import { NameSuffix } from '../lib/name-suffix.class';

describe(NameSuffix.name, () => {
  let nameSuffix: NameSuffix;
  beforeEach(() => nameSuffix = new NameSuffix());

  it('is DEFINED', () => expect(nameSuffix).toBeDefined());
  it('initially set prefix to $$', () => expect(new NameSuffix('$$').get).toEqual('$$'));
  it('set prefix to $$', () => expect(nameSuffix.set('$$').get).toEqual('$$'));
});
