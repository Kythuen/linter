#!/usr/bin/env node
import { program, Argument } from 'commander'
import init from './command/init'
import add from './command/add'
import remove from './command/remove'
import clear from './command/clear'
import { rootExists, pathExists, createFile } from './util'
import { SETTING_FILE, PROJECT_FILE } from './config/path'
import * as TEXT from './config/text'

async function prepare() {
  if (!rootExists('package.json')) {
    throw new Error(TEXT.ERROR_NOT_PROJECT)
  }
  if (!pathExists(SETTING_FILE)) {
    await createFile(SETTING_FILE, {}, true)
  }
  if (!pathExists(PROJECT_FILE)) {
    await createFile(PROJECT_FILE, {}, true)
  }
}

prepare()

program
  .name('code-linter')
  .description('Interactively generate code linter configuration for your code')
  .version('1.0.0')
  .option('-i, --init', 'Add code format and submission configuration')
  .option('-c, --clear', 'Add code format and submission configuration')
  .action(cmd => {
    if (cmd.init) {
      init()
    } else if (cmd.clear) {
      clear()
    }
  })

program
  .command('init')
  .description('Add all code linter features into your code')
  .action(init)

program
  .command('add')
  .addArgument(
    new Argument('<feature>', 'The feature you want to add').choices([
      'format',
      'commit'
    ])
  )
  .description('Add code linter feature into your code')
  .action(add)

program
  .command('remove')
  .addArgument(
    new Argument('<feature>', 'The feature you want to remove').choices([
      'format',
      'commit'
    ])
  )
  .description('remove code linter feature from your code')
  .action(remove)

program
  .command('clear')
  .description('remove all code linter features from your code')
  .action(clear)

program.parse()

if (process.argv.length === 2) program.help()
