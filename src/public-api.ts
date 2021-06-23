/*
 * Public API Surface of property
 */
// Object.
export { get } from './lib';
export { callbacks } from './callback';
export { getObject } from './object';

// Function.
export {
  getDescriptor,
  getDescriptors,
  getExistProperty,
  getProperties,
  getProperty,
  setProperty,
} from './lib';
export { errorCallback } from './callback';

// Class.
export { AccessorDescriptors, DataDescriptors, Descriptor } from './descriptor';

// Interface.
export {
  AccessorDescriptor,
  CommonDescriptor,
  DataDescriptor,
} from './descriptor/interface';

// Type.
export { ThisAccessorDescriptor } from './descriptor/type';
