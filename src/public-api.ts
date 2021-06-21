/*
 * Public API Surface of property
 */
/**
 * Object.
 */
export {
  get
} from './lib';

/**
 * Function.
 */
export {
  getDescriptor,
  getDescriptors,
  getExistProperty,
  getProperties,
  getProperty,
  setProperty,
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
