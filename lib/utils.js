'use strict'

const fs = require('fs')
const path = require('path')
const glob = require('glob')
const config = require('./config')

const utils = {
	// 匹配中文正则
	chnRegExp: /[\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d]/,

	/**
	 * 获取脚本执行的绝对路径
	 * @param {array} args
	 */
	p(...args) {
		return path.join(process.cwd(), ...args)
	},

	// 获取要替换的文件路径
	getFiles() {
		const type = utils.isFile(config.argvPath) ? [config.argvPath.split('.')[1]] : config.basename

		const fileArr = type.map(ext => {
			const filePath = config.argvPath
				? utils.isFolder(config.argvPath)
					? `${utils.p(config.argvPath)}/**/*.${ext}`
					: utils.p(config.argvPath)
				: `${utils.p(config.root)}/**/*.${ext}`
			const ignorePath = config.ignore.map(n => {
				return `${utils.p(config.root)}/${n}/**/*.${ext}`
			})
			return glob.sync(filePath, {
				ignore: ignorePath
			}).map(v => v.substring(process.cwd().length))
		})
		return fileArr.reduce((cur, next) => {
			return cur.concat(next)
		}, [])
	},

	/**
	 * 判断路径是否为文件
	 * @param {string} path
	 */
	isFile(fp) {
		return fs.statSync(fp).isFile()
	},
	/**
	 * 判断路径是否为文件夹
	 * @param {string} path
	 */
	isFolder(fp) {
		return fs.statSync(fp).isDirectory()
	}
}

module.exports = utils