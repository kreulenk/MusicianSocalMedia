import React, { Component } from 'react'
import {
  Animated,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Icon } from 'react-native-elements'
import {
  TabViewAnimated,
  TabBar,
  TabViewPagerScroll,
  TabViewPagerPan,
} from 'react-native-tab-view'
import PropTypes from 'prop-types'

import Posts from './Posts'
import Suggestions from './Suggestions';

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginBottom: 10,
    marginTop: 45,
  },
  indicatorTab: {
    backgroundColor: 'transparent',
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  sceneContainer: {
    marginTop: 10,
  },
  socialIcon: {
    marginLeft: 14,
    marginRight: 14,
  },
  socialRow: {
    flexDirection: 'row',
  },
  tabBar: {
    backgroundColor: '#EEE',
    marginBottom: -10
  },
  tabContainer: {
    backgroundColor: 'white',
  },
  tabLabelNumber: {
    color: 'gray',
    fontSize: 12.5,
    textAlign: 'center',
  },
  tabLabelText: {
    color: 'black',
    fontSize: 22.5,
    fontWeight: '600',
    textAlign: 'center',
  },
  userBioRow: {
    marginLeft: 40,
    marginRight: 40,
  },
  userBioText: {
    color: 'gray',
    fontSize: 13.5,
    textAlign: 'center',
  },
  userImage: {
    borderRadius: 60,
    height: 120,
    marginBottom: 10,
    width: 120,
  },
  userNameRow: {
    marginBottom: 10,
  },
  userNameText: {
    color: '#5B5A5A',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userRow: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 12,
  },
})

class Profile2 extends Component {
  static propTypes = {
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    tabContainerStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
    ]),
    posts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        words: PropTypes.string.isRequired,
        sentence: PropTypes.string.isRequired,
        paragraph: PropTypes.string.isRequired,
        image: PropTypes.string,
        user: PropTypes.shape({
          name: PropTypes.string.isRequired,
          username: PropTypes.string.isRequired,
          avatar: PropTypes.string.isRequired,
          email: PropTypes.string.isRequired,
        }),
      })
    ).isRequired,
  }

  static defaultProps = {
    containerStyle: {},
    tabContainerStyle: {},
  }

  state = {
    tabs: {
      index: 0,
      routes: [
        { key: '1', title: 'suggestions', count: this.props.suggestions.length },
        { key: '2', title: 'matches', count: 31 },
        // { key: '3', title: 'following', count: 95 },
        // { key: '4', title: 'followers', count: '1.3 K' },
      ],
    },
  }

  onSendMatchRequest = () => {
    var numberOfSuggestions = this.state.tabs.routes[0].count;
    numberOfSuggestions--;
    this.setState({
      tabs: {
        index: 0,
        routes: [
          { key: '1', title: 'suggestions', count: numberOfSuggestions },
          { key: '2', title: 'matches', count: 31 },
          // { key: '3', title: 'following', count: 95 },
          // { key: '4', title: 'followers', count: '1.3 K' },
        ],
      }
    })
  }

  onPressPlace = () => {
    console.log('place')
  }

  _handleIndexChange = index => {
    this.setState({
      tabs: {
        ...this.state.tabs,
        index,
      },
    })
  }

  _renderHeader = props => {
    return (
      <TabBar
        {...props}
        indicatorStyle={styles.indicatorTab}
        renderLabel={this._renderLabel(props)}
        pressOpacity={0.8}
        style={styles.tabBar}
      />
    )
  }

  _renderScene = ({ route: { key } }) => {
    const { posts, suggestions } = this.props
    switch (key) {
      case '1':
        if (this.state.tabs.routes[0].count > 0) {
          return <Suggestions 
            containerStyle={styles.sceneContainer}
            suggestions={suggestions} 
            onSendMatchRequest={this.onSendMatchRequest}
          />
        } else {
          return <View style={[styles.userNameRow, {paddingTop: 100}]}>
            <Text style={styles.userNameText}>No suggestions at this time.</Text>
          </View>
        }
      case '2':
        return <Posts containerStyle={styles.sceneContainer} posts={posts} />
      default:
        return <View />
    }
  }

  _renderLabel = props => ({ route, index }) => {
    const inputRange = props.navigationState.routes.map((x, i) => i)
    const outputRange = inputRange.map(
      inputIndex => (inputIndex === index ? 'black' : 'gray')
    )
    const color = props.position.interpolate({
      inputRange,
      outputRange,
    })

    return (
      <View>
        <Animated.Text style={[styles.tabLabelText, { color }]}>
          {route.count}
        </Animated.Text>
        <Animated.Text style={[styles.tabLabelNumber, { color }]}>
          {route.title}
        </Animated.Text>
      </View>
    )
  }

  _renderPager = props => {
    return Platform.OS === 'ios' ? (
      <TabViewPagerScroll {...props} />
    ) : (
      <TabViewPagerPan {...props} />
    )
  }

  renderContactHeader = () => {
    const { avatar, name, bio } = this.props
    return (
      <View style={styles.headerContainer}>
        <View style={styles.userRow}>
          <Image
            style={styles.userImage}
            source={{
              uri: avatar,
            }}
          />
          <View style={styles.userNameRow}>
            <Text style={styles.userNameText}>{name}</Text>
          </View>
          <View style={styles.userBioRow}>
            <Text style={styles.userBioText}>{bio}</Text>
          </View>
        </View>
      </View>
    )
  }

  render() {
    return (
      <ScrollView style={styles.scroll}>
        <View style={[styles.container, this.props.containerStyle]}>
          <View style={styles.cardContainer}>
            {this.renderContactHeader()}
            <TabViewAnimated
              style={[styles.tabContainer]}
              navigationState={this.state.tabs}
              renderScene={this._renderScene}
              renderPager={this._renderPager}
              renderHeader={this._renderHeader}
              onIndexChange={this._handleIndexChange}
            />
          </View>
        </View>
      </ScrollView>
    )
  }
}

export default Profile2
