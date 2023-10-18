import typography from './typography.module.css';

type Styles = { [key: string]: string };
export function getClassNames<T extends Styles>(styles: T) {
  type BooleanMap = Partial<
    Record<keyof T, boolean> & { [key: string]: boolean }
  >;
  type ClassNames = keyof T | false | null | undefined | BooleanMap;
  type ExtraClassName = ClassNames | Omit<string, keyof T>;

  const styleUtils = {
    ...typography,
    ...styles,
  } as const;

  type MergedClassName = ExtraClassName | keyof typeof styleUtils;

  const fn = (...classNames: MergedClassName[]) => {
    return (classNames.filter((cn) => cn) as (keyof T)[])
      .map((className) => {
        if (typeof className === 'object') {
          const keys = Object.keys(className) as (keyof T)[];
          return keys
            .filter((key) => className[key])
            .map((key) => styleUtils[key])
            .join(' ');
        }
        return styleUtils[className] ?? className;
      })
      .join(' ');
  };

  return fn;
}
