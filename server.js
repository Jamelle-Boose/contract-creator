#!/usr/bin/env node

import inquirer from "inquirer"
import chalk from "chalk"
import clipboard from "clipboardy"

const log = {
  welcome: () => console.log(chalk.blue("Welcome to the contract creator!")),
  exit: () => console.log(chalk.blue("Goodbye!")),
  error: message => console.error(chalk.red(message)),
}

const mainMenu = async () => {
  const question = [
    {
      type: "list",
      name: "mainMenu",
      message: "Please select an option:",
      choices: ["Create contract", "Exit"],
    },
  ]
  log.welcome()
  try {
    const answer = await inquirer.prompt(question)
    switch (answer.mainMenu) {
      case "Create contract":
        await createContract()
        break
      case "Exit":
        process.exitCode = 1
        log.exit()
        break
    }
  } catch (error) {
    log.error(error)
  }
}

const createContract = async () => {
  const question = [
    {
      type: "input",
      name: "equity",
      message: "Equity?",
    },
    {
      type: "number",
      name: "year",
      message: "Year?",
    },
    {
      type: "input",
      name: "month",
      message: "Month?",
    },
    {
      type: "input",
      name: "day",
      message: "Day?",
    },
    {
      type: "list",
      name: "direction",
      message: "Call or Put?",
      choices: ["C", "P"],
    },
    {
      type: "number",
      name: "startPosition",
      message: "Start position?",
    },
    {
      type: "number",
      name: "endPosition",
      message: "End position?",
    },
    {
      type: "number",
      name: "increment",
      message: "How should the contract increment?",
    },
  ]

  try {
    const answer = await inquirer.prompt(question)
    const {
      equity,
      year,
      month,
      day,
      direction,
      startPosition,
      endPosition,
      increment,
    } = answer
    const newEquity = `.${equity.toUpperCase()}${year}${month}${day}${direction}`
    const contracts = Array.from(
      { length: (endPosition - startPosition) / increment + 1 },
      (_, i) => `${newEquity}${startPosition + i * increment}`
    )
    await clipboard.write(`${contracts.join(" ")}`)
    console.log(
      `\n${chalk.yellow(`Copied to clipboard:`)}\n\n${chalk.gray(
        contracts.join("\n")
      )}\n`
    )
  } catch (error) {
    log.error(error)
  }
}

mainMenu()
