/*
 * Public API Surface of property
 */
/**
 * Function.
 */
export {
  getExistProperty,
  getProperty,
  pickProperty,
  setProperty
} from './lib';

/**
 * Descriptor.
 */
// Class.
export {
  AccessorDescriptors,
  DataDescriptors,
  Descriptor
} from './descriptor';
// Interface.
export {
  AccessorDescriptor,
  DataDescriptor
} from './descriptor/interface';
// Type.
export {
  ThisAccessorDescriptor
} from './descriptor/type';
