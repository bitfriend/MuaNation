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
import styles from './styles';

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
                buttonStyle={[buttonStyle.button, buttonStyle.uncheckedButton]}
                title={category}
                titleStyle={[buttonStyle.title, buttonStyle.uncheckedTitle]}
                onPress={() => this.props.selectCategory(category)}
              />
            ))}
          </View>
        </ScrollView>
      );
    }
    if (this.state.editingCriterion === 'price') {
      const { width: windowWidth } = Dimensions.get('window');
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={{ marginHorizontal: 16 }}>
            <MultiSlider
              values={[this.state.criteria.price.min, this.state.criteria.price.max]}
              sliderLength={windowWidth - 16 * 2}
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
              trackStyle={{ backgroundColor: '#f5f5f5' }}
              customMarker={SliderMarker}
              markerStyle={{ backgroundColor: '#4c39e8' }}
              selectedStyle={{ backgroundColor: '#4c39e8' }}
            />
            <View style={{ flexDirection: 'row' }}>
              <Text style={customStyles.sliderEndian}>0</Text>
              <View style={{ flex: 1 }} />
              <Text style={customStyles.sliderEndian}>100</Text>
            </View>
          </View>
        </View>
      );
    }
    if (this.state.editingCriterion === 'score') {
      const { width: windowWidth } = Dimensions.get('window');
      return (
        <View style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <StarRating
            maxStars={5}
            rating={this.state.criteria.score.min}
            selectedStar={this.onMinScoreChanged}
            containerStyle={{ width: 192 }}
            starSize={32}
            fullStarColor="#fabc3c"
            emptyStar="star"
            emptyStarColor="#dcd7d9"
          />
        </View>
      );
    }
    if (this.state.editingCriterion === 'distance') {
      const { width: windowWidth } = Dimensions.get('window');
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={{ marginHorizontal: 16 }}>
            <Text style={{
              position: 'absolute',
              left: (windowWidth - 16 * 2) * this.state.criteria.distance.max / 10,
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
              valuePrefix="$"
              maximumTrackTintColor="#f5f5f5"
              thumbTintColor="#4c39e8"
              minimumTrackTintColor="#4c39e8"
            />
            <View style={{ flexDirection: 'row' }}>
              <Text style={customStyles.sliderEndian}>0</Text>
              <View style={{ flex: 1 }} />
              <Text style={customStyles.sliderEndian}>10</Text>
            </View>
          </View>
        </View>
      );
    }
    return null;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={customStyles.container}>
          <MapView
            style={customStyles.map}
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
                <View style={customStyles.outerCircle} />
                <View style={customStyles.innerCircle} />
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
          <View style={customStyles.panel}>
            <TouchableOpacity style={customStyles.drawerWrapper} onPress={this.onDrawed}>
              <View style={customStyles.drawer} />
            </TouchableOpacity>
            <Input
              containerStyle={searchStyles.container}
              leftIcon={{
                name: 'search',
                type: 'font-awesome',
                size: 20,
                color: '#97898e'
              }}
              leftIconContainerStyle={searchStyles.leftIconContainer}
              placeholder="Search"
              placeholderTextColor="#97898e"
              inputContainerStyle={searchStyles.inputContainer}
              inputStyle={searchStyles.input}
            />
            <View>
              <ScrollView horizontal>
                <View style={{ flexDirection: 'row', paddingHorizontal: 12 }}>
                  {this.state.criteria.category.selected.map((category, index) => this.state.editingCriterion === 'category' ? (
                    <Button
                      key={index}
                      containerStyle={buttonStyle.container}
                      buttonStyle={[buttonStyle.button, buttonStyle.intermediateButton]}
                      title={category}
                      titleStyle={[buttonStyle.title, buttonStyle.checkedTitle]}
                      icon={{
                        name: 'x',
                        type: 'feather',
                        size: 14,
                        color: 'white'
                      }}
                      iconRight
                      onPress={() => this.props.deselectCategory(category)}
                    />
                  ) : (
                    <Button
                      key={index}
                      containerStyle={buttonStyle.container}
                      buttonStyle={[buttonStyle.button, buttonStyle.uncheckedButton]}
                      title={category}
                      titleStyle={[buttonStyle.title, buttonStyle.uncheckedTitle]}
                    />
                  ))}
                  <Button
                    containerStyle={buttonStyle.container}
                    buttonStyle={[buttonStyle.button, this.state.editingCriterion === 'category' ? buttonStyle.checkedButton : buttonStyle.uncheckedButton]}
                    title={this.state.editingCriterion === 'category' ? 'Done' : '+Add'}
                    titleStyle={[buttonStyle.title, this.state.editingCriterion === 'category' ? buttonStyle.checkedButton : buttonStyle.uncheckedTitle]}
                    onPress={() => this.onCriterionClicked('category')}
                  />
                  <Button
                    containerStyle={buttonStyle.container}
                    buttonStyle={[buttonStyle.button, this.state.editingCriterion === 'price' ? buttonStyle.checkedButton : buttonStyle.uncheckedButton]}
                    title={`$${this.state.criteria.price.min} - ${this.state.criteria.price.max}`}
                    titleStyle={[buttonStyle.title, this.state.editingCriterion === 'price' ? buttonStyle.checkedButton : buttonStyle.uncheckedTitle]}
                    onPress={() => this.onCriterionClicked('price')}
                  />
                  <Button
                    containerStyle={buttonStyle.container}
                    buttonStyle={[buttonStyle.button, this.state.editingCriterion === 'score' ? buttonStyle.checkedButton : buttonStyle.uncheckedButton]}
                    icon={{
                      name: 'star',
                      type: 'font-awesome',
                      size: 12,
                      color: this.state.editingCriterion === 'score' ? 'white' : '#513a42'
                    }}
                    title={`${this.state.criteria.score.min}+`}
                    titleStyle={[buttonStyle.title, this.state.editingCriterion === 'score' ? buttonStyle.checkedButton : buttonStyle.uncheckedTitle]}
                    onPress={() => this.onCriterionClicked('score')}
                  />
                  <Button
                    containerStyle={buttonStyle.container}
                    buttonStyle={[buttonStyle.button, this.state.editingCriterion === 'distance' ? buttonStyle.checkedButton : buttonStyle.uncheckedButton]}
                    icon={{
                      name: 'compass',
                      type: 'font-awesome',
                      size: 12,
                      color: this.state.editingCriterion === 'distance' ? 'white' : '#513a42'
                    }}
                    title={`${this.state.criteria.distance.max} miles`}
                    titleStyle={[buttonStyle.title, this.state.editingCriterion === 'distance' ? buttonStyle.checkedButton : buttonStyle.uncheckedTitle]}
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

const customStyles = StyleSheet.create({
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
    borderTopRightRadius: 40,
    backgroundColor: 'white'
  },
  drawerWrapper: {
    width: '100%',
    padding: 16,
    alignItems: 'center'
  },
  drawer: {
    backgroundColor: '#dcd7d9',
    width: 64,
    height: 5,
    borderRadius: 2.5
  },
  sliderEndian: {
    color: '#dcd7d9',
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
    borderRadius: 60,
    backgroundColor: '#4c39e8',
    opacity: 0.08
  },
  innerCircle: {
    position: 'absolute',
    left: 32,
    top: 32,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4c39e8',
    opacity: 0.12
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
    backgroundColor: '#f5f5f5',
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
    paddingHorizontal: 7,
    paddingVertical: 9
  },
  checkedButton: {
    backgroundColor: '#4c39e8',
    borderColor: '#4c39e8'
  },
  uncheckedButton: {
    backgroundColor: 'white',
    borderColor: '#f5f5f5'
  },
  intermediateButton: {
    backgroundColor: '#513a42',
    borderColor: '#513a42'
  },
  title: {
    fontSize: 14
  },
  checkedTitle: {
    color: 'white'
  },
  uncheckedTitle: {
    color: '#513a42'
  }
});

const mapStateToProps = ({
  discover: { location, neighbours, criteria }
}) => ({
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
