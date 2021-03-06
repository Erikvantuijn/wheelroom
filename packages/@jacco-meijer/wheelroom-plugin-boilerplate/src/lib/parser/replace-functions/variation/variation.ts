/**
 * - %Variation name%
 * - %variation name%
 * - %variationName%
 * - %VariationName%
 * - %variation-name%
 *
 * Requires vars: currentVariation, singleVariationName
 *
 * TBW
 *
 */

import {
  getCases,
  ReplaceFunctionsList,
  ReplaceParams,
} from '@jacco-meijer/wheelroom'
import { ReplaceVarsExt } from '../../../../types/parser'

export const variationFunc: ReplaceFunctionsList = [
  {
    replace: (vars: ReplaceVarsExt, params: ReplaceParams) => {
      const varName =
        vars.currentVariation ||
        vars.singleVariationName ||
        'bug-variation-name'
      return getCases(varName).sentenceCase
    },
    search: 'Variation name',
  },
  {
    replace: (vars: ReplaceVarsExt, params: ReplaceParams) => {
      const varName =
        vars.currentVariation ||
        vars.singleVariationName ||
        'bug-variation-name'
      return getCases(varName).pascalCase
    },
    search: 'VariationName',
  },
  {
    replace: (vars: ReplaceVarsExt, params: ReplaceParams) => {
      const varName =
        vars.currentVariation ||
        vars.singleVariationName ||
        'bug-variation-name'
      return getCases(varName).lowerCase
    },
    search: 'variation name',
  },
  {
    replace: (vars: ReplaceVarsExt, params: ReplaceParams) => {
      const varName =
        vars.currentVariation ||
        vars.singleVariationName ||
        'bug-variation-name'
      return getCases(varName).kebabCase
    },
    search: 'variation-name',
  },
  {
    replace: (vars: ReplaceVarsExt, params: ReplaceParams) => {
      const varName =
        vars.currentVariation ||
        vars.singleVariationName ||
        'bug-variation-name'
      return getCases(varName).camelCase
    },
    search: 'variationName',
  },
]
