// Class.
import { Objects } from "./objects.class";

// Type.
import { ResultCallback } from "../../type/result-callback.type";

/**
 *
 * @param object
 * @param callback
 * @returns
 */
export const getObject = <Obj extends object>(
  object: Obj,
  callback?: ResultCallback
): Obj => (Objects.guardObject(object, callback) ? object : object);
