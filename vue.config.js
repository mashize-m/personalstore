module.exports = {
	configureWebpack: {
		resolve: {
			// 省略后缀名
			// extensions:[],
			alias: {
				assets: '@/assets',
				common: '@/common',
				components: '@/components',
				network: '@/network',
				views: '@/views',
			},
		},
	},
}
