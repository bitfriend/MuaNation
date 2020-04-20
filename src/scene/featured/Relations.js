import React, { PureComponent } from 'react';
import { Image, FlatList, Text, TouchableOpacity, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';

import SceneHeader from '../../component/SceneHeader';
import ThemeButton from '../../component/theme/Button';
import { getFollowers, getFollowing } from '../../controller/relation/actions';

class Relations extends PureComponent {
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

  renderItem = ({ item, index, separators }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <Text style={styles.name}>{item.fullName}</Text>
      <ThemeButton
        isPrimary={!item.followed}
        buttonStyle={styles.button}
        title={item.followed ? 'Unfollow' : 'Follow'}
        titleStyle={styles.buttonTitle}
      />
    </View>
  )

  render = () => (
    <View style={styles.container}>
      <SceneHeader title={this.props.navigation.getParam('fullName')} />
      <View style={styles.body}>
        {this.tabs.map((tab, index) => (
          <TouchableOpacity key={index} onPress={() => this.onTabChange(tab)} style={{ flex: 1 }}>
            <Text style={[styles.tab, tab === this.state.activeTab ? styles.activeTab : styles.inactiveTab]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.props.relations}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderItem}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$container'
  },
  body: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: '16rem'
  },
  tab: {
    width: '100%',
    textAlign: 'center',
    paddingVertical: '16rem',
    fontFamily: 'Roboto',
    fontSize: '18rem',
    textTransform: 'capitalize'
  },
  activeTab: {
    borderBottomWidth: '2rem',
    borderBottomColor: '$title',
    color: '$title',
    fontWeight: 'bold'
  },
  inactiveTab: {
    color: '$label'
  },
  avatar: {
    width: '48rem',
    height: '48rem',
    borderRadius: '24rem'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: '16rem'
  },
  separator: {
    height: '1rem',
    marginHorizontal: '16rem',
    backgroundColor: '$grey3Color'
  },
  name: {
    flex: 1,
    marginHorizontal: '16rem',
    color: '$title',
    fontFamily: 'Roboto',
    fontSize: '18rem',
    textTransform: 'capitalize'
  },
  button: {
    width: '88rem',
    height: '48rem',
    borderRadius: '12rem'
  },
  buttonTitle: {
    fontFamily: 'Roboto',
    fontSize: '14rem',
    fontWeight: 'bold'
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
