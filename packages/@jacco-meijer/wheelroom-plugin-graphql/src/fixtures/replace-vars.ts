import { WheelroomComponents } from '@jacco-meijer/wheelroom'
import { ReplaceVars } from '@jacco-meijer/wheelroom'

const components: WheelroomComponents = {
  page: {
    fields: {
      image: {
        type: 'image',
      },
      pageHeading: {
        type: 'shortText',
      },
      pageText: {
        type: 'richText',
      },
      shouldSkipA: {
        allowedComponents: ['page'],
        type: 'multipleComponents',
      },
      shouldSkipB: {
        allowedComponents: ['page'],
        expandFragmentRef: true,
        type: 'singleComponent',
      },
    },
    modelVersion: '1.0.0',
    settings: {
      asQuery: 'page',
    },
  },
}

const article: ReplaceVars = {
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
    modelVersion: '1.0.0',
    settings: {
      asQuery: 'subPage',
      queryLimit: 20,
    },
  },
  componentName: 'article',
  components,
}

const articlesSection: ReplaceVars = {
  component: {
    fields: {
      __typename: {
        system: true,
        type: 'shortText',
      },
      // tslint:disable-next-line: object-literal-sort-keys
      articles: {
        allowedComponents: ['Article'],
        type: 'multipleComponents',
      },
      heading: {
        type: 'shortText',
      },
      maxArticles: {
        type: 'number',
      },
      title: {
        required: true,
        type: 'shortText',
      },
      variation: {
        items: ['Choose', 'From', 'These'],
        type: 'dropdown',
      },
    },
    modelVersion: '1.0.0',
    settings: {
      asQuery: 'global',
      queryLimit: 15,
    },
  },
  componentName: 'articlesSection',
  components,
}

const featuredPageSection: ReplaceVars = {
  component: {
    fields: {
      __typename: {
        system: true,
        type: 'shortText',
      },
      // tslint:disable-next-line: object-literal-sort-keys
      featuredPage: {
        allowedComponents: ['page'],
        expandFragmentRef: true,
        type: 'singleComponent',
      },
      heading: {
        type: 'shortText',
      },
      image: {
        type: 'image',
      },
      text: {
        type: 'richText',
      },
      title: {
        required: true,
        type: 'shortText',
      },
      variation: {
        items: ['Choose', 'From', 'These'],
        type: 'dropdown',
      },
    },
    modelVersion: '1.0.0',
    settings: {
      asQuery: 'page',
    },
  },
  componentName: 'featuredPageSection',
  components,
}

export const replaceVars = {
  article,
  articlesSection,
  components,
  featuredPageSection,
}
