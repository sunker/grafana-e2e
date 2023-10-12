export interface SelectorApi {
  fromAriaLabel: (selector: string) => string;
  fromDataTestId: (selector: string) => string;
  fromSelector: (selector: string) => string;
}

export const Selector: SelectorApi = {
  fromAriaLabel: (selector: string) => `[aria-label="${selector}"]`,
  fromDataTestId: (selector: string) => `[data-testid="${selector}"]`,
  fromSelector: (selector: string) => selector,
};

/**
 * A string selector
 *
 * @alpha
 */
export type StringSelector = string;
/**
 * A function selector with an argument
 *
 * @alpha
 */
export type FunctionSelector = (id: string) => string;
/**
 * A function selector without argument
 *
 * @alpha
 */
export type CssSelector = () => string;
/**
 * @alpha
 */
export interface Selectors {
  [key: string]:
    | StringSelector
    | FunctionSelector
    | CssSelector
    | UrlSelector
    | Selectors;
}
/**
 * @alpha
 */
export type E2ESelectors<S extends Selectors> = {
  [P in keyof S]: S[P];
};
/**
 * @alpha
 */
export interface UrlSelector extends Selectors {
  url: string | FunctionSelector;
}
