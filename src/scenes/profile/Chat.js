import React, { Component } from 'react';
import { FlatList, Image, Text, TextInput, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { verticalScale, ScaledSheet } from 'react-native-size-matters';
import moment from 'moment';
import { connect } from 'react-redux';

import SceneHeader from '../../components/SceneHeader';
import { getChat } from '../../controllers/chat/actions';

class Chat extends Component {
  componentDidMount() {
    this.props.getChat(0);
  }

  getTimeText(time) {
    return moment(time).format('h:mm a');
  }

  renderItem = ({ item, index, separators }) => {
    return (
      <View style={{
        ...styles.listItem,
        flexDirection: item.fromMe ? 'row-reverse' : 'row'
      }}>
        {!item.fromMe && (
          <Image source={{ uri: this.props.avatar }} style={otherStyles.avatar} />
        )}
        <View style={{
          alignItems: 'center',
          flexDirection: item.fromMe ? 'row-reverse' : 'row'
        }}>
          <Text style={[{
            ...styles.message,
            backgroundColor: item.fromMe ? this.props.customTheme.palette.secondary : this.props.customTheme.palette.grey3,
            color: item.fromMe ? this.props.customTheme.buttonTitle : this.props.customTheme.title
          }, item.fromMe ? meStyles.message : otherStyles.message]}>{item.text}</Text>
          <Text style={{
            ...styles.time,
            color: this.props.customTheme.label
          }}>{this.getTimeText(item.time)}</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SceneHeader title="Jane Smith" />
        <FlatList
          data={this.props.messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderItem}
          ItemSeparatorComponent={() => (
            <View style={styles.separator} />
          )}
        />
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Type your message"
            placeholderTextColor={this.props.customTheme.placeholder}
            style={{
              ...styles.input,
              backgroundColor: this.props.customTheme.palette.grey3,
              color: this.props.customTheme.input
            }}
          />
          <Button
            icon={{
              type: 'font-awesome',
              name: 'paper-plane',
              size: verticalScale(20),
              color: this.props.customTheme.palette.secondary
            }}
            buttonStyle={styles.send}
          />
        </View>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  listItem: {
    marginLeft: '16@vs',
    marginRight: '44@vs'
  },
  separator: {
    height: '12@vs'
  },
  message: {
    paddingHorizontal: '16@vs',
    paddingVertical: '12@vs',
    borderTopRightRadius: '24@vs',
    borderBottomLeftRadius: '24@vs',
    fontFamily: 'Roboto',
    fontSize: '18@vs'
  },
  time: {
    fontFamily: 'Roboto',
    fontSize: '14@vs'
  },
  inputWrapper: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: '16@vs',
    paddingVertical: '14@vs',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    borderRadius: '12@vs',
    marginRight: '8@vs',
    paddingLeft: '16@vs',
    paddingRight: '8@vs',
    paddingVertical: '16@vs',
    fontFamily: 'Roboto',
    fontSize: '18@vs'
  },
  send: {
    backgroundColor: 'transparent',
    paddingHorizontal: '8@vs',
    paddingVertical: '12@vs'
  }
});

const meStyles = ScaledSheet.create({
  message: {
    marginLeft: '8@vs',
    borderTopLeftRadius: '24@vs',
    borderBottomRightRadius: '4@vs'
  }
});

const otherStyles = ScaledSheet.create({
  avatar: {
    width: '32@vs',
    height: '32@vs',
    borderRadius: '16@vs'
  },
  message: {
    marginLeft: '16@vs',
    marginRight: '8@vs',
    borderTopLeftRadius: '4@vs',
    borderBottomRightRadius: '24@vs'
  }
});

const mapStateToProps = ({
  common: { theme },
  chat: { chat }
}) => ({
  customTheme: theme,
  ...chat
});

const mapDispatchToProps = (dispacth) => ({
  getChat: (id) => dispacth(getChat(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
