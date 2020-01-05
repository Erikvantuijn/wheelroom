import { Fields as QbFields } from '@jacco-meijer/graphql-query-builder'
import { firstUpperCase, WheelroomField } from '@jacco-meijer/wheelroom'

interface TypeTable {
  [name: string]: QbFields
}

export const wheelroomToGraphql = (
  fieldName: string,
  field: WheelroomField
) => {
  const multipleComponentFields: QbFields = {}
  if (
    field.type === 'multipleComponents' &&
    typeof field.components === 'object'
  ) {
    field.components.forEach((component: string) => {
      multipleComponentFields[firstUpperCase(component)] = { fragment: true }
    })
  }

  const typeTable: TypeTable = {
    date: {},
    dropdown: {},
    image: {
      fields: {
        title: {},
        // tslint:disable-next-line: object-literal-sort-keys
        description: {},
        fluid: {
          arguments: { maxWidth: '1024' },
          fields: {
            sizes: {},
            src: {},
            srcSet: {},
          },
        },
      } as QbFields,
    },
    multipleComponents: {
      fields: {
        Node: {
          fields: multipleComponentFields,
          inlineFragment: true,
        },
      } as QbFields,
    },
    number: {},
    richText: {
      fields: {
        [fieldName]: {},
      } as QbFields,
    },
    shortText: {},
    singleComponent: {},
    tags: {},
  }
  return typeTable[field.type!]
}