import pluralize from "pluralize"
import {pipe} from "./pipe"

export function plural(input: string): string {
  return pluralize.isPlural(input) ? input : pluralize.plural(input)
}

export function addSpaceBeforeCapitals(input: string): string {
  return singleCamel(input).replace(/(?!^)([A-Z])/g, " $1")
}

export function singular(input: string): string {
  return pluralize.isSingular(input) ? input : pluralize.singular(input)
}

export function capitalize(input: string): string {
  return `${input.slice(0, 1).toUpperCase()}${input.slice(1)}`
}

export function uncapitalize(input: string): string {
  return `${input.slice(0, 1).toLowerCase()}${input.slice(1)}`
}

export const singlePascal = pipe(singular, capitalize)
export const singleCamel = pipe(singular, uncapitalize)
export const pluralPascal = pipe(plural, capitalize)
export const pluralCamel = pipe(plural, uncapitalize)

export function camelCaseToKebabCase(transformString: string) {
  return transformString.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase()
}
