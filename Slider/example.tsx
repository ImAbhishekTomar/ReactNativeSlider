import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { SliderComponent, IDataSource } from './slider.component';

const DataSource: IDataSource[] = [
	{
		id: 1,
		image: require('./Image1.png'),
		title: 'Search',
		description: 'Easily find the experts...',
		background: require('./Image1.png')
	},
	{
		id: 2,
		image: require('./Image2.png'),
		title: 'Learn',
		description: 'You learn new things......',
		background: require('./Image2.png')
	},
	{
		id: 3,
		image: require('./Image1.png'),
		title: 'Follow',
		description: 'You follow the.........',
		background: require('./Image1.png')
	}
];

export interface Props {}

interface State {}

export class Card extends React.Component<Props, State> {
	render(): JSX.Element {
		return (
			<View style={{ flex: 1, alignItems: 'center' }}>
				<SliderComponent
					dataSource={DataSource}
					onItemSlide={(item) => {
						console.log(item);
					}}
				/>
			</View>
		);
	}
}
