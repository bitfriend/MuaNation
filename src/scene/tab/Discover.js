import React, { Component } from 'react';
import { Alert, Animated, Easing, Image, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import StarRating from 'react-native-star-rating';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import MapView, { Marker } from 'react-native-maps';
import { Button, Input } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import { isEqual } from 'lodash/fp';
import { connect } from 'react-redux';

import SliderMarker from '../../component/SliderMarker';
import { setLoading, clearLoading } from '../../controller/common/actions';
import { fetchNeighbours, getCriteria, selectCategory, deselectCategory, setPriceRange, setMinScore, setMaxDistance } from '../../controller/discover/actions';

const Color = require('color');

const sliderLength = EStyleSheet.value(`${375 - 16 * 2}rem`);

class Discover extends Component {
  state = {
    drawed: false,
    location: null,
    editingCriterion: '',
    criteria: {
      category: {
        selected: [],
        deselected: []
      },
      price: { min: 20, max: 80 },
      score: { min: 4 },
      distance: { max: 2 }
    }
  };

  animatedValue = new Animated.Value(0)

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      location => {
        this.setState({ location });
        this.props.fetchNeighbours(location.coords.latitude, location.coords.longitude, (error) => Alert.alert(error.message));
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 3000 }
    );
    this.props.getCriteria();

    // Start the map loading
    console.log('discover');
    if (Platform.OS === 'android') {
      this.props.setLoading(); // This halts on iOS. Don't know why.
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.criteria, nextProps.criteria)) {
      this.setState({ criteria: nextProps.criteria });
    }
  }

  onDrawed = () => Animated.timing(this.animatedValue, {
    toValue: this.state.drawed ? 0 : 1,
    duration: 300,
    easing: Easing.ease,
    useNativeDriver: true
  }).start(() => this.setState({
    drawed: !this.state.drawed,
    editingCriterion: this.state.drawed ? '' : 'category'
  }))

  onCriterionClicked(criterion) {
    if (this.state.editingCriterion === criterion) {
      Animated.timing(this.animatedValue, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true
      }).start(() => this.setState({
        drawed: false,
        editingCriterion: ''
      }));
    } else {
      if (!!this.state.editingCriterion) {
        this.setState({ editingCriterion: criterion });
      } else {
        Animated.timing(this.animatedValue, {
          toValue: this.state.drawed ? 0 : 1,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: true
        }).start(() => this.setState({
          drawed: !this.state.drawed,
          editingCriterion: criterion
        }));
      }
    }
  }

  onPriceRangeChanged = values => {
    if (values[0] !== this.props.criteria.price.min || values[1] !== this.props.criteria.price.max) {
      this.props.setPriceRange(values[0], values[1]);
    }
  }

  onMinScoreChanged = rating => {
    if (rating !== this.props.criteria.score.min) {
      this.props.setMinScore(rating);
    }
  }

  onMaxDistanceChanged = values => {
    if (values[0] !== this.props.criteria.distance.max) {
      this.props.setMaxDistance(values[0]);
    }
  }

  renderPickerBar() {
    if (this.state.editingCriterion === 'category') {
      return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.pickerBar}>
            {this.state.criteria.category.deselected.map((category, index) => (
              <Button
                key={index}
                containerStyle={buttonStyle.container}
                buttonStyle={{
                  ...buttonStyle.button,
                  backgroundColor: EStyleSheet.value('$uncheckedButton'),
                  borderColor: EStyleSheet.value('$grey3Color')
                }}
                title={category}
                titleStyle={{
                  ...buttonStyle.title,
                  color: EStyleSheet.value('$uncheckedButtonTitle')
                }}
                onPress={() => this.props.selectCategory(category)}
              />
            ))}
          </View>
        </ScrollView>
      );
    }
    if (this.state.editingCriterion === 'price') {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={styles.sliderWrapper}>
            <MultiSlider
              values={[this.state.criteria.price.min, this.state.criteria.price.max]}
              sliderLength={sliderLength}
              onValuesChange={(values) => this.setState({
                criteria: {
                  ...this.state.criteria,
                  price: {
                    min: values[0],
                    max: values[1]
                  }
                }
              })}
              onValuesChangeFinish={this.onPriceRangeChanged}
              min={0}
              max={100}
              step={1}
              snapped
              valuePrefix="$"
              trackStyle={sliderStyles.track}
              customMarker={SliderMarker}
              markerStyle={sliderStyles.marker}
              selectedStyle={sliderStyles.selected}
            />
            <View style={{ flexDirection: 'row', position: 'absolute', bottom: 0 }}>
              <Text style={styles.sliderScale}>0</Text>
              <View style={{ flex: 1 }} />
              <Text style={styles.sliderScale}>100</Text>
            </View>
          </View>
        </View>
      );
    }
    if (this.state.editingCriterion === 'score') {
      return (
        <View style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <StarRating
            maxStars={5}
            rating={this.state.criteria.score.min}
            selectedStar={this.onMinScoreChanged}
            containerStyle={styles.rating}
            starSize={EStyleSheet.value('32rem')}
            fullStarColor={EStyleSheet.value('$fullStar')}
            emptyStar="star"
            emptyStarColor={EStyleSheet.value('$emptyStar')}
          />
        </View>
      );
    }
    if (this.state.editingCriterion === 'distance') {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={styles.sliderWrapper}>
            <MultiSlider
              values={[this.state.criteria.distance.max]}
              sliderLength={sliderLength}
              onValuesChange={(values) => this.setState({
                criteria: {
                  ...this.state.criteria,
                  distance: {
                    max: values[0]
                  }
                }
              })}
              onValuesChangeFinish={this.onMaxDistanceChanged}
              min={0}
              max={10}
              step={1}
              snapped
              valueSuffix=" miles"
              trackStyle={sliderStyles.track}
              customMarker={SliderMarker}
              markerStyle={sliderStyles.marker}
              selectedStyle={sliderStyles.selected}
            />
            <View style={{ flexDirection: 'row', position: 'absolute', bottom: 0 }}>
              <Text style={styles.sliderScale}>0</Text>
              <View style={{ flex: 1 }} />
              <Text style={styles.sliderScale}>10</Text>
            </View>
          </View>
        </View>
      );
    }
    return null;
  }

  render = () => (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={this.state.location && {
            latitude: this.state.location.coords.latitude,
            longitude: this.state.location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          ref={(c) => this.mapView = c}
          onMapReady={() => {
            // End the map loading
            console.log('discover');
            if (Platform.OS === 'android') {
              this.props.clearLoading(); // This halts on iOS. Don't know why.
            }
          }}
          onRegionChange={region => {
            this.mapView.getCamera().then(camera => {
              console.log('compass angle', camera.heading);
            });
          }}
        >
          {this.state.location && (
            <Marker
              coordinate={{
                latitude: this.state.location.coords.latitude,
                longitude: this.state.location.coords.longitude
              }}
              style={styles.locationMarker}
              anchor={{ x: 0.5, y: 0.5 }}
            >
              <View style={{ ...styles.outerCircle, backgroundColor: Color(EStyleSheet.value('$primaryColor')).alpha(0.08).string() }} />
              <View style={{ ...styles.innerCircle, backgroundColor: Color(EStyleSheet.value('$primaryColor')).alpha(0.12).string() }} />
              <Image source={require('../../../asset/image/map-marker-blue.png')} style={styles.blueMarker} />
            </Marker>
          )}
          {this.props.neighbours.map((neighbour, index) => (
            <Marker key={index} coordinate={{
              latitude: neighbour.latitude,
              longitude: neighbour.longitude
            }}>
              <Image source={require('../../../asset/image/map-marker-pink.png')} style={styles.redMarker} />
            </Marker>
          ))}
        </MapView>
      </View>
      <Animated.View style={{
        width: '100%',
        height: EStyleSheet.value('240rem'),
        position: 'absolute',
        bottom: 0,
        transform: [{
          translateY: this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [EStyleSheet.value('64rem'), 0]
          })
        }]
      }}>
        <View style={{
          width: '100%',
          height: '100%',
          ...styles.panel
        }}>
          <TouchableOpacity style={styles.drawerWrapper} onPress={this.onDrawed}>
            <View style={styles.drawer} />
          </TouchableOpacity>
          <Input
            containerStyle={searchStyles.container}
            leftIcon={{
              name: 'search',
              type: 'font-awesome',
              size: EStyleSheet.value('20rem'),
              color: EStyleSheet.value('$input')
            }}
            leftIconContainerStyle={searchStyles.leftIconContainer}
            placeholder="Search"
            placeholderTextColor={EStyleSheet.value('$placeholder')}
            inputContainerStyle={searchStyles.inputContainer}
            inputStyle={searchStyles.input}
          />
          <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.controlBar}>
                {this.state.criteria.category.selected.map((category, index) => this.state.editingCriterion === 'category' ? (
                  <Button
                    key={index}
                    containerStyle={buttonStyle.container}
                    buttonStyle={{
                      ...buttonStyle.button,
                      backgroundColor: EStyleSheet.value('$checkedButton'),
                      borderColor: EStyleSheet.value('$checkedButton')
                    }}
                    title={category}
                    titleStyle={{
                      ...buttonStyle.title,
                      color: EStyleSheet.value('$checkedButtonTitle')
                    }}
                    icon={{
                      name: 'x',
                      type: 'feather',
                      size: EStyleSheet.value('14rem'),
                      color: EStyleSheet.value('$checkedButtonTitle')
                    }}
                    iconContainerStyle={buttonStyle.rightIconContainer}
                    iconRight
                    onPress={() => this.props.deselectCategory(category)}
                  />
                ) : (
                  <Button
                    key={index}
                    containerStyle={buttonStyle.container}
                    buttonStyle={{
                      ...buttonStyle.button,
                      backgroundColor: EStyleSheet.value('$uncheckedButton'),
                      borderColor: EStyleSheet.value('$grey3Color')
                    }}
                    title={category}
                    titleStyle={{
                      ...buttonStyle.title,
                      color: EStyleSheet.value('$uncheckedButtonTitle')
                    }}
                  />
                ))}
                <Button
                  containerStyle={buttonStyle.container}
                  buttonStyle={{
                    ...buttonStyle.button,
                    backgroundColor: EStyleSheet.value(this.state.editingCriterion === 'category' ? '$toggledButton' : '$uncheckedButton'),
                    borderColor: EStyleSheet.value(this.state.editingCriterion === 'category' ? '$toggledButton' : '$grey3Color')
                  }}
                  title={this.state.editingCriterion === 'category' ? 'Done' : '+Add'}
                  titleStyle={{
                    ...buttonStyle.title,
                    color: EStyleSheet.value(this.state.editingCriterion === 'category' ? '$toggledButtonTitle' : '$uncheckedButtonTitle')
                  }}
                  onPress={() => this.onCriterionClicked('category')}
                />
                <Button
                  containerStyle={buttonStyle.container}
                  buttonStyle={{
                    ...buttonStyle.button,
                    backgroundColor: EStyleSheet.value(this.state.editingCriterion === 'price' ? '$toggledButton' : '$uncheckedButton'),
                    borderColor: EStyleSheet.value(this.state.editingCriterion === 'price' ? '$toggledButton' : '$grey3Color')
                  }}
                  title={`$${this.state.criteria.price.min} - ${this.state.criteria.price.max}`}
                  titleStyle={{
                    ...buttonStyle.title,
                    color: EStyleSheet.value(this.state.editingCriterion === 'price' ? '$toggledButtonTitle' : '$uncheckedButtonTitle')
                  }}
                  onPress={() => this.onCriterionClicked('price')}
                />
                <Button
                  containerStyle={buttonStyle.container}
                  buttonStyle={{
                    ...buttonStyle.button,
                    backgroundColor: EStyleSheet.value(this.state.editingCriterion === 'score' ? '$toggledButton' : '$uncheckedButton'),
                    borderColor: EStyleSheet.value(this.state.editingCriterion === 'score' ? '$toggledButton' : '$grey3Color')
                  }}
                  icon={{
                    name: 'star',
                    type: 'font-awesome',
                    size: EStyleSheet.value('14rem'),
                    color: EStyleSheet.value(this.state.editingCriterion === 'score' ? '$toggledButtonTitle' : '$uncheckedButtonTitle')
                  }}
                  iconContainerStyle={buttonStyle.leftIconContainer}
                  title={`${this.state.criteria.score.min}+`}
                  titleStyle={{
                    ...buttonStyle.title,
                    color: EStyleSheet.value(this.state.editingCriterion === 'score' ? '$toggledButtonTitle' : '$uncheckedButtonTitle')
                  }}
                  onPress={() => this.onCriterionClicked('score')}
                />
                <Button
                  containerStyle={buttonStyle.container}
                  buttonStyle={{
                    ...buttonStyle.button,
                    backgroundColor: EStyleSheet.value(this.state.editingCriterion === 'distance' ? '$toggledButton' : '$uncheckedButton'),
                    borderColor: EStyleSheet.value(this.state.editingCriterion === 'distance' ? '$toggledButton' : '$grey3Color')
                  }}
                  icon={{
                    name: 'compass',
                    type: 'font-awesome',
                    size: EStyleSheet.value('14rem'),
                    color: EStyleSheet.value(this.state.editingCriterion === 'distance' ? '$toggledButtonTitle' : '$uncheckedButtonTitle')
                  }}
                  iconContainerStyle={buttonStyle.leftIconContainer}
                  title={`${this.state.criteria.distance.max} miles`}
                  titleStyle={{
                    ...buttonStyle.title,
                    color: EStyleSheet.value(this.state.editingCriterion === 'distance' ? '$toggledButtonTitle' : '$uncheckedButtonTitle')
                  }}
                  onPress={() => this.onCriterionClicked('distance')}
                />
              </View>
            </ScrollView>
          </View>
          {this.renderPickerBar()}
        </View>
      </Animated.View>
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '$container',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  panel: {
    borderTopLeftRadius: '40rem',
    borderTopRightRadius: '40rem',
    backgroundColor: '$container'
  },
  drawerWrapper: {
    width: '100%',
    padding: '16rem',
    alignItems: 'center'
  },
  drawer: {
    width: '32rem',
    height: '5rem',
    borderRadius: '2.5rem',
    backgroundColor: '$drawer'
  },
  locationMarker: {
    width: '120rem',
    height: '120rem'
  },
  outerCircle: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '120rem',
    height: '120rem',
    borderRadius: '60rem'
  },
  innerCircle: {
    position: 'absolute',
    left: '32rem',
    top: '32rem',
    width: '56rem',
    height: '56rem',
    borderRadius: '28rem'
  },
  blueMarker: {
    width: '24rem',
    height: '28rem',
    top: '32rem',
    left: '48rem'
  },
  redMarker: {
    width: '24rem',
    height: '28rem'
  },
  controlBar: {
    flexDirection: 'row',
    paddingHorizontal: '12rem'
  },
  pickerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '12rem'
  },
  sliderWrapper: {
    marginHorizontal: '16rem'
  },
  sliderScale: {
    color: '$grey2Color',
    fontFamily: 'Roboto',
    fontSize: '14rem',
    fontWeight: 'bold'
  },
  rating: {
    width: '192rem'
  }
});

