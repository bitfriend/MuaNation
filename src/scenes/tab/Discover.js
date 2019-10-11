import React, { Component } from 'react';
import { Alert, Animated, Dimensions, Easing, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import StarRating from 'react-native-star-rating';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import MapView, { Marker } from 'react-native-maps';
import { Button, Input } from 'react-native-elements';
import { verticalScale, ScaledSheet } from 'react-native-size-matters';
import { isEqual } from 'lodash/fp';
import { connect } from 'react-redux';

import SliderMarker from '../../components/SliderMarker';
import { setLoading, clearLoading } from '../../controllers/common/actions';
import { fetchNeighbours, getCriteria, selectCategory, deselectCategory, setPriceRange, setMinScore, setMaxDistance } from '../../controllers/discover/actions';

const Color = require('color');

class Discover extends Component {
  state = {
    drawed: false,
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

  animatedValue = new Animated.Value(0);

  componentDidMount() {
    this.windowWidth = Dimensions.get('window').width;
    this.sliderLength = this.windowWidth - verticalScale(16) * 2;

    navigator.geolocation.getCurrentPosition(
      location => {
        this.props.fetchNeighbours(location.coords.latitude, location.coords.longitude, (error) => Alert.alert(error.message));
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 3000 }
    );
    this.props.getCriteria();

    // Start the map loading
    console.log('discover');
    this.props.setLoading();
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.criteria, nextProps.criteria)) {
      this.setState({ criteria: nextProps.criteria });
    }
  }

  onDrawed = () => {
    Animated.timing(this.animatedValue, {
      toValue: this.state.drawed ? 0 : 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true
    }).start(() => {
      this.setState({
        drawed: !this.state.drawed,
        editingCriterion: this.state.drawed ? '' : 'category'
      });
    });
  }

  onCriterionClicked(criterion) {
    if (this.state.editingCriterion === criterion) {
      Animated.timing(this.animatedValue, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true
      }).start(() => {
        this.setState({
          drawed: false,
          editingCriterion: ''
        });
      });
    } else {
      if (!this.state.editingCriterion) {
        Animated.timing(this.animatedValue, {
          toValue: this.state.drawed ? 0 : 1,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: true
        }).start(() => {
          this.setState({
            drawed: !this.state.drawed,
            editingCriterion: criterion
          });
        });
      } else {
        this.setState({ editingCriterion: criterion });
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
                  backgroundColor: this.props.customTheme.uncheckedButton,
                  borderColor: this.props.customTheme.palette.grey3
                }}
                title={category}
                titleStyle={{
                  ...buttonStyle.title,
                  color: this.props.customTheme.uncheckedButtonTitle
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
              sliderLength={this.sliderLength}
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
              trackStyle={{ backgroundColor: this.props.customTheme.palette.grey3 }}
              customMarker={SliderMarker}
              markerStyle={{ backgroundColor: this.props.customTheme.palette.primary }}
              selectedStyle={{ backgroundColor: this.props.customTheme.palette.primary }}
            />
            <View style={{ flexDirection: 'row', position: 'absolute', bottom: 0 }}>
              <Text style={{ ...styles.sliderScale, color: this.props.customTheme.palette.grey2 }}>0</Text>
              <View style={{ flex: 1 }} />
              <Text style={{ ...styles.sliderScale, color: this.props.customTheme.palette.grey2 }}>100</Text>
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
            starSize={verticalScale(32)}
            fullStarColor={this.props.customTheme.fullStar}
            emptyStar="star"
            emptyStarColor={this.props.customTheme.emptyStar}
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
              sliderLength={this.sliderLength}
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
              trackStyle={{ backgroundColor: this.props.customTheme.palette.grey3 }}
              customMarker={SliderMarker}
              markerStyle={{ backgroundColor: this.props.customTheme.palette.primary }}
              selectedStyle={{ backgroundColor: this.props.customTheme.palette.primary }}
            />
            <View style={{ flexDirection: 'row', position: 'absolute', bottom: 0 }}>
              <Text style={{ ...styles.sliderScale, color: this.props.customTheme.palette.grey2 }}>0</Text>
              <View style={{ flex: 1 }} />
              <Text style={{ ...styles.sliderScale, color: this.props.customTheme.palette.grey2 }}>10</Text>
            </View>
          </View>
        </View>
      );
    }
    return null;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ ...styles.container, backgroundColor: this.props.customTheme.container }}>
          <MapView
            style={styles.map}
            initialRegion={this.props.location && {
              latitude: this.props.location.coords.latitude,
              longitude: this.props.location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            ref={(c) => this.mapView = c}
            onMapReady={() => {
              // End the map loading
              console.log('discover');
              this.props.clearLoading();
            }}
            onRegionChange={region => {
              this.mapView.getCamera().then(camera => {
                console.log('compass angle', camera.heading);
              });
            }}
          >
            {this.props.location && (
              <Marker
                coordinate={{
                  latitude: this.props.location.coords.latitude,
                  longitude: this.props.location.coords.longitude
                }}
                style={styles.locationMarker}
                anchor={{ x: 0.5, y: 0.5 }}
              >
                <View style={{ ...styles.outerCircle, backgroundColor: Color(this.props.customTheme.palette.primary).alpha(0.08).string() }} />
                <View style={{ ...styles.innerCircle, backgroundColor: Color(this.props.customTheme.palette.primary).alpha(0.12).string() }} />
                <Image source={require('../../../asset/images/map-marker-blue.png')} style={styles.blueMarker} />
              </Marker>
            )}
            {this.props.neighbours.map((neighbour, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: neighbour.latitude,
                  longitude: neighbour.longitude
                }}
              >
                <Image source={require('../../../asset/images/map-marker-pink.png')} style={styles.redMarker} />
              </Marker>
            ))}
          </MapView>
        </View>
        <Animated.View style={{
          width: '100%',
          height: verticalScale(240),
          position: 'absolute',
          bottom: 0,
          transform: [{
            translateY: this.animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [verticalScale(64), 0]
            })
          }]
        }}>
          <View style={{ ...styles.panel, backgroundColor: this.props.customTheme.container }}>
            <TouchableOpacity style={styles.drawerWrapper} onPress={this.onDrawed}>
              <View style={{ ...styles.drawer, backgroundColor: this.props.customTheme.drawer }} />
            </TouchableOpacity>
            <Input
              containerStyle={searchStyles.container}
              leftIcon={{
                name: 'search',
                type: 'font-awesome',
                size: verticalScale(20),
                color: this.props.customTheme.input
              }}
              leftIconContainerStyle={searchStyles.leftIconContainer}
              placeholder="Search"
              placeholderTextColor={this.props.customTheme.placeholder}
              inputContainerStyle={{ ...searchStyles.inputContainer, backgroundColor: this.props.customTheme.inputContainer }}
              inputStyle={{
                ...searchStyles.input,
                color: this.props.customTheme.input
              }}
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
                        backgroundColor: this.props.customTheme.checkedButton,
                        borderColor: this.props.customTheme.checkedButton
                      }}
                      title={category}
                      titleStyle={{
                        ...buttonStyle.title,
                        color: this.props.customTheme.checkedButtonTitle
                      }}
                      icon={{
                        name: 'x',
                        type: 'feather',
                        size: verticalScale(14),
                        color: this.props.customTheme.checkedButtonTitle
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
                        backgroundColor: this.props.customTheme.uncheckedButton,
                        borderColor: this.props.customTheme.palette.grey3
                      }}
                      title={category}
                      titleStyle={{
                        ...buttonStyle.title,
                        color: this.props.customTheme.uncheckedButtonTitle
                      }}
                    />
                  ))}
                  <Button
                    containerStyle={buttonStyle.container}
                    buttonStyle={[
                      buttonStyle.button,
                      this.state.editingCriterion === 'category' ? {
                        backgroundColor: this.props.customTheme.toggledButton,
                        borderColor: this.props.customTheme.toggledButton
                      } : {
                        backgroundColor: this.props.customTheme.uncheckedButton,
                        borderColor: this.props.customTheme.palette.grey3
                      }
                    ]}
                    title={this.state.editingCriterion === 'category' ? 'Done' : '+Add'}
                    titleStyle={{ ...buttonStyle.title, color: this.state.editingCriterion === 'category' ? this.props.customTheme.toggledButtonTitle : this.props.customTheme.uncheckedButtonTitle }}
                    onPress={() => this.onCriterionClicked('category')}
                  />
                  <Button
                    containerStyle={buttonStyle.container}
                    buttonStyle={[
                      buttonStyle.button,
                      this.state.editingCriterion === 'price' ? {
                        backgroundColor: this.props.customTheme.toggledButton,
                        borderColor: this.props.customTheme.toggledButton
                      } : {
                        backgroundColor: this.props.customTheme.uncheckedButton,
                        borderColor: this.props.customTheme.palette.grey3
                      }
                    ]}
                    title={`$${this.state.criteria.price.min} - ${this.state.criteria.price.max}`}
                    titleStyle={{ ...buttonStyle.title, color: this.state.editingCriterion === 'price' ? this.props.customTheme.toggledButtonTitle : this.props.customTheme.uncheckedButtonTitle }}
                    onPress={() => this.onCriterionClicked('price')}
                  />
                  <Button
                    containerStyle={buttonStyle.container}
                    buttonStyle={[
                      buttonStyle.button,
                      this.state.editingCriterion === 'score' ? {
                        backgroundColor: this.props.customTheme.toggledButton,
                        borderColor: this.props.customTheme.toggledButton
                      } : {
                        backgroundColor: this.props.customTheme.uncheckedButton,
                        borderColor: this.props.customTheme.palette.grey3
                      }
                    ]}
                    icon={{
                      name: 'star',
                      type: 'font-awesome',
                      size: verticalScale(14),
                      color: this.state.editingCriterion === 'score' ? this.props.customTheme.toggledButtonTitle : this.props.customTheme.uncheckedButtonTitle
                    }}
                    iconContainerStyle={buttonStyle.leftIconContainer}
                    title={`${this.state.criteria.score.min}+`}
                    titleStyle={{ ...buttonStyle.title, color: this.state.editingCriterion === 'score' ? this.props.customTheme.toggledButtonTitle : this.props.customTheme.uncheckedButtonTitle }}
                    onPress={() => this.onCriterionClicked('score')}
                  />
                  <Button
                    containerStyle={buttonStyle.container}
                    buttonStyle={[
                      buttonStyle.button,
                      this.state.editingCriterion === 'distance' ? {
                        backgroundColor: this.props.customTheme.toggledButton,
                        borderColor: this.props.customTheme.toggledButton
                      } : {
                        backgroundColor: this.props.customTheme.uncheckedButton,
                        borderColor: this.props.customTheme.palette.grey3
                      }
                    ]}
                    icon={{
                      name: 'compass',
                      type: 'font-awesome',
                      size: verticalScale(14),
                      color: this.state.editingCriterion === 'distance' ? this.props.customTheme.toggledButtonTitle : this.props.customTheme.uncheckedButtonTitle
                    }}
                    iconContainerStyle={buttonStyle.leftIconContainer}
                    title={`${this.state.criteria.distance.max} miles`}
                    titleStyle={{ ...buttonStyle.title, color: this.state.editingCriterion === 'distance' ? this.props.customTheme.toggledButtonTitle : this.props.customTheme.uncheckedButtonTitle }}
                    onPress={() => this.onCriterionClicked('distance')}
                  />
                </View>
              </ScrollView>
            </View>
            {this.renderPickerBar()}
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
    width: '100%',
    height: '100%',
    borderTopLeftRadius: '40@vs',
    borderTopRightRadius: '40@vs'
  },
  drawerWrapper: {
    width: '100%',
    padding: '16@vs',
    alignItems: 'center'
  },
  drawer: {
    width: '32@vs',
    height: '5@vs',
    borderRadius: '2.5@vs'
  },
  locationMarker: {
    width: '120@vs',
    height: '120@vs'
  },
  outerCircle: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '120@vs',
    height: '120@vs',
    borderRadius: '60@vs'
  },
  innerCircle: {
    position: 'absolute',
    left: '32@vs',
    top: '32@vs',
    width: '56@vs',
    height: '56@vs',
    borderRadius: '28@vs'
  },
  blueMarker: {
    width: '24@vs',
    height: '28@vs',
    top: '32@vs',
    left: '48@vs'
  },
  redMarker: {
    width: '24@vs',
    height: '28@vs'
  },
  controlBar: {
    flexDirection: 'row',
    paddingHorizontal: '12@vs'
  },
  pickerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '12@vs'
  },
  sliderWrapper: {
    marginHorizontal: '16@vs'
  },
  sliderScale: {
    fontFamily: 'Roboto',
    fontSize: '14@vs',
    fontWeight: 'bold'
  },
  rating: {
    width: '192@vs'
  }
});

const searchStyles = ScaledSheet.create({
  container: {
    paddingHorizontal: '16@vs',
    marginBottom: '16@vs'
  },
  leftIconContainer: {
    marginRight: '8@vs'
  },
  inputContainer: {
    borderRadius: '12@vs',
    borderBottomWidth: 0
  },
  input: {
    fontFamily: 'Roboto',
    fontSize: '18@vs'
  }
});

const buttonStyle = ScaledSheet.create({
  container: {
    marginHorizontal: '4@vs'
  },
  button: {
    borderRadius: '8@vs',
    borderWidth: '2@vs',
    padding: '8@vs'
  },
  title: {
    fontSize: '14@vs'
  },
  leftIconContainer: {
    marginLeft: 0,
    marginRight: '4@vs'
  },
  rightIconContainer: {
    marginLeft: '4@vs',
    marginRight: 0
  }
});

const mapStateToProps = ({
  common: { theme },
  discover: { location, neighbours, criteria }
}) => ({
  customTheme: theme,
  location, neighbours, criteria
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
