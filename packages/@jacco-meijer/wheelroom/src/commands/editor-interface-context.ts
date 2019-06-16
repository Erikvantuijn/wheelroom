import { Field } from '../types/model'
import { ModelApiContext } from '../types/model-api-context'

export const getEditorInterface = async (context: ModelApiContext) => {
  // If we don't have a contentType there's nothing to do here
  if (context.contentType === null) {
    return
  }
  context.editorInterface = await context.environment.getEditorInterfaceForContentType(
    context.currentModel.type
  )
  console.log(`Fetched editor interface`)
}

const getModelFieldById = (
  context: ModelApiContext,
  fieldIdLookup: string
): any => {
  const result = Object.entries(context.currentModel.fields).find(
    ([fieldId, field]: any) => {
      return fieldId === fieldIdLookup
    }
  )
  return result || [fieldIdLookup, {}]
}

export const updateEditorInterface = async (context: ModelApiContext) => {
  // If we don't have a editorInterface there's nothing to do here
  if (context.editorInterface === null) {
    return
  }
  context.editorInterface.controls.forEach((control: any) => {
    const [modelFieldId, modelField]: [any, Field] = getModelFieldById(
      context,
      control.fieldId
    )
    if (!modelField.widgetId) {
      return
    }
    console.log(`Updating editor interface for field ${modelFieldId}`)
    control.widgetId = modelField.widgetId
    control.settings = modelField.settings
  })
  context.editorInterface = await context.editorInterface.update()
}