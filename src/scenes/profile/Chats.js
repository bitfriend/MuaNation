import React, { Component } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { verticalScale, ScaledSheet } from 'react-native-size-matters';
import moment from 'moment';
import { connect } from 'react-redux';

import SceneHeader from '../../components/SceneHeader';
import { getChats } from '../../controllers/chat/actions';

class Chats extends Component {
  componentDidMount() {
    this.props.getChats(0);
  }

  getTimeText(time) {
    const t = moment(time);
    console.log(t.format('YYYY-MM-DD h:mm a'));
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

  renderItem = ({ item, index, separators }) => {
    return (
      <TouchableOpacity style={styles.listItem}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.body}>
          <View style={styles.title}>
            <Text style={styles.name}>{item.fullName}</Text>
            <Text style={styles.time}>{this.getTimeText(item.last.time)}</Text>
          </View>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>{item.last.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SceneHeader title="My messages" />
        <FlatList
          data={this.props.chats}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderItem}
          ItemSeparatorComponent={() => (
            <View style={{
              ...styles.separator,
              backgroundColor: this.props.customTheme.palette.grey3
            }} />
          )}
        />
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  listItem: {
    flexDirection: 'row',
    paddingHorizontal: '16@vs',
    paddingTop: '16@vs',
    paddingBottom: '12@vs'
  },
  separator: {
    height: '1@vs',
    marginHorizontal: '16@vs'
  },
  avatar: {
    width: '48@vs',
    height: '48@vs',
    borderRadius: '24@vs'
  },
  body: {
    flex: 1,
    marginLeft: '8@vs'
  },
  title: {
    flexDirection: 'row',
    flex: 1
  },
  name: {
    flex: 1,
    fontFamily: 'Roboto',
    fontSize: '14@vs',
    fontWeight: 'bold'
  },
  time: {
    fontFamily: 'Roboto',
    fontSize: '14@vs'
  },
  text: {
    flex: 1,
    marginTop: '8@vs',
    fontFamily: 'Roboto',
    fontSize: '14@vs'
  }
});

const mapStateToProps = ({
  common: { theme },
  chat: { chats }
}) => ({
  customTheme: theme,
  chats
});

const mapDispatchToProps = (dispacth) => ({
  getChats: (id) => dispacth(getChats(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Chats);
