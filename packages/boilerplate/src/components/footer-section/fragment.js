/**
 * Graphql fragment definition
 *
 * These fragments define the component fields. Gatsby resolves this file
 * by scanning the src folder, then adds the fragments to the main page query.
 *
 *
 * Component: footerSection
 */

import { graphql } from 'gatsby'

export const fragment = graphql`
fragment FooterSection on ContentfulFooterSection {
  backgroundColor
  footerNavigation {
    ... on Node {
      ...Navigation
    }
  }
  __typename
  title
}
`