const searchStyles = EStyleSheet.create({
  container: {
    paddingHorizontal: '16rem',
    marginBottom: '16rem'
  },
  leftIconContainer: {
    marginRight: '8rem'
  },
  inputContainer: {
    borderRadius: '12rem',
    borderBottomWidth: 0,
    backgroundColor: '$inputContainer'
  },
  input: {
    color: '$input',
    fontFamily: 'Roboto',
    fontSize: '18rem'
  }
});

const buttonStyle = EStyleSheet.create({
  container: {
    marginHorizontal: '4rem'
  },
  button: {
    borderRadius: '8rem',
    borderWidth: '2rem',
    padding: '8rem'
  },
  title: {
    fontSize: '14rem'
  },
  leftIconContainer: {
    marginLeft: 0,
    marginRight: '4rem'
  },
  rightIconContainer: {
    marginLeft: '4rem',
    marginRight: 0
  }
});

const sliderStyles = EStyleSheet.create({
  track: {
    backgroundColor: '$grey3Color'
  },
  marker: {
    backgroundColor: '$primaryColor'
  },
  selected: {
    backgroundColor: '$primaryColor'
  }
});

const mapStateToProps = ({
  discover: { neighbours, criteria }
}) => ({
  neighbours, criteria
});

const mapDispatchToProps = (dispacth) => ({
  setLoading: () => dispacth(setLoading()),
  clearLoading: () => dispacth(clearLoading()),
  fetchNeighbours: (latitude, longitude, onError) => dispacth(fetchNeighbours(latitude, longitude, onError)),
  getCriteria: () => dispacth(getCriteria()),
  selectCategory: (category) => dispacth(selectCategory(category)),
  deselectCategory: (category) => dispacth(deselectCategory(category)),
  setPriceRange: (min, max) => dispacth(setPriceRange(min, max)),
  setMinScore: (score) => dispacth(setMinScore(score)),
  setMaxDistance: (distance) => dispacth(setMaxDistance(distance))
});

export default connect(mapStateToProps, mapDispatchToProps)(Discover);
