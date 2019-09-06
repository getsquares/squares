// vue.config.js
module.exports = {
	// options...
	//publicPath: '/client/'
	devServer: {
		proxy: {
			'/api': {
				target: 'http://localhost/tools/squares2/server/get/value',
				//target: 'http://localhost/squares/server',
				changeOrigin: true
			}
		}
	}
};
