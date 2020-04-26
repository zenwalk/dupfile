const {Command, flags} = require('@oclif/command')
const path = require('path')
const fs = require('fs').promises
const walk = require('./walk')

class DupfileCommand extends Command {

  async run() {
    const {flags, args} = this.parse(DupfileCommand)
    const name = flags.name || 'world'
    const dir = args.dir
    // this.log(`hello ${name} from ./src/index.js`)
    const statObj = await fs.stat(dir)
    if (statObj.isDirectory()) {
      const files = await walk(dir, false)
      files.forEach(file => {
        console.log(file)
      })
    }
  }
}

DupfileCommand.description = `Describe the command here
...
Extra documentation goes here
`

DupfileCommand.args = [
  {name: 'dir', required: true},
]

DupfileCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({char: 'v'}),
  // add --help flag to show CLI version
  help: flags.help({char: 'h'}),
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = DupfileCommand
