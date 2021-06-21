import { is } from '@angular-package/type';
// Function.
import { getDescriptor } from '../lib/get-descriptor.function';
// Constants.
import { CLASS } from '../../test/constants/class.const';
import { SYMBOL_NUMBER } from '../../test/constants/symbol.const';

function checkDataDescriptor(
  descriptor: PropertyDescriptor,
  expectedDescriptor: PropertyDescriptor
): void {
  expect(descriptor.configurable).toEqual(expectedDescriptor.configurable);
  expect(descriptor.enumerable).toEqual(expectedDescriptor.enumerable);
  expect(descriptor.writable).toEqual(expectedDescriptor.writable);
  expect(descriptor.value).toEqual(expectedDescriptor.value);
}

function checkAccessorDescriptor(
  descriptor: PropertyDescriptor,
  expectedDescriptor: PropertyDescriptor
): void {
  expect(descriptor.configurable).toEqual(expectedDescriptor.configurable);
  expect(descriptor.enumerable).toEqual(expectedDescriptor.enumerable);
  expect(descriptor.get).toBeTrue();
  expect(descriptor.set).toBeTrue();
}

/**
 * Test.
 */
describe(getDescriptor.name, () => {
  // Defined.
  it('is defined', () => expect(getDescriptor).toBeDefined());

  it('get descriptor from the CLASS', () => {
    checkDataDescriptor(getDescriptor(CLASS, 'firstName') as any, {
      value: 'My name',
      writable: true,
      enumerable: true,
      configurable: true,
    });
    checkDataDescriptor(getDescriptor(CLASS, 'surname') as any, {
      value: 'Surname',
      writable: true,
      enumerable: true,
      configurable: true,
    });
    checkDataDescriptor(getDescriptor(CLASS, 'x') as any, {
      value: 10304050,
      writable: true,
      enumerable: true,
      configurable: true,
    });

  });

});
