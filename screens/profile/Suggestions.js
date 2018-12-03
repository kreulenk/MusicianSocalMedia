import React, { Component } from 'react'
import { View, ListView, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import Suggestion from './Suggestion'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  suggestionContainer: {
    // justifyContent: 'space-between',
    // marginBottom: 5,
    // marginLeft: 12,
    // marginRight: 12,
    // marginTop: 10,
    // padding: 0,
    // borderWidth: 0,
  },
})

class Suggestions extends Component {
  static propTypes = {
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    suggestions: PropTypes.arrayOf(
      PropTypes.shape({
        user: PropTypes.shape({
          name: PropTypes.string.isRequired,
          username: PropTypes.string.isRequired,
          avatar: PropTypes.string.isRequired,
          bio: PropTypes.string.isRequired,
          interests: PropTypes.arrayOf(PropTypes.string).isRequired,
          skills: PropTypes.arrayOf(PropTypes.string).isRequired,
        }),
      })
    ).isRequired,
  }

  static defaultProps = {
    containerStyle: {},
  }

  state = {
    suggestionDS: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(this.props.suggestions),
  }

  render() {
    return (
      <View>
        <ListView
          scrollEnabled={false}
          removeClippedSubviews={false}
          contentContainerStyle={[styles.container, this.props.containerStyle]}
          dataSource={this.state.suggestionDS}
          renderRow={e => {
            return (
              <Suggestion
                containerStyle={styles.suggestionContainer}
                {...e}
                onSendMatchRequest={this.props.onSendMatchRequest}
              />
            )
          }}
        />
      </View>
    )
  }
}

export default Suggestions
