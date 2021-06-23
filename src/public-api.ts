/*
 * Public API Surface of property
 */
/**
 * Default.
 */
// Object.
export {
  get,
} from './lib';
/**
 * Callback.
 */
// Object.
export { callbacks } from './callback';
// Function.
export { errorCallback } from './callback';

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
  CommonDescriptor,
  DataDescriptor
} from './descriptor/interface';
// Type.
export {
  ThisAccessorDescriptor
} from './descriptor/type';
