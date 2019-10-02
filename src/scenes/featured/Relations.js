import React, { Component, Fragment } from 'react';
import { Image, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { verticalScale, ScaledSheet } from 'react-native-size-matters';
import { connect } from 'react-redux';

import SceneHeader from '../../components/SceneHeader';
import ThemeButton from '../../components/theme/Button';
import { getFollowers, getFollowing } from '../../controllers/relation/actions';

const Color = require('color');

class Relations extends Component {
  constructor(props) {
    super(props);

    this.tabs = ['followers', 'following'];
    this.state = {
      activeTab: this.tabs[0]
    };
  }

  componentDidMount() {
    const id = this.props.navigation.getParam('id');
    const category = this.props.navigation.getParam('category');
    switch (this.state.activeTab) {
      case 'followers':
        this.props.getFollowers(id);
        break;
      case 'following':
        this.props.getFollowing(id);
        break;
    }
    this.setState({ activeTab: category });
  }

  onTabChange(activeTab) {
    const id = this.props.navigation.getParam('id');
    switch (activeTab) {
      case 'followers':
        this.props.getFollowers(id);
        break;
      case 'following':
        this.props.getFollowing(id);
        break;
    }
    this.setState({ activeTab });
  }

  renderItem = ({ item, index, separators }) => {
    return (
      <View style={styles.item}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <Text style={{
          ...styles.name,
          color: this.props.customTheme.title
        }}>{item.fullName}</Text>
        <ThemeButton
          isPrimary={!item.followed}
          buttonStyle={styles.button}
          title={item.followed ? 'Unfollow' : 'Follow'}
          titleStyle={styles.buttonTitle}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: this.props.customTheme.container }}>
        <SceneHeader title={this.props.navigation.getParam('fullName')} />
        <View style={styles.container}>
          {this.tabs.map((tab, index) => (
            <TouchableOpacity key={index} onPress={() => this.onTabChange(tab)} style={{ flex: 1 }}>
              <Text style={[styles.tab, tab === this.state.activeTab ? {
                color: this.props.customTheme.title,
                fontWeight: 'bold',
                borderBottomColor: this.props.customTheme.title,
                borderBottomWidth: verticalScale(2)
              } : {
                color: this.props.customTheme.label
              }]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.list}>
          <FlatList
            data={this.props.relations}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderItem}
            ItemSeparatorComponent={() => <View style={{ height: verticalScale(StyleSheet.hairlineWidth), backgroundColor: this.props.customTheme.palette.grey3 }} />}
          />
        </View>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: '16@vs'
  },
  tab: {
    width: '100%',
    textAlign: 'center',
    paddingVertical: '16@vs',
    fontFamily: 'Roboto',
    fontSize: '18@vs',
    textTransform: 'capitalize'
  },
  list: {
    flex: 1,
    marginHorizontal: '16@vs'
  },
  avatar: {
    width: '48@vs',
    height: '48@vs',
    borderRadius: '24@vs'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '16@vs'
  },
  name: {
    flex: 1,
    fontFamily: 'Roboto',
    fontSize: '18@vs',
    marginHorizontal: '16@vs',
    textTransform: 'capitalize'
  },
  button: {
    width: '88@vs',
    height: '48@vs',
    borderRadius: '12@vs'
  },
  buttonTitle: {
    fontFamily: 'Roboto',
    fontSize: '14@vs',
    fontWeight: 'bold'
  }
});

const mapStateToProps = ({
  common: { theme },
  relation: { relations }
}) => ({
  customTheme: theme,
  relations
});

const mapDispatchToProps = (dispacth) => ({
  getFollowers: (userId) => dispacth(getFollowers(userId)),
  getFollowing: (userId) => dispacth(getFollowing(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Relations);
