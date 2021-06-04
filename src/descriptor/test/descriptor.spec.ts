// Class.
import { Descriptor } from '../lib/descriptor.class';
// Variables.
import { FALSE, TRUE } from '../../test/variables/boolean.const';
import { NUMBER } from '../../test/variables/number.const';
import { ObjectOne, OBJECT_ONE } from '../../test/variables/object.const';
import { STRING } from '../../test/variables/string.const';
import { SYMBOL_NUMBER } from '../../test/variables/symbol.const';

describe(Descriptor.name, () => {
  // Defined.
  it('is defined', () => expect(Descriptor).toBeDefined());

  describe(`Descriptor<number, ObjectOne>(AccessorDescriptor)`, () => {
    let numberAccessorDescriptor: Descriptor<number, ObjectOne>;
    // Before.
    beforeEach(
      () =>
        (numberAccessorDescriptor = new Descriptor<number, ObjectOne>({
          get(): number {
            return this.x;
          },
          set(value: number): void {
            this.x = value;
          },
        }))
    );

    it(`is properly initialized with AccessorDescriptor`, () => {
      expect(numberAccessorDescriptor.get.accessor.configurable).toBe(TRUE);
      expect(numberAccessorDescriptor.get.accessor.enumerable).toBe(TRUE);
      const newObject: { prop: number } & ObjectOne = Object.defineProperty(
        { ...{}, ...OBJECT_ONE },
        'prop',
        numberAccessorDescriptor.get.accessor
      );
      expect(newObject.prop).toEqual(OBJECT_ONE.x);
    });
  });

  describe(`Descriptor<number, ObjectOne>(DataAccessor)`, () => {
    let numberDataDescriptor: Descriptor<number, ObjectOne>;
    // Before.
    beforeEach(
      () =>
        (numberDataDescriptor = new Descriptor<number, ObjectOne>({
          configurable: false,
          enumerable: false,
          writable: false,
          value: 5,
        }))
    );

    it(`is properly initialized with DataAccessor`, () => {
      expect(numberDataDescriptor.get.data.configurable).toBe(FALSE);
      expect(numberDataDescriptor.get.data.enumerable).toBe(FALSE);
      expect(numberDataDescriptor.get.data.writable).toBe(FALSE);
      expect(numberDataDescriptor.get.data.value).toEqual(5);
    });
  });

  describe(`Descriptor<number, ObjectOne>`, () => {
    let numberDataDescriptor: Descriptor<number, ObjectOne>;

    // Before.
    beforeEach(
      () => (numberDataDescriptor = new Descriptor<number, ObjectOne>())
    );
    it('is defined', () => expect(numberDataDescriptor).toBeDefined());

    it(`accessor(AccessorDescriptor)`, () => {
      numberDataDescriptor.accessor({
        get(): number {
          return this.x;
        },
        set(value: number): void {
          this.x = value;
        },
      });
      expect(numberDataDescriptor.get.accessor.configurable).toBe(TRUE);
      expect(numberDataDescriptor.get.accessor.enumerable).toBe(TRUE);
      const newObject: { prop: number } & ObjectOne = Object.defineProperty(
        { ...{}, ...OBJECT_ONE },
        'prop',
        numberDataDescriptor.get.accessor
      );
      expect(newObject.prop).toEqual(OBJECT_ONE.x);
    });

    it(`data(DataDescriptor)`, () => {
      numberDataDescriptor.data({
        writable: true,
        value: 5,
      });
      expect(numberDataDescriptor.get.data.configurable).toBe(TRUE);
      expect(numberDataDescriptor.get.data.enumerable).toBe(TRUE);
      expect(numberDataDescriptor.get.data.writable).toBe(TRUE);
      expect(numberDataDescriptor.get.data.value).toEqual(5);
    });

    it(`set(AccessorDescriptor)`, () => {
      numberDataDescriptor.set({
        get(): number {
          return this.x;
        },
        set(value: number): void {
          this.x = value;
        },
      });
      expect(numberDataDescriptor.get.accessor.configurable).toBe(TRUE);
      expect(numberDataDescriptor.get.accessor.enumerable).toBe(TRUE);
      const newObject: { prop: number } & ObjectOne = Object.defineProperty(
        { ...{}, ...OBJECT_ONE },
        'prop',
        numberDataDescriptor.get.accessor
      );
      expect(newObject.prop).toEqual(OBJECT_ONE.x);
    });
  });

  describe(`Descriptor<string, ObjectOne>`, () => {
    // Variables.
    let stringDescriptor: Descriptor<string, ObjectOne>;
    // Before.
    beforeEach(() => (stringDescriptor = new Descriptor()));

    it('defined', () => expect(stringDescriptor).toBeDefined());

    it('accessor(AccessorDescriptor)', () => {
      stringDescriptor.accessor({
        get(): string {
          return this.test;
        },
        set(value: string): void {
          this.test = value;
        },
      });
      expect(stringDescriptor.get.accessor.configurable).toBe(TRUE);
      expect(stringDescriptor.get.accessor.enumerable).toBe(TRUE);
      const newObject: { prop: string } & ObjectOne = Object.defineProperty(
        { ...{}, ...OBJECT_ONE },
        'prop',
        stringDescriptor.get.accessor
      );
      expect(newObject.prop).toEqual(OBJECT_ONE.test);
    });

    describe(`set`, () => {
      it(`(DataDescriptor)`, () => {
        stringDescriptor.set({
          writable: true,
          value: 'Bla',
        });
        expect(stringDescriptor.get.data.configurable).toBe(TRUE);
        expect(stringDescriptor.get.data.enumerable).toBe(TRUE);
        expect(stringDescriptor.get.data.writable).toBe(TRUE);
        expect(stringDescriptor.get.data.value).toEqual('Bla');
      });
    });

    describe(`object`, () => {
      let anyDescriptor: Descriptor<any, ObjectOne>;
      it(`(OBJECT_ONE)`, () => {
        const getObjectDescriptors =
          stringDescriptor.get.own.object(OBJECT_ONE);
        expect(getObjectDescriptors).toBeDefined();
        // if (getObjectDescriptors) {
        //   expect(getObjectDescriptors.configurable).toBe(TRUE);
        //   expect(getObjectDescriptors.enumerable).toBe(TRUE);
        //   expect(getObjectDescriptors.writable).toBe(TRUE);
        //   expect(getObjectDescriptors.value).toEqual(OBJECT_ONE.test);
        // }
      });
    });

    describe(`property`, () => {
      it(`(OBJECT_ONE, 'test')`, () => {
        const getDescriptor = stringDescriptor.get.own.property(
          'test',
          OBJECT_ONE
        );
        expect(getDescriptor).toBeDefined();
        if (getDescriptor) {
          expect(getDescriptor.configurable).toBe(TRUE);
          expect(getDescriptor.enumerable).toBe(TRUE);
          expect(getDescriptor.writable).toBe(TRUE);
          expect(getDescriptor.value).toEqual(OBJECT_ONE.test);
        }
      });

      it(`(OBJECT_ONE, SYMBOL_NUMBER)`, () => {
        const getDescriptor = stringDescriptor.get.own.property(
          SYMBOL_NUMBER,
          OBJECT_ONE
        );
        expect(getDescriptor).toBeDefined();
        if (getDescriptor) {
          expect(getDescriptor.configurable).toBe(TRUE);
          expect(getDescriptor.enumerable).toBe(TRUE);
          expect(getDescriptor.writable).toBe(TRUE);
          expect(getDescriptor.value).toEqual('key is symbol number');
        }
      });

      it(`(OBJECT_ONE, NUMBER)`, () => {
        const getDescriptor = stringDescriptor.get.own.property(
          NUMBER,
          OBJECT_ONE
        );
        expect(getDescriptor).toBeDefined();
        if (getDescriptor) {
          expect(getDescriptor.configurable).toBe(TRUE);
          expect(getDescriptor.enumerable).toBe(TRUE);
          expect(getDescriptor.writable).toBe(TRUE);
          expect(getDescriptor.value).toEqual('key is number');
        }
      });
    });
  });
});
