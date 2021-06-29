/**
 * 딥링크를 통해서 들어온 경우
 */
const expectStructure = {
	url: '',
	host: '',
	scheme: '',
	path: '',
	params: {},
};

const DeepLinks = {
	listen: function ({ $router }) {
		console.log('############################ DeepLinks Initialize');

		console.log('############################ DeepLinks Initialize');
		document.addEventListener('deviceready', () => {
			// eslint-disable-next-line no-undef
			universalLinks.subscribe(null, (data) => {
				console.log('universalLinks null');
				const deepLinkData = Object.assign(expectStructure, data);

				console.log('deepLink callback start ===');
				console.log(JSON.stringify(deepLinkData, null, 2));

				if (deepLinkData.params['type']) {
					if (deepLinkData.type === 'camera') {
						$router.push({
							name: 'NativeCamera',
						});
					}
				}
			});
			// eslint-disable-next-line no-undef
			universalLinks.subscribe('deepLink_home', (data) => {
				console.log('universalLinks home');
				const deepLinkData = Object.assign(expectStructure, data);

				console.log('deepLink callback start ===');
				console.log(JSON.stringify(deepLinkData, null, 2));

				if (deepLinkData.params['type']) {
					if (deepLinkData.type === 'camera') {
						$router.push({
							name: 'NativeCamera',
						});
					}
				}
			});
			// eslint-disable-next-line no-undef
			universalLinks.subscribe('deepLink_camera', (data) => {
				console.log('universalLinks camera');
				const deepLinkData = Object.assign(expectStructure, data);

				console.log('deepLink callback start ===');
				console.log(JSON.stringify(deepLinkData, null, 2));

				if (deepLinkData.params['type']) {
					if (deepLinkData.type === 'camera') {
						$router.push({
							name: 'NativeCamera',
						});
					}
				}
			});
		});
	},
};

export { DeepLinks };
