import React, { PureComponent } from 'react';
import { FlatList, Image, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import moment from 'moment';
import { connect } from 'react-redux';

import SceneHeader from '../../component/SceneHeader';
import { getChat } from '../../controller/chat/actions';

class Chat extends PureComponent {
  componentDidMount() {
    this.props.getChat(0);
  }

  getTimeText(time) {
    return moment(time).format('h:mm a');
  }

  renderItem = ({ item, index, separators }) => (
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
        <View style={[styles.message, item.fromMe ? meStyles.message : otherStyles.message]}>
          <Text style={[styles.msgText, item.fromMe ? meStyles.msgText : otherStyles.msgText]}>{item.text}</Text>
        </View>
        <Text style={styles.time}>{this.getTimeText(item.time)}</Text>
      </View>
    </View>
  )

  render = () => (
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
          placeholderTextColor={EStyleSheet.value('$placeholder')}
          style={styles.input}
        />
        <Button
          icon={{
            type: 'font-awesome',
            name: 'paper-plane',
            size: EStyleSheet.value('20rem'),
            color: EStyleSheet.value('$secondaryColor')
          }}
          buttonStyle={styles.send}
        />
      </View>
    </View>
  )
}

const styles = EStyleSheet.create({
  listItem: {
    marginLeft: '16rem',
    marginRight: '44rem'
  },
  separator: {
    height: '12rem'
  },
  message: {
    paddingHorizontal: '16rem',
    paddingVertical: '12rem',
    borderTopRightRadius: '24rem',
    borderBottomLeftRadius: '24rem'
  },
  msgText: {
    fontFamily: 'Roboto',
    fontSize: '18rem'
  },
  time: {
    color: '$label',
    fontFamily: 'Roboto',
    fontSize: '14rem'
  },
  inputWrapper: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: '16rem',
    paddingVertical: '14rem',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    borderRadius: '12rem',
    marginRight: '8rem',
    paddingLeft: '16rem',
    paddingRight: '8rem',
    paddingVertical: '16rem',
    backgroundColor: '$grey3Color',
    color: '$input',
    fontFamily: 'Roboto',
    fontSize: '18rem'
  },
  send: {
    backgroundColor: 'transparent',
    paddingHorizontal: '8rem',
    paddingVertical: '12rem'
  }
});

const meStyles = EStyleSheet.create({
  message: {
    marginLeft: '8rem',
    borderTopLeftRadius: '24rem',
    borderBottomRightRadius: '4rem',
    backgroundColor: '$secondaryColor'
  },
  msgText: {
    color: '$buttonTitle'
  }
});

const otherStyles = EStyleSheet.create({
  avatar: {
    width: '32rem',
    height: '32rem',
    borderRadius: '16rem'
  },
  message: {
    marginLeft: '16rem',
    marginRight: '8rem',
    borderTopLeftRadius: '4rem',
    borderBottomRightRadius: '24rem',
    backgroundColor: '$grey3Color'
  },
  msgText: {
    color: '$title'
  }
});

const mapStateToProps = ({
  chat: { chat }
}) => ({
  ...chat
});

const mapDispatchToProps = (dispacth) => ({
  getChat: (id) => dispacth(getChat(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
