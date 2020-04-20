import React, { PureComponent } from 'react';
import { Image, FlatList, ScrollView, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';

import SceneHeader from '../../component/SceneHeader';
import { getReviews } from '../../controller/review/actions';

const criteria = [0, 1, 2, 3, 4];

class Reviews extends PureComponent {
  componentDidMount() {
    const id = this.props.navigation.getParam('id');
    this.props.getReviews(id);
  }

  renderScore = (score, size, spacing) => (
    <View style={{ flexDirection: 'row' }}>
      {criteria.map((criterion, index) => (
        <Icon
          key={index}
          type="font-awesome"
          name="star"
          size={EStyleSheet.value(size + 'rem')}
          color={EStyleSheet.value(score > criterion ? '$fullStar' : '$emptyStar')}
          containerStyle={{ marginHorizontal: EStyleSheet.value(spacing + 'rem') }}
        />
      ))}
    </View>
  )

  renderItem = ({ item, index, separators }) => (
    <View style={cardStyles.container}>
      <Image source={{ uri: item.avatar }} style={cardStyles.avatar} />
      <View style={cardStyles.body}>
        <View style={{ width: '100%', flexDirection: 'row' }}>
          <Text style={cardStyles.name}>{item.fullName}</Text>
          {this.renderScore(item.score, 16, 2)}
        </View>
        <Text style={cardStyles.overview}>{item.overview}</Text>
        <ScrollView horizontal>
          {item.products.map((product, index) => (
            <Image key={index} source={{ uri: product }} style={{
              ...cardStyles.product,
              marginRight: index < item.products.length - 1 ? EStyleSheet.value('8rem') : 0
            }} />
          ))}
        </ScrollView>
      </View>
    </View>
  )

  render = () => (
    <View style={styles.container}>
      <SceneHeader title={this.props.navigation.getParam('reviews') + ' reviews'} />
      <View style={styles.scoreWrapper}>
        {this.renderScore(this.props.navigation.getParam('score'), 32, 4)}
      </View>
      <FlatList
        data={this.props.reviews}
        keyExtractor={(item, index) => index.toString()}
        renderItem={this.renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$container'
  },
  scoreWrapper: {
    alignItems: 'center',
    marginTop: '28rem',
    marginBottom: '32rem'
  },
  score: {
    alignItems: 'center',
    marginTop: '28rem',
    marginBottom: '32rem'
  },
  list: {
    flex: 1,
    marginHorizontal: '16rem'
  },
  separator: {
    height: '1rem',
    marginHorizontal: '16rem',
    backgroundColor: '$grey3Color'
  }
});

const cardStyles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: '16rem'
  },
  avatar: {
    width: '48rem',
    height: '48rem',
    borderRadius: '24rem'
  },
  body: {
    flex: 1,
    paddingLeft: '16rem'
  },
  name: {
    flex: 1,
    color: '$title',
    fontFamily: 'Roboto',
    fontSize: '14rem',
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  overview: {
    width: '100%',
    marginVertical: '8rem',
    color: '$label',
    fontFamily: 'Roboto',
    fontSize: '14rem'
  },
  product: {
    width: '48rem',
    height: '48rem',
    borderRadius: '4rem'
  }
});

const mapStateToProps = ({
  common: { theme },
  review: { reviews }
}) => ({
  customTheme: theme,
  reviews
});

const mapDispatchToProps = (dispacth) => ({
  getReviews: (userId) => dispacth(getReviews(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
