import { NameConstant } from '../lib/name-constant.class';

describe(NameConstant.name, () => {
  const name = 'Ścibor';
  const prefix = '$$';
  const newPrefix = '___';
  const newSuffix = '$$$';
  const suffix = '__';
  let nameConstant: NameConstant;
  beforeEach(() => {
    nameConstant = new NameConstant(name, {
      prefix,
      suffix
    });
  });
  it(`is DEFINED`, () => expect(nameConstant).toBeDefined());
  describe('should have' , () => {
    it(`name equal to ${name}.`, () => {
      expect(nameConstant.get).toEqual(name);
      expect(nameConstant.pick.name).toEqual(name);
      expect(nameConstant.pick.name).toEqual(nameConstant.get);
    });
    it(`prefix equal to ${prefix}.`, () => {
      expect(nameConstant.pick.prefix).toEqual(prefix);
    });
    it(`suffix equal to ${suffix}.`, () => {
      expect(nameConstant.pick.suffix).toEqual(suffix);
    });
    it(`name generated equal to ${prefix}${name}${suffix}.`, () => {
      expect(nameConstant.pick.generate).toEqual(`${prefix}${name}${suffix}`);
      expect(nameConstant.generate).toEqual(`${prefix}${name}${suffix}`);
      expect(nameConstant.generate).toEqual(nameConstant.pick.generate);
    });
    it(`prefix changed to ${newPrefix} by prefix() and config() method`, () => {
      nameConstant.prefix(newPrefix);
      expect(nameConstant.pick.prefix).toEqual(newPrefix);
      nameConstant.prefix(prefix);
      expect(nameConstant.pick.prefix).toEqual(prefix);
      nameConstant.config({prefix: newPrefix});
      expect(nameConstant.pick.prefix).toEqual(newPrefix);
    });
    it(`suffix changed to ${newSuffix} by suffix() and config() method`, () => {
      nameConstant.suffix(newSuffix);
      expect(nameConstant.pick.suffix).toEqual(newSuffix);
      nameConstant.suffix(suffix);
      expect(nameConstant.pick.prefix).toEqual(prefix);
      nameConstant.config({suffix: newSuffix});
      expect(nameConstant.pick.suffix).toEqual(newSuffix);
    });
  });
});
