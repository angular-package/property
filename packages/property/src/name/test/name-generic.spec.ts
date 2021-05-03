import { NameGeneric } from '../lib/name-generic.class';

describe(NameGeneric.name, () => {
  const name = 'Ścibor';
  const newName = 'robicŚ';
  const prefix = '$$';
  const newPrefix = '___';
  const newSuffix = '$$$';
  const suffix = '__';
  // Define.
  let nameGeneric: NameGeneric;
  beforeEach(() => nameGeneric = new NameGeneric({ name, prefix, suffix }));
  // Defined.
  it(`is DEFINED`, () => expect(nameGeneric).toBeDefined());
  // Test.
  describe('should have' , () => {
    it(`name equal to ${name}.`, () => {
      expect(nameGeneric.get).toEqual(name);
      expect(nameGeneric.pick.name).toEqual(name);
      expect(nameGeneric.pick.name).toEqual(nameGeneric.get);
    });
    it(`name changed to ${newName}.`, () => {
      expect(nameGeneric.set(newName).get).toEqual(newName);
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
      expect(nameGeneric.prefix(newPrefix).pick.prefix).toEqual(newPrefix);
      expect(nameGeneric.prefix(prefix).pick.prefix).toEqual(prefix);
      expect(nameGeneric.config({prefix: newPrefix}).pick.prefix).toEqual(newPrefix);
    });
    it(`suffix changed to ${newSuffix} by suffix() and config() method`, () => {
      expect(nameGeneric.suffix(newSuffix).pick.suffix).toEqual(newSuffix);
      expect(nameGeneric.suffix(suffix).pick.prefix).toEqual(prefix);
      expect(nameGeneric.config({suffix: newSuffix}).pick.suffix).toEqual(newSuffix);
    });
  });
});
