import React, { PureComponent } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import moment from 'moment';
import { connect } from 'react-redux';

import SceneHeader from '../../component/SceneHeader';
import { getChats } from '../../controller/chat/actions';

class Chats extends PureComponent {
  componentDidMount() {
    this.props.getChats(0);
  }

  getTimeText(time) {
    const t = moment(time);
    const now = moment();

    let delta = now.diff(t, 'years');
    if (delta > 0) {
      return delta + 'y';
    }
    delta = now.diff(t, 'months');
    if (delta > 0) {
      return delta + 'm';
    }
    delta = now.diff(t, 'weeks');
    if (delta > 0) {
      return delta + 'w';
    }
    delta = now.diff(t, 'days');
    if (delta > 0) {
      return delta + 'd';
    }
    return t.format('h:mm a');
  }

  renderItem = ({ item, index, separators }) => (
    <TouchableOpacity style={styles.listItem} onPress={() => this.props.navigation.navigate('Chat')}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.body}>
        <View style={styles.title}>
          <Text style={styles.name}>{item.fullName}</Text>
          <Text style={styles.time}>{this.getTimeText(item.last.time)}</Text>
        </View>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>{item.last.text}</Text>
      </View>
    </TouchableOpacity>
  )

  render = () => (
    <View style={{ flex: 1 }}>
      <SceneHeader title="My messages" />
      <FlatList
        data={this.props.chats}
        keyExtractor={(item, index) => index.toString()}
        renderItem={this.renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  )
}

const styles = EStyleSheet.create({
  listItem: {
    flexDirection: 'row',
    paddingHorizontal: '16rem',
    paddingTop: '16rem',
    paddingBottom: '12rem'
  },
  separator: {
    height: '1rem',
    marginHorizontal: '16rem',
    backgroundColor: '$grey3Color'
  },
  avatar: {
    width: '48rem',
    height: '48rem',
    borderRadius: '24rem'
  },
  body: {
    flex: 1,
    marginLeft: '8rem'
  },
  title: {
    flexDirection: 'row',
    flex: 1
  },
  name: {
    flex: 1,
    fontFamily: 'Roboto',
    fontSize: '14rem',
    fontWeight: 'bold'
  },
  time: {
    fontFamily: 'Roboto',
    fontSize: '14rem'
  },
  text: {
    flex: 1,
    marginTop: '8rem',
    fontFamily: 'Roboto',
    fontSize: '14rem'
  }
});

const mapStateToProps = ({
  chat: { chats }
}) => ({
  chats
});

const mapDispatchToProps = (dispacth) => ({
  getChats: (id) => dispacth(getChats(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Chats);
