// Class.
import { Obj } from "../src/obj.class";
/**
 * 
 */
export type ObjsContainer<Objs extends object, Name extends keyof Objs> =
 Objs[Name] extends object ? Obj<Objs[Name]> : undefined;
