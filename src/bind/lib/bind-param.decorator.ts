// import { Func, is } from '@angular-package/type';

// export function BindParam<C>(param: string | Array<string>): MethodDecorator {
//   return (target: Func, key: string, descriptor: any): any => {

//     const originalMethod = descriptor.value;

//     descriptor.value =  function(): void {
//       if (typeof param === 'string') {
//         param = [param];
//       }

//       if (Array.isArray(param) && Array.isArray(arguments)) {
//         param.forEach((name: string, index: number) => {
//           if (is.object<C>(arguments[index])) {
//             this[name] = arguments[index];
//           } else {
//             throw new Error(`Argument(${param}): must be type <T>`);
//           }
//         });
//       }
//       const result = originalMethod.apply(this, arguments);


//       return result;
//     };

//     return descriptor;
//   };
// }
