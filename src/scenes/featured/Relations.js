import React, { Component, Fragment } from 'react';
import { Image, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import SceneHeader from '../../components/SceneHeader';
import { getFollowers, getFollowing } from '../../controllers/relation/actions';
import styles from './styles';
import { getFullName } from '../../libs/util';

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

  render() {
    return (
      <View style={styles.container}>
        <SceneHeader title={this.props.navigation.getParam('fullName')} />
        <View style={{ flexDirection: 'row', width: '100%', paddingHorizontal: 16 }}>
          {this.tabs.map((tab, index) => (
            <TouchableOpacity key={index} onPress={() => this.onTabChange(tab)} style={{ flex: 1 }}>
              <Text style={[customStyles.tab, tab === this.state.activeTab ? customStyles.activeTab : customStyles.inactiveTab]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flex: 1, marginHorizontal: 16 }}>
          <FlatList
            data={this.props.relations}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index, separators }) => {
              const { avatar, followed } = item;
              return (
                <View style={customStyles.item}>
                  <Image source={{ uri: avatar }} style={customStyles.avatar} />
                  <Text style={customStyles.name}>{getFullName(item)}</Text>
                  <Button
                    buttonStyle={[customStyles.button, followed ? customStyles.inactiveButton : customStyles.activeButton]}
                    title={followed ? 'Unfollow' : 'Follow'}
                    titleStyle={[customStyles.title, followed ? customStyles.inactiveTitle : customStyles.activeTitle]}
                    TouchableComponent={TouchableOpacity}
                  />
                </View>
              );
            }}
          />
        </View>
      </View>
    );
  }
}

const customStyles = StyleSheet.create({
  tab: {
    width: '100%',
    textAlign: 'center',
    paddingVertical: 16,
    fontFamily: 'Roboto',
    fontSize: 18,
    textTransform: 'capitalize'
  },
  activeTab: {
    color: '#17050b',
    fontWeight: 'bold',
    borderBottomColor: '#17050b',
    borderBottomWidth: 2
  },
  inactiveTab: {
    color: '#97898e'
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomColor: '#dcd7d9',
    borderBottomWidth: 1
  },
  name: {
    flex: 1,
    color: '#17050b',
    fontFamily: 'Roboto',
    fontSize: 18,
    marginHorizontal: 16,
    textTransform: 'capitalize'
  },
  button: {
    width: 88,
    height: 48
  },
  activeButton: {
    backgroundColor: '#ef3475'
  },
  inactiveButton: {
    backgroundColor: 'rgba(239, 68, 146, 0.1)'
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 'bold'
  },
  activeTitle: {
    color: 'white'
  },
  inactiveTitle: {
    color: '#ef3475'
  }
});

const mapStateToProps = ({
  relation: { relations }
}) => ({
  relations
});

const mapDispatchToProps = (dispacth) => ({
  getFollowers: (userId) => dispacth(getFollowers(userId)),
  getFollowing: (userId) => dispacth(getFollowing(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Relations);
