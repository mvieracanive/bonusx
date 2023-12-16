import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsMaxSize(property: number, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isMaxSize',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];

          console.log(relatedPropertyName, relatedValue)

          if (!(typeof value === 'number' && typeof relatedValue === 'string')) {
            return true
          }

          const relatedSize = (Buffer.from(relatedValue)).length

          console.log('Value, size', relatedValue, value)
          return relatedSize > value; // you can return a Promise<boolean> here as well, if you want to make async validation
        },
      },
    });
  };
}
