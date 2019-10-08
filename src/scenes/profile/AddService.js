import React, { Component } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { verticalScale, ScaledSheet } from 'react-native-size-matters';
import { connect } from 'react-redux';

import SceneHeader from '../../components/SceneHeader';
import ThemeButton from '../../components/theme/Button';
import { getCategories } from '../../controllers/service/actions';

class AddService extends Component {
  state = {
    selectedIndex: -1
  }

  componentDidMount() {
    this.props.getCategories();
  }

  onAdd = () => {}

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SceneHeader title="Add service" />
        <ScrollView>
          <TouchableOpacity style={{
            ...photoStyles.icon,
            backgroundColor: this.props.customTheme.palette.grey3
          }}>
            <Icon
              type="font-awesome"
              name="camera"
              size={verticalScale(32)}
              color={this.props.customTheme.label}
            />
            <Text style={{
              ...photoStyles.label,
              color: this.props.customTheme.label
            }}>Add photo(s)</Text>
          </TouchableOpacity>
          <TextInput
            placeholder="Type description"
            placeholderTextColor={this.props.customTheme.label}
            style={{
              ...styles.description,
              backgroundColor: this.props.customTheme.palette.grey3,
              color: this.props.customTheme.title
            }}
          ></TextInput>
          <View style={styles.priceWrapper}>
            <TextInput
              placeholder="Price"
              placeholderTextColor={this.props.customTheme.label}
              style={{
                ...styles.price,
                backgroundColor: this.props.customTheme.palette.grey3,
                color: this.props.customTheme.title
              }}
            ></TextInput>
            <Text style={styles.symbol}>$</Text>
          </View>
          <Text style={styles.serviceType}>SERVICE TYPE</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.pickerBar}>
              {this.props.categories.map((category, index) => (
                <Button
                  key={index}
                  containerStyle={pickupStyles.container}
                  buttonStyle={{
                    ...pickupStyles.button,
                    backgroundColor: index === this.state.selectedIndex ? this.props.customTheme.palette.grey0 : this.props.customTheme.uncheckedButton,
                    borderColor: index === this.state.selectedIndex ? this.props.customTheme.palette.grey0 : this.props.customTheme.palette.grey3
                  }}
                  title={category}
                  titleStyle={{
                    ...pickupStyles.title,
                    color: index === this.state.selectedIndex ? this.props.customTheme.palette.white : this.props.customTheme.uncheckedButtonTitle
                  }}
                  onPress={() => this.setState({ selectedIndex: index })}
                />
              ))}
            </View>
          </ScrollView>
          <View style={{ flex: 1 }} />
          <View style={buttonStyles.container}>
            <ThemeButton
              buttonStyle={buttonStyles.button}
              title="Add"
              titleStyle={buttonStyles.title}
              onPress={this.onAdd}
              isPrimary={false}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  description: {
    flex: 1,
    height: '104@vs',
    marginTop: '24@vs',
    marginHorizontal: '16@vs',
    borderRadius: '12@vs',
    padding: '16@vs',
    textAlignVertical: 'top'
  },
  priceWrapper: {
    marginTop: '24@vs',
    marginHorizontal: '16@vs',
    flexDirection: 'row',
    alignItems: 'center'
  },
  price: {
    width: '118@vs',
    borderRadius: '12@vs',
    padding: '16@vs'
  },
  symbol: {
    marginLeft: '16@vs',
    fontFamily: 'Roboto',
    fontSize: '18@vs',
    fontWeight: 'bold'
  },
  serviceType: {
    marginTop: '24@vs',
    marginHorizontal: '16@vs',
    fontFamily: 'Roboto',
    fontSize: '14@vs',
    fontWeight: 'bold'
  },
  pickerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '12@vs'
  }
});

const photoStyles = ScaledSheet.create({
  icon: {
    flex: 1,
    height: '200@vs',
    marginTop: '20@vs',
    marginHorizontal: '16@vs',
    borderRadius: '12@vs',
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    fontFamily: 'Rototo',
    fontSize: '18@vs',
    fontWeight: 'bold'
  }
});

const pickupStyles = ScaledSheet.create({
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

const buttonStyles = ScaledSheet.create({
  container: {
    padding: '16@vs'
  },
  button: {
    width: '100%',
    height: '48@vs',
    borderRadius: '12@vs'
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: '16@vs',
    fontWeight: 'bold'
  }
});

const mapStateToProps = ({
  common: { theme },
  service: { categories }
}) => ({
  customTheme: theme,
  categories
});

const mapDispatchToProps = (dispacth) => ({
  getCategories: () => dispacth(getCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(AddService);
