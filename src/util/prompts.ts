import prompts from 'prompts'
import * as TEXT from '../config/text'

import type { PromptObject } from 'prompts'

export async function answerPrompts(questions: PromptObject[]) {
  return await prompts(questions, {
    onCancel: () => {
      throw new Error(TEXT.CANCEL_OPERATION)
    }
  })
}
