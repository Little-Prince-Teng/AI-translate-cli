const { program } = require('commander')

const pkg = require('../package.json')
const build = require('../lib/build')

program
	.version(pkg.version)
	.usage('<command> [directory path | file path]')

program
	.command('build')
	.description('build sucessful')
	.action((env, options) => {
		build()
	})

program.parse(process.argv)