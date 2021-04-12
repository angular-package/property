import { NameGeneric } from '../lib/name-generic.class';

describe(NameGeneric.name, () => {
  const name = 'Ścibor';
  const newName = 'robicŚ';
  const prefix = '$$';
  const newPrefix = '___';
  const newSuffix = '$$$';
  const suffix = '__';
  let nameGeneric: NameGeneric;
  beforeEach(() => {
    nameGeneric = new NameGeneric({
      name,
      prefix,
      suffix
    });
  });
  it(`is DEFINED`, () => expect(nameGeneric).toBeDefined());
  describe('should have' , () => {
    it(`name equal to ${name}.`, () => {
      expect(nameGeneric.get).toEqual(name);
      expect(nameGeneric.pick.name).toEqual(name);
      expect(nameGeneric.pick.name).toEqual(nameGeneric.get);
    });
    it(`name changed to ${newName}.`, () => {
      nameGeneric.set(newName);
      expect(nameGeneric.get).toEqual(newName);
      expect(nameGeneric.pick.name).toEqual(newName);
      expect(nameGeneric.pick.name).toEqual(nameGeneric.get);
    });
    it(`prefix equal to ${prefix}.`, () => expect(nameGeneric.pick.prefix).toEqual(prefix));
    it(`suffix equal to ${suffix}.`, () => expect(nameGeneric.pick.suffix).toEqual(suffix));
    it(`name generated equal to ${prefix}${name}${suffix}.`, () => {
      expect(nameGeneric.pick.generate).toEqual(`${prefix}${name}${suffix}`);
      expect(nameGeneric.generate).toEqual(`${prefix}${name}${suffix}`);
      expect(nameGeneric.generate).toEqual(nameGeneric.pick.generate);
    });
    it(`prefix changed to ${newPrefix} by prefix() and config() method`, () => {
      nameGeneric.prefix(newPrefix);
      expect(nameGeneric.pick.prefix).toEqual(newPrefix);
      nameGeneric.prefix(prefix);
      expect(nameGeneric.pick.prefix).toEqual(prefix);
      nameGeneric.config({prefix: newPrefix});
      expect(nameGeneric.pick.prefix).toEqual(newPrefix);
    });
    it(`suffix changed to ${newSuffix} by suffix() and config() method`, () => {
      nameGeneric.suffix(newSuffix);
      expect(nameGeneric.pick.suffix).toEqual(newSuffix);
      nameGeneric.suffix(suffix);
      expect(nameGeneric.pick.prefix).toEqual(prefix);
      nameGeneric.config({suffix: newSuffix});
      expect(nameGeneric.pick.suffix).toEqual(newSuffix);
    });
  });
});
