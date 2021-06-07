import { ConstantName } from '../lib/constant-names.class';

describe(ConstantName.name, () => {
  const name = 'Ścibor';
  const prefix = '$$';
  const newPrefix = '___';
  const newSuffix = '$$$';
  const suffix = '__';

  let constantNames: ConstantName;

  beforeEach(() => constantNames = new ConstantName(name, { prefix, suffix }));

  it(`is DEFINED`, () => expect(constantNames).toBeDefined());

  describe('should have' , () => {
    // name.
    it(`name equal to ${name}.`, () => {
      expect(constantNames.get).toEqual(name);
      expect(constantNames.pick.name).toEqual(name);
      expect(constantNames.pick.name).toEqual(constantNames.get);
    });
    // prefix.
    it(`prefix equal to ${prefix}.`, () => expect(constantNames.pick.prefix).toEqual(prefix));
    // suffix.
    it(`suffix equal to ${suffix}.`, () => expect(constantNames.pick.suffix).toEqual(suffix));
    it(`name generated equal to ${prefix}${name}${suffix}.`, () => {
      expect(constantNames.pick.generate).toEqual(`${prefix}${name}${suffix}`);
      expect(constantNames.generate).toEqual(`${prefix}${name}${suffix}`);
      expect(constantNames.generate).toEqual(constantNames.pick.generate);
    });
    it(`prefix changed to ${newPrefix} by prefix() and config() method`, () => {
      expect(constantNames.prefix(newPrefix).pick.prefix).toEqual(newPrefix);
      expect(constantNames.prefix(prefix).pick.prefix).toEqual(prefix);
      // expect(constantNames.config({prefix: newPrefix}).pick.prefix).toEqual(newPrefix);
    });
    it(`suffix changed to ${newSuffix} by suffix() and config() method`, () => {
      expect(constantNames.suffix(newSuffix).pick.suffix).toEqual(newSuffix);
      expect(constantNames.suffix(suffix).pick.prefix).toEqual(prefix);
      // expect(constantNames.config({suffix: newSuffix}).pick.suffix).toEqual(newSuffix);
    });
  });
});
