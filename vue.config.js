// vue.config.js
module.exports = {
	// options...
	//publicPath: '/client/'
	devServer: {
		proxy: {
			'/fields/markdown/load': {
				target: process.env.VUE_APP_ROOT_API + '/api/fields/markdown/load/index.php',
				changeOrigin: true
			},
			'/fields/markdown/browse': {
				target: process.env.VUE_APP_ROOT_API + '/api/fields/markdown/browse/index.php',
				changeOrigin: true
			},
			'/fields/markdown/get/image': {
				target: process.env.VUE_APP_ROOT_API + '/api/fields/markdown/get/image/index.php',
				changeOrigin: true
			},
			'/fields/markdown/get/css': {
				target: process.env.VUE_APP_ROOT_API + '/api/fields/markdown/get/css/index.php',
				changeOrigin: true
			},
			'/fields/markdown/save': {
				target: process.env.VUE_APP_ROOT_API + '/api/fields/markdown/save/index.php',
				changeOrigin: true
			},
			'/fields/markdown/add/revision': {
				target: process.env.VUE_APP_ROOT_API + '/api/fields/markdown/add/revision/index.php',
				changeOrigin: true
			},
			'/fields/markdown/get/options': {
				target: process.env.VUE_APP_ROOT_API + '/api/fields/markdown/get/options/index.php',
				changeOrigin: true
			},
			'/fields/markdown/get/rows': {
				target: process.env.VUE_APP_ROOT_API + '/api/fields/markdown/get/rows/index.php',
				changeOrigin: true
			}
		}
	}
};
