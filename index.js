#!/usr/bin/env node

import inquirer from "inquirer"
import chalk from "chalk"
import clipboard from "clipboardy"

const main = async () => {
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
      type: "number",
      name: "month",
      message: "Month?",
    },
    {
      type: "number",
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

  const answers = await inquirer.prompt(question)
  const {
    equity,
    year,
    month,
    day,
    direction,
    startPosition,
    endPosition,
    increment,
  } = answers
  const newEquity = `.${equity.toUpperCase()}${year}${month}${day}${direction}`
  const contracts = Array.from(
    { length: (endPosition - startPosition) / increment + 1 },
    (_, i) => `${newEquity}${startPosition + i * increment}`
  )
  await clipboard.write(`${contracts.join(" ")}`)
  //TODO style message to user that it has been copied to clipboard
  console.log(
    `\n${chalk.yellow(`Copied to clipboard:`)}\n\n${contracts.join(" ")}\n`
  )
}

main()
