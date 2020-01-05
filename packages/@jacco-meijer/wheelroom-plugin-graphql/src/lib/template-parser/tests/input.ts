import { TemplateParser } from '../template-parser'

const article: TemplateParser = {
  component: {
    fields: {
      articleText: {
        type: 'richText',
      },
      createdAt: {
        system: true,
        type: 'date',
      },
      image: {
        type: 'image',
      },
      title: {
        required: true,
        type: 'shortText',
      },
    },
    graphQL: {
      createPageQuery: 'subPage',
      limit: 20,
    },
    modelVersion: '1.0.0',
  },
  componentName: 'article',
  unparsed: '',
}

const articlesSection: TemplateParser = {
  component: {
    fields: {
      __typename: {
        system: true,
        type: 'shortText',
      },
      heading: {
        type: 'shortText',
      },
      maxArticles: {
        type: 'number',
      },
      // tslint:disable-next-line: object-literal-sort-keys
      articles: {
        components: ['Article'],
        type: 'multipleComponents',
      },
      variation: {
        type: 'dropdown',
      },
      title: {
        required: true,
        type: 'shortText',
      },
    },
    graphQL: {
      createPageQuery: 'global',
      limit: 15,
    },
    modelVersion: '1.0.0',
  },
  componentName: 'articlesSection',
  unparsed: '',
}

const featuredPageSection: TemplateParser = {
  component: {
    fields: {
      __typename: {
        system: true,
        type: 'shortText',
      },
      heading: {
        type: 'shortText',
      },
      text: {
        type: 'richText',
      },
      // tslint:disable-next-line: object-literal-sort-keys
      featuredPage: {
        component: 'page',
        type: 'singleComponent',
      },
      image: {
        type: 'image',
      },
      variation: {
        type: 'dropdown',
      },
      title: {
        required: true,
        type: 'shortText',
      },
    },
    graphQL: {
      createPageQuery: 'page',
    },
    modelVersion: '1.0.0',
  },
  componentName: 'featuredPageSection',
  unparsed: '',
}

const articleUnparsed = `
export const query = \`
%componentQuery(prefix:allContentful, indent:0)%
\``
export const articleQueryInput: TemplateParser = Object.assign({}, article, {
  unparsed: articleUnparsed,
})

const articlesSectionQueryUnparsed = `
export const query = \`
%componentQuery(prefix:allContentful, indent:0)%
\``
export const articlesSectionQueryInput: TemplateParser = Object.assign(
  {},
  articlesSection,
  {
    unparsed: articlesSectionQueryUnparsed,
  }
)

const featuredPageSectionQueryUnparsed = `
export const query = \`
%componentQuery(prefix:allContentful, indent:0)%
\``
export const featuredPageSectionQueryInput: TemplateParser = Object.assign(
  {},
  featuredPageSection,
  {
    unparsed: featuredPageSectionQueryUnparsed,
  }
)

const articleFragmentUnparsed = `
export const fragment = \`
%componentFragment(prefix:Contentful, indent:2)%
\``
export const articleFragmentInput: TemplateParser = Object.assign({}, article, {
  unparsed: articleFragmentUnparsed,
})

const articlesSectionFragmentUnparsed = `
export const fragment = \`
%componentFragment(prefix:Contentful, indent:2)%
\``
export const articlesSectionFragmentInput: TemplateParser = Object.assign(
  {},
  articlesSection,
  {
    unparsed: articlesSectionFragmentUnparsed,
  }
)

const featuredPageSectionFragmentUnparsed = `
export const fragment = \`
%componentFragment(prefix:Contentful, indent:2)%
\``
export const featuredPageSectionFragmentInput: TemplateParser = Object.assign(
  {},
  featuredPageSection,
  {
    unparsed: featuredPageSectionFragmentUnparsed,
  }
)