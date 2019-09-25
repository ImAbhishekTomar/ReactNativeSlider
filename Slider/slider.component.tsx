import React from 'react';
import {
	FlatList,
	ImageURISource,
	View,
	Dimensions,
	Image,
	Text,
	Animated,
	NativeSyntheticEvent,
	NativeScrollEvent,
	ImageBackground,
	StyleSheet,
	ViewToken
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Typography } from '../../core/themes/quibikTheam';
import { createAnimatableComponent } from 'react-native-animatable';

const { width } = Dimensions.get('window');

export interface IDataSource {
	id: number;
	image: ImageURISource; //NodeRequire//ImageSourcePropType
	title: string;
	description: string;
	background?: ImageURISource;
}

interface ComponentProps {
	dataSource: IDataSource[];
	onItemSlide?: (currentItem: IDataSource) => void;
}

interface State {
	dataSource: IDataSource[];
	visualItem: IDataSource;
}

export type Props = ComponentProps;

export class SliderComponent extends React.Component<Props, State> {
	public state: State = { dataSource: [], visualItem: null };
	scrollX: Animated.Value = new Animated.Value(0);
	view = createAnimatableComponent(View);
	handleViewRef = (ref: any) => (this.view = ref);
	handleFadeInAnimation = () => {
		this.view.zoomIn().then((endState) => console.log(endState.finished ? 'finished' : 'cancelled'));
	};

	constructor(props: Props) {
		super(props);
	}

	componentDidMount() {
		this.setState({ dataSource: this.props.dataSource });
	}

	// componentWillReceiveProps(nextProps: Readonly<ComponentProps>) {
	// 	if (this.state.dataSource !== this.props.dataSource) {
	// 		this.setState({ dataSource: this.props.dataSource });
	// 	}
	// }

	private RenderBlock = ({ dataSource }) => (
		<Animatable.View ref={this.handleViewRef} useNativeDriver={true} easing="ease-in">
			<View style={{ flex: 1 }}>
				<View
					style={{
						flex: 1,
						width: width,
						height: '50%',
						flexDirection: 'column',
						alignItems: 'center',
						padding: 10
					}}
				>
					<Image source={dataSource.image} resizeMode="contain" style={{ marginBottom: 30 }} />
					<Text
						style={[
							Typography.title1,
							{
								marginBottom: 10,
								paddingRight: 5,
								paddingLeft: 5,
								fontWeight: 'bold',
								color: '#2A3D5D'
							}
						]}
					>
						{dataSource.title}
					</Text>
					<Text
						style={[
							Typography.callout,
							{
								textAlign: 'center',
								color: '#2A3D5D'
							}
						]}
					>
						{dataSource.description}
					</Text>
				</View>
			</View>
		</Animatable.View>
	);

	private RenderSteps = ({ data, scrollX }): React.ReactElement => {
		const stepPosition = Animated.divide(scrollX, width);
		return (
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'baseline'
				}}
			>
				{data.map((item: IDataSource, index: number) => {
					const opacity = stepPosition.interpolate({
						inputRange: [ index - 1, index, index + 1 ],
						outputRange: [ 0.2, 1, 0.2 ],
						extrapolate: 'clamp'
					});
					return (
						<Animated.View
							key={`step-${index}`}
							Animated
							flex={false}
							style={[
								{
									width: 20,
									height: 5,
									borderRadius: 5,
									marginRight: 5,
									backgroundColor: '#EFCA00',
									opacity
								}
							]}
						/>
					);
				})}
			</View>
		);
	};

	renderIllustrations() {
		return (
			<View style={{ flex: 1, justifyContent: 'flex-start' }}>
				<View style={{ flex: 1 }}>
					<FlatList
						onViewableItemsChanged={this.handlerViewableItemsChanged}
						viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
						horizontal
						pagingEnabled
						scrollEnabled
						showsHorizontalScrollIndicator={false}
						scrollEventThrottle={16}
						snapToAlignment="center"
						data={this.state.dataSource}
						keyExtractor={(item) => `${item.id}`}
						//keyExtractor={(item, index) => `step-${index}`}
						renderItem={({ item }) => this.renderListItems(item)}
						onScroll={Animated.event([
							{
								nativeEvent: { contentOffset: { x: this.scrollX } }
							}
						])}
					/>
				</View>
				<View style={{ alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}>
					<this.RenderSteps scrollX={this.scrollX} data={this.state.dataSource} />
				</View>
			</View>
		);
	}

	private handlerViewableItemsChanged = (info: { viewableItems: ViewToken[]; changed: ViewToken[] }): void => {
		var itemId = info.changed[0].item.id;
		var currentItem = this.state.dataSource.find((item) => item.id == itemId);
		this.props.onItemSlide(currentItem);
		console.log('current itemsx%%%%%%%%', currentItem);
		//console.log('item$$$$$$$$$$$', item);
		console.log('viewableItems@@@@@@@@@', info.viewableItems);
		console.log('changed@@@@@@@@@', info.changed);
	};

	private renderListItems(item: IDataSource): React.ReactElement {
		return <this.RenderBlock dataSource={item} />;
	}

	public render(): React.ReactNode {
		return <View style={[ styles.container ]}>{this.renderIllustrations()}</View>;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center'
	}
});
