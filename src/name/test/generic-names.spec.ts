import { Name } from '../lib/name.class';

describe(Name.name, () => {
  const name = 'Ścibor';
  const newName = 'robicŚ';
  const prefix = '$$';
  const newPrefix = '___';
  const newSuffix = '$$$';
  const suffix = '__';
  // Define.
  let genericNames: Name;
  beforeEach(() => genericNames = new Name({ name, prefix, suffix }));
  // Defined.
  it(`is DEFINED`, () => expect(genericNames).toBeDefined());
  // Test.
  describe('should have' , () => {
    it(`name equal to ${name}.`, () => {
      expect(genericNames.get).toEqual(name);
      expect(genericNames.pick.name).toEqual(name);
      expect(genericNames.pick.name).toEqual(genericNames.get);
    });
    it(`name changed to ${newName}.`, () => {
      expect(genericNames.set(newName).get).toEqual(newName);
      expect(genericNames.pick.name).toEqual(newName);
      expect(genericNames.pick.name).toEqual(genericNames.get);
    });
    it(`prefix equal to ${prefix}.`, () => expect(genericNames.pick.prefix).toEqual(prefix));
    it(`suffix equal to ${suffix}.`, () => expect(genericNames.pick.suffix).toEqual(suffix));
    it(`name generated equal to ${prefix}${name}${suffix}.`, () => {
      expect(genericNames.pick.generate).toEqual(`${prefix}${name}${suffix}`);
      expect(genericNames.generate).toEqual(`${prefix}${name}${suffix}`);
      expect(genericNames.generate).toEqual(genericNames.pick.generate);
    });
    it(`prefix changed to ${newPrefix} by prefix() and config() method`, () => {
      expect(genericNames.prefix(newPrefix).pick.prefix).toEqual(newPrefix);
      expect(genericNames.prefix(prefix).pick.prefix).toEqual(prefix);
      // expect(genericNames.config({prefix: newPrefix}).pick.prefix).toEqual(newPrefix);
    });
    it(`suffix changed to ${newSuffix} by suffix() and config() method`, () => {
      expect(genericNames.suffix(newSuffix).pick.suffix).toEqual(newSuffix);
      expect(genericNames.suffix(suffix).pick.prefix).toEqual(prefix);
      // expect(genericNames.config({suffix: newSuffix}).pick.suffix).toEqual(newSuffix);
    });
  });
});
