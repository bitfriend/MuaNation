import React, { PureComponent } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';

import SceneHeader from '../../component/SceneHeader';
import ThemeButton from '../../component/theme/Button';
import { getCategories } from '../../controller/service/actions';

class AddService extends PureComponent {
  state = {
    selectedIndex: -1
  }

  componentDidMount() {
    this.props.getCategories();
  }

  onAdd = () => {}

  render = () => (
    <View style={{ flex: 1 }}>
      <SceneHeader title="Add service" />
      <ScrollView>
        <TouchableOpacity style={photoStyles.icon}>
          <Icon
            type="font-awesome"
            name="camera"
            size={EStyleSheet.value('32rem')}
            color={EStyleSheet.value('$label')}
          />
          <Text style={photoStyles.label}>Add photo(s)</Text>
        </TouchableOpacity>
        <TextInput
          multiline={true}
          placeholder="Type description"
          placeholderTextColor={EStyleSheet.value('$label')}
          style={styles.description}
        ></TextInput>
        <View style={styles.priceWrapper}>
          <TextInput
            placeholder="Price"
            placeholderTextColor={EStyleSheet.value('$label')}
            style={styles.price}
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
                  backgroundColor: EStyleSheet.value(index === this.state.selectedIndex ? '$grey0Color' : '$uncheckedButton'),
                  borderColor: EStyleSheet.value(index === this.state.selectedIndex ? '$grey0Color' : '$grey3Color')
                }}
                title={category}
                titleStyle={{
                  ...pickupStyles.title,
                  color: EStyleSheet.value(index === this.state.selectedIndex ? '$whiteColor' : '$uncheckedButtonTitle')
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
  )
}

const styles = EStyleSheet.create({
  description: {
    flex: 1,
    height: '104rem',
    marginTop: '24rem',
    marginHorizontal: '16rem',
    borderRadius: '12rem',
    padding: '16rem',
    backgroundColor: '$grey3Color',
    color: '$title',
    textAlignVertical: 'top'
  },
  priceWrapper: {
    marginTop: '24rem',
    marginHorizontal: '16rem',
    flexDirection: 'row',
    alignItems: 'center'
  },
  price: {
    width: '118rem',
    borderRadius: '12rem',
    padding: '16rem',
    backgroundColor: '$grey3Color',
    color: '$title'
  },
  symbol: {
    marginLeft: '16rem',
    fontFamily: 'Roboto',
    fontSize: '18rem',
    fontWeight: 'bold'
  },
  serviceType: {
    marginTop: '24rem',
    marginHorizontal: '16rem',
    fontFamily: 'Roboto',
    fontSize: '14rem',
    fontWeight: 'bold'
  },
  pickerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '12rem'
  }
});

const photoStyles = EStyleSheet.create({
  icon: {
    flex: 1,
    height: '200rem',
    marginTop: '20rem',
    marginHorizontal: '16rem',
    borderRadius: '12rem',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$grey3Color'
  },
  label: {
    color: '$label',
    fontFamily: 'Rototo',
    fontSize: '18rem',
    fontWeight: 'bold'
  }
});

const pickupStyles = EStyleSheet.create({
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

const buttonStyles = EStyleSheet.create({
  container: {
    padding: '16rem'
  },
  button: {
    width: '100%',
    height: '48rem',
    borderRadius: '12rem'
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: '16rem',
    fontWeight: 'bold'
  }
});

const mapStateToProps = ({
  service: { categories }
}) => ({
  categories
});

const mapDispatchToProps = (dispacth) => ({
  getCategories: () => dispacth(getCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(AddService);
