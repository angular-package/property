// Class.
import { Objects } from "./objects.class";

// Type.
import { ResultCallback } from "../../type/result-callback.type";

/**
 * @deprecated
 * @param object
 * @param callback
 * @returns
 */
export const getObject = <Obj extends object>(
  object: Obj,
  callback?: ResultCallback
): Obj => (Objects.guard(object, callback) ? object : object);
