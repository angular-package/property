import { NameConstant } from '../lib/name-constant.class';

describe(NameConstant.name, () => {
  const name = 'Ścibor';
  const prefix = '$$';
  const newPrefix = '___';
  const newSuffix = '$$$';
  const suffix = '__';

  let nameConstant: NameConstant;
  beforeEach(() => nameConstant = new NameConstant(name, { prefix, suffix }));

  it(`is DEFINED`, () => expect(nameConstant).toBeDefined());

  describe('should have' , () => {
    // name.
    it(`name equal to ${name}.`, () => {
      expect(nameConstant.get).toEqual(name);
      expect(nameConstant.pick.name).toEqual(name);
      expect(nameConstant.pick.name).toEqual(nameConstant.get);
    });
    // prefix.
    it(`prefix equal to ${prefix}.`, () => expect(nameConstant.pick.prefix).toEqual(prefix));
    // suffix.
    it(`suffix equal to ${suffix}.`, () => expect(nameConstant.pick.suffix).toEqual(suffix));
    it(`name generated equal to ${prefix}${name}${suffix}.`, () => {
      expect(nameConstant.pick.generate).toEqual(`${prefix}${name}${suffix}`);
      expect(nameConstant.generate).toEqual(`${prefix}${name}${suffix}`);
      expect(nameConstant.generate).toEqual(nameConstant.pick.generate);
    });
    it(`prefix changed to ${newPrefix} by prefix() and config() method`, () => {
      expect(nameConstant.prefix(newPrefix).pick.prefix).toEqual(newPrefix);
      expect(nameConstant.prefix(prefix).pick.prefix).toEqual(prefix);
      expect(nameConstant.config({prefix: newPrefix}).pick.prefix).toEqual(newPrefix);
    });
    it(`suffix changed to ${newSuffix} by suffix() and config() method`, () => {
      expect(nameConstant.suffix(newSuffix).pick.suffix).toEqual(newSuffix);
      expect(nameConstant.suffix(suffix).pick.prefix).toEqual(prefix);
      expect(nameConstant.config({suffix: newSuffix}).pick.suffix).toEqual(newSuffix);
    });
  });
});
