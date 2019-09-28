import React, { Component } from 'react';
import { Alert, Animated, Dimensions, Easing, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Slider from '@react-native-community/slider';
import StarRating from 'react-native-star-rating';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import MapView, { Marker } from 'react-native-maps';
import { Button, Input } from 'react-native-elements';
import { isEqual } from 'lodash/fp';
import { connect } from 'react-redux';

import SliderMarker from '../../components/SliderMarker';
import { setLoading, clearLoading } from '../../controllers/common/actions';
import { getLocation, getCriteria, selectCategory, deselectCategory, setPriceRange, setMinScore, setMaxDistance } from '../../controllers/discover/actions';

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
    const { width } = Dimensions.get('window');
    this.windowWidth = width;

    this.props.getLocation((error) => Alert.alert(error.message));
    this.props.getCriteria();

    // Start the map loading
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

  onMaxDistanceChanged = value => {
    if (value !== this.props.criteria.distance.max) {
      this.props.setMaxDistance(value);
    }
  }

  renderControlBar() {
    if (this.state.editingCriterion === 'category') {
      return (
        <ScrollView horizontal>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12 }}>
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
          <View style={{ marginHorizontal: 16 }}>
            <MultiSlider
              values={[this.state.criteria.price.min, this.state.criteria.price.max]}
              sliderLength={this.windowWidth - 16 * 2}
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
              allowOverlap
              snapped
              valuePrefix="$"
              trackStyle={{ backgroundColor: this.props.customTheme.palette.grey3 }}
              customMarker={SliderMarker}
              markerStyle={{ backgroundColor: this.props.customTheme.palette.primary }}
              selectedStyle={{ backgroundColor: this.props.customTheme.palette.primary }}
            />
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ ...styles.sliderEndian, color: this.props.customTheme.palette.grey3 }}>0</Text>
              <View style={{ flex: 1 }} />
              <Text style={{ ...styles.sliderEndian, color: this.props.customTheme.palette.grey3 }}>100</Text>
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
            containerStyle={{ width: 192 }}
            starSize={32}
            fullStarColor={this.props.customTheme.palette.warning}
            emptyStar="star"
            emptyStarColor={this.props.customTheme.label}
          />
        </View>
      );
    }
    if (this.state.editingCriterion === 'distance') {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={{ marginHorizontal: 16 }}>
            <Text style={{
              position: 'absolute',
              left: (this.windowWidth - 16 * 2) * this.state.criteria.distance.max / 10,
              top: -20,
              alignSelf: 'center'
            }}>{this.state.criteria.distance.max} miles</Text>
            <Slider
              value={this.state.criteria.distance.max}
              onValuesChange={(value) => this.setState({
                criteria: {
                  ...this.state.criteria,
                  distance: {
                    max: value
                  }
                }
              })}
              onSlidingComplete={this.onMaxDistanceChanged}
              minimumValue={0}
              maximumValue={10}
              step={1}
              valueSuffix="miles"
              maximumTrackTintColor={this.props.customTheme.palette.grey3}
              thumbTintColor={this.props.customTheme.palette.primary}
              minimumTrackTintColor={this.props.customTheme.palette.primary}
            />
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ ...styles.sliderEndian, color: this.props.customTheme.palette.grey3 }}>0</Text>
              <View style={{ flex: 1 }} />
              <Text style={{ ...styles.sliderEndian, color: this.props.customTheme.palette.grey3 }}>10</Text>
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
                style={{ width: 120, height: 120 }}
                anchor={{ x: 0.5, y: 0.5 }}
              >
                <View style={{ ...styles.outerCircle, backgroundColor: Color(this.props.customTheme.palette.primary).alpha(0.08).string() }} />
                <View style={{ ...styles.innerCircle, backgroundColor: Color(this.props.customTheme.palette.primary).alpha(0.12).string() }} />
                <Image source={require('../../../asset/images/map-marker-blue.png')} style={{
                  width: 24,
                  height: 28,
                  top: 32,
                  left: 48
                }} />
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
                <Image source={require('../../../asset/images/map-marker-pink.png')} style={{
                  width: 24,
                  height: 28
                }} />
              </Marker>
            ))}
          </MapView>
        </View>
        <Animated.View style={{
          width: '100%',
          height: 240,
          position: 'absolute',
          bottom: 0,
          transform: [{
            translateY: this.animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [64, 0]
            })
          }]
        }}>
          <View style={{ ...styles.panel, backgroundColor: this.props.customTheme.container }}>
            <TouchableOpacity style={styles.drawerWrapper} onPress={this.onDrawed}>
              <View style={{ ...styles.drawer, backgroundColor: this.props.customTheme.label }} />
            </TouchableOpacity>
            <Input
              containerStyle={searchStyles.container}
              leftIcon={{
                name: 'search',
                type: 'font-awesome',
                size: 20,
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
              <ScrollView horizontal>
                <View style={{ flexDirection: 'row', paddingHorizontal: 12 }}>
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
                        size: 14,
                        color: this.props.customTheme.checkedButtonTitle
                      }}
                      iconContainerStyle={{ marginLeft: 4, marginRight: 0 }}
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
                        borderColor: this.props.customTheme.uncheckedButton
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
                      size: 14,
                      color: this.state.editingCriterion === 'score' ? this.props.customTheme.toggledButtonTitle : this.props.customTheme.uncheckedButtonTitle
                    }}
                    iconContainerStyle={{ marginLeft: 0, marginRight: 4 }}
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
                      size: 14,
                      color: this.state.editingCriterion === 'distance' ? this.props.customTheme.toggledButtonTitle : this.props.customTheme.uncheckedButtonTitle
                    }}
                    iconContainerStyle={{ marginLeft: 0, marginRight: 4 }}
                    title={`${this.state.criteria.distance.max} miles`}
                    titleStyle={{ ...buttonStyle.title, color: this.state.editingCriterion === 'distance' ? this.props.customTheme.toggledButtonTitle : this.props.customTheme.uncheckedButtonTitle }}
                    onPress={() => this.onCriterionClicked('distance')}
                  />
                </View>
              </ScrollView>
            </View>
            {this.renderControlBar()}
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40
  },
  drawerWrapper: {
    width: '100%',
    padding: 16,
    alignItems: 'center'
  },
  drawer: {
    width: 32,
    height: 5,
    borderRadius: 2.5
  },
  sliderEndian: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 'bold'
  },
  outerCircle: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 120,
    height: 120,
    borderRadius: 60
  },
  innerCircle: {
    position: 'absolute',
    left: 32,
    top: 32,
    width: 56,
    height: 56,
    borderRadius: 28
  }
});

const searchStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 16
  },
  leftIconContainer: {
    marginRight: 8
  },
  inputContainer: {
    borderRadius: 12,
    borderBottomWidth: 0
  },
  input: {
    fontFamily: 'Roboto',
    fontSize: 18
  }
});

const buttonStyle = StyleSheet.create({
  container: {
    marginHorizontal: 4
  },
  button: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 8
  },
  title: {
    fontSize: 14
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
  getLocation: (onError) => dispacth(getLocation(onError)),
  getCriteria: () => dispacth(getCriteria()),
  selectCategory: (category) => dispacth(selectCategory(category)),
  deselectCategory: (category) => dispacth(deselectCategory(category)),
  setPriceRange: (min, max) => dispacth(setPriceRange(min, max)),
  setMinScore: (score) => dispacth(setMinScore(score)),
  setMaxDistance: (distance) => dispacth(setMaxDistance(distance))
});

export default connect(mapStateToProps, mapDispatchToProps)(Discover);
