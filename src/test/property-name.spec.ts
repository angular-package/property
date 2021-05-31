import { PropertyName } from '../lib/property-name.class';
import { ConfigName } from '../name/interface/config-name.interface';
import { is } from '@angular-package/type';
import { PickName } from '../name/interface/pick-name.interface';

new PropertyName();

// describe(PropertyName.name, () => {
//   const name = 'Luther';
//   const config: ConfigName = {
//     prefix: '$$',
//     suffix: '__'
//   };
//   const prefix = config.prefix;
//   const suffix = config.suffix;

//   let firstName: PropertyName;
//   let genericName: PropertyName;

//   // Before.
//   beforeEach(() => {
//     firstName = new PropertyName(name, config);
//     genericName = new PropertyName({
//       name,
//       prefix,
//       suffix
//     }, {
//       prefix: 'not working',
//       suffix: 'not working'
//     });
//   });
//   // Defined.
//   it('is DEFINED', () => expect(PropertyName).toBeDefined());

//   describe(`constant name ${name} initialized`, () => {
//     it(`properly`, () => expect(firstName.get).toEqual(name));
//     it(`with config ${config}`, () => {
//       expect(firstName.generate).toEqual(`${config.prefix}${name}${config.suffix}`);
//       expect(firstName.get).toEqual(name);
//       if (is.objectKey<PickName>(firstName.pick, ['prefix', 'suffix']) && is.string(config.prefix) && is.string(config.suffix)) {
//         expect(firstName.pick.prefix).toEqual(config.prefix);
//         expect(firstName.pick.suffix).toEqual(config.suffix);
//       }
//     });
//   });

//   describe(`constant name ${name}`, () => {
//     it(`cannot be changed`, () => {
//       try {
//         firstName.set('Martin Luther');
//       } catch (e) {
//         expect(e.message).toEqual(`name ${name} is readonly`);
//       }
//     });
//   });

//   describe(`generic name ${name} initialized`, () => {
//     it(`properly`, () => expect(new PropertyName({name}).get).toEqual(name));

//     it(`with config`, () => {
//       expect(genericName.generate).toEqual(`${config.prefix}${name}${config.suffix}`);
//       expect(genericName.get).toEqual(name);
//       if (is.objectKey<PickName>(genericName.pick, ['prefix', 'suffix']) && is.string(config.prefix) && is.string(config.suffix)) {
//         expect(genericName.pick.prefix).toEqual(config.prefix);
//         expect(genericName.pick.suffix).toEqual(config.suffix);
//       }
//     });
//   });

//   describe(`generic name ${name}`, () => {
//     it(`can be changed to 'Martin Luther'`, () => {
//       expect(genericName.set('Martin Luther').get).toEqual('Martin Luther');
//     });
//   });
// });
