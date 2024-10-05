// Function.
import { errorCallback } from './error-callback.function';
// Interface.
import { Callbacks } from '../interface/callbacks.interface';
/**
 * Object with all necessary callbacks for the property package.
 */
export const callbacks: Callbacks = {
  accessor: errorCallback(`Accessor descriptor must be an \`ThisAccessorDescriptor<Value, Obj>\` type`),
  data: errorCallback(`Data descriptor must be an \`DataDescriptors<Value>\` type`),
  descriptor: errorCallback(`Any kind of descriptor was not found`),
  // getExistProperty: errorCallback(`Object with the specified key does not exist`),
};
