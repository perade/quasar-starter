/**
 * 푸시 관련 초기화 및 액션 정의
 *
 * - FCM과 OneSignal을 이용하여 푸시샘플 구현 완료
 *
 */

const oneSignalKey = '39a54386-82b7-497a-82dc-a159d3ebb76d';

const oneSignalStructure = {
	action: {
		type: 0,
	},
	notification: {
		androidNotificationId: 0,
		displayType: 0,
		isAppInFocus: false, // foreground ?
		payload: {
			title: '', // 푸시내용 - 제목
			body: '', // 푸시내용 - 본문
			fromProjectNumber: '',
			lockScreenVisibility: 0,
			notificationId: '',
			priority: 0,
			rawPayload: 'JSON',
		},
	},
};

const Notification = {
	listen: function ({ $router }) {
		// 포그라운드상태 백그라운드상태 포함된 푸시 수신부
		const pushReceiveAction = (data) => {
			// 수신한 푸시데이터 가공
			const pushData = Object.assign(oneSignalStructure, data);
			console.log('pushData => ');
			console.log(JSON.stringify(pushData, null, 2));

			// 푸시데이터의 back, fore로 분기
			if (pushData.notification.isAppInFocus) {
				// 포그라운드시 페이지이동없음
				alert('at foreground');
			} else {
				// 백그라운드시 앱활성화하면서 특정 페이지 이동
				alert('at background');
				$router.push({
					name: 'NativeCamera',
				});
			}
		};

		console.log('######################### Notification Initialize');
		document.addEventListener('deviceready', () => {
			window.plugins.OneSignal.startInit(oneSignalKey)
				.handleNotificationOpened(pushReceiveAction)
				.iOSSettings({
					kOSSettingsKeyAutoPrompt: false,
					kOSSettingsKeyInAppLaunchURL: false,
				})
				.inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.Notification)
				.endInit();

			window.plugins.OneSignal.promptForPushNotificationsWithUserResponse(function (accepted) {
				console.log('User accepted notifications: ' + accepted);
			});
		});
	},
};

export { Notification };
