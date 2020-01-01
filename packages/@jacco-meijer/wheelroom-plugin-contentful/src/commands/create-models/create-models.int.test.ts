import { commandArgv } from '../../fixtures/command-argv'
import { command } from './command'

/**
 * Creating all models takes longer than the default 5 seconds max
 */
jest.setTimeout(60000)

test('Command: create models', async () => {
  const spy = jest.spyOn(console, 'log')
  await command.handler(commandArgv as any)
  expect(spy).toHaveBeenCalledTimes(123)
  spy.mockRestore()
})
