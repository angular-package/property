import { errorCallback } from '../callback/src/error-callback.function';

export const callbacks = {
  accessor: errorCallback(`Accessor descriptor must be an \`ThisAccessorDescriptor<Value, Obj>\` type`),
  data: errorCallback(`Data descriptor must be an \`DataDescriptors<Value>\` type`),
  descriptor: errorCallback(`Any kind of descriptor was not found`),
  getExistProperty: errorCallback(`Object of the specified key does not exist`, false),
};
