'use strict'

const utils = require("./utils")

module.exports = function() {
	const files = utils.getFiles()
	console.log('files', files)
}