import { fromBaseUrl } from '../url';
import {
  Selectors,
  E2EFunctions,
  CypressOptions,
  E2EFactoryArgs,
  E2EObjects,
} from './types';

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

export const processSelectors = <S extends Selectors>(
  e2eObjects: E2EFunctions<S>,
  selectors: S
): E2EFunctions<S> => {
  // const logOutput = (data: any) =>
  //   cy.logToConsole('Retrieving Selector:', data);
  const keys = Object.keys(selectors);
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];
    const value = selectors[key];

    if (key === 'url') {
      // @ts-ignore
      e2eObjects['visit'] = (args?: string, queryParams?: object) => {
        let parsedUrl = '';
        if (typeof value === 'string') {
          parsedUrl = fromBaseUrl(value);
        }

        if (typeof value === 'function' && args) {
          parsedUrl = fromBaseUrl(value(args));
        }

        // cy.logToConsole('Visiting', parsedUrl);
        if (queryParams) {
          return cy.visit({ url: parsedUrl, qs: queryParams });
        } else {
          return cy.visit(parsedUrl);
        }
      };

      continue;
    }

    if (typeof value === 'string') {
      // @ts-ignore
      e2eObjects[key] = (options?: CypressOptions) => {
        // logOutput(value);
        const selector = value.startsWith('data-testid')
          ? Selector.fromDataTestId(value)
          : Selector.fromAriaLabel(value);

        return cy.get(selector, options);
      };

      continue;
    }

    if (typeof value === 'function') {
      // @ts-ignore
      e2eObjects[key] = function (
        textOrOptions?: string | CypressOptions,
        options?: CypressOptions
      ) {
        // the input can only be ()
        if (arguments.length === 0) {
          const selector = value(undefined as unknown as string);

          // logOutput(selector);
          return cy.get(selector);
        }

        // the input can be (text) or (options)
        if (arguments.length === 1) {
          if (typeof textOrOptions === 'string') {
            const selectorText = value(textOrOptions);
            const selector = selectorText.startsWith('data-testid')
              ? Selector.fromDataTestId(selectorText)
              : Selector.fromAriaLabel(selectorText);

            // logOutput(selector);
            return cy.get(selector);
          }
          const selector = value(undefined as unknown as string);

          // logOutput(selector);
          return cy.get(selector, textOrOptions);
        }

        // the input can only be (text, options)
        if (arguments.length === 2 && typeof textOrOptions === 'string') {
          const text = textOrOptions;
          const selectorText = value(text);
          const selector = text.startsWith('data-testid')
            ? Selector.fromDataTestId(selectorText)
            : Selector.fromAriaLabel(selectorText);

          // logOutput(selector);
          return cy.get(selector, options);
        }
      };

      continue;
    }

    if (typeof value === 'object') {
      // @ts-ignore
      e2eObjects[key] = processSelectors({}, value);
    }
  }

  return e2eObjects;
};

export const getSelectors = <S extends Selectors>({
  selectors,
}: E2EFactoryArgs<S>): E2EObjects<S> => {
  const e2eObjects: E2EFunctions<S> = {} as E2EFunctions<S>;
  processSelectors(e2eObjects, selectors);

  return { ...e2eObjects };
};
