import { getComponentFields } from '../partials/get-component-fields'
import { Vars } from '../types/vars'

export const configReadme = (vars: Vars) => {
  const fields = getComponentFields(vars.answers.componentFields)
  const fieldsList = [...fields, 'variation']
    .sort()
    .map(
      (fieldName: string) => `- ${fieldName}
`
    )
    .join('')

  return `# ${vars.componentName.pascalCase}

Wheelroom type: ${vars.answers.wheelroomType}

## Component fields

${fieldsList}

`
}