import {
  applyVariationField,
  createEntry,
  getEntry,
  getFields,
  publishEntry,
  updateEntry,
} from '../../contentful-api/content'
import { getClient, getEnvironment, getSpace } from '../../contentful-api/init'
import { getCurrentModel } from '../../lib/get-current-model'
import { initializeContext } from '../../lib/initialize-context'
import { Context } from '../../types/context'
import { createAsset } from './create-asset'

const finish = async (context: Context) => {
  console.log(
    `Succesfully created content for: ${context.currentModel.model.type}`
  )
  return context
}

const handleError = (error: Error) => {
  console.log(error.message)
}

export const createContentForModel = async (context: Context) => {
  try {
    await getClient(context)
    await getSpace(context)
    await getEnvironment(context)

    getFields(context)
    applyVariationField(context)
    await getEntry(context)
    await updateEntry(context)
    await createEntry(context)
    await publishEntry(context)
    await finish(context)
  } catch (error) {
    handleError(error)
  }
}

export const handler = async (argv: any) => {
  const context = initializeContext(argv)
  await createAsset(context)

  for (const [componentName, component] of Object.entries(context.components)) {
    console.log(`Creating content for model ${componentName} =============`)
    const newContext = initializeContext(argv)
    newContext.currentModel = getCurrentModel(component)

    await createContentForModel(newContext)
  }
}