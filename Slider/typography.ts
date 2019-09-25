import { human, material, iOSUIKit } from 'react-native-typography';
import { Platform } from 'react-native';
export const TypographyTheam = {
	human,
	material,
	iOSUIKit,
	...Platform.select({
		ios: {
			extraLargeTitle: {
				...iOSUIKit.largeTitleEmphasizedObject,
				fontSize: 40
			},
			largeTitle: human.largeTitle,
			title1: human.title1,
			title2: human.title2,
			title3: human.title3,
			headline: human.headline,
			body: human.body,
			callout: human.callout,
			subhead: human.subhead,
			footnote: human.footnote,
			caption1: human.caption1,
			caption2: human.caption2,

			primaryColor: {
				color: '#2A3D5D'
			},

			largeTitleEmphasized: iOSUIKit.largeTitleEmphasized,
			title3Emphasized: iOSUIKit.title3Emphasized,
			bodyEmphasized: iOSUIKit.bodyEmphasized,
			subheadEmphasized: iOSUIKit.subheadEmphasized,
			footnoteEmphasized: iOSUIKit.footnoteEmphasized,
			caption2Emphasized: iOSUIKit.caption2Emphasized
		},
		android: {
			largeTitle: human.largeTitle,
			title1: human.title1,
			title2: human.title2,
			title3: human.title3,
			headline: human.headline,
			body: human.body,
			callout: human.callout,
			subhead: human.subhead,
			footnote: human.footnote,
			caption1: human.caption1,
			caption2: human.caption2
		}
	})
};
