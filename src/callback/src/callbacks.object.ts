// Function.
import { errorCallback } from './error-callback.function';
// Interface.
import { Callbacks } from '../interface/callbacks.interface';
/**
 * Object with all necessary callbacks for the property package.
 */
export const callbacks: Callbacks = {

  accessor: errorCallback(`Accessor descriptor must be an \`ThisAccessorDescriptor<Value, Obj>\` type`, 'type'),

  data: errorCallback(`Data descriptor must be an \`DataDescriptors<Value>\` type`, 'type'),
  descriptor: errorCallback(`Any kind of descriptor was not found`, 'type'),

  getExistProperty: errorCallback(`Object with the specified key does not exist`, 'type'),
  getObject: errorCallback(`Provided value is not an \`object\``, 'type'),

  name: errorCallback(`Name must be a \`string\` type`, 'type'),

  prefix: errorCallback(`Prefix must be a \`string\` type`, 'type'),
  suffix: errorCallback(`Suffix must be a \`string\` type`, 'type'),
  constantName: errorCallback(`A \`string\` \`name\` must be initialized`, 'type')

};
