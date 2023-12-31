import { dependentKeyCompat } from '@ember/object/compat';
import { expectTypeOf } from 'expect-type';

expectTypeOf(dependentKeyCompat).toMatchTypeOf<PropertyDecorator>();

// Example (without irrelevant details) from https://api.emberjs.com/ember/3.18/functions/@ember%2Fobject%2Fcompat/dependentKeyCompat
class Person {
  declare firstName: string;
  declare lastName: string;

  @dependentKeyCompat
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

new Person();
