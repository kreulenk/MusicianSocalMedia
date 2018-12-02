import React from 'react'
import { Dimensions, Image, View, Text, StyleSheet, FlatList } from 'react-native'
import { Avatar } from 'react-native-elements'
import PropTypes from 'prop-types'

var interestCount = 0;
var skillCount = 0;

var toListString = function (header, items) {
  var listString = header;
  for (var item of items) {
    listString += item + ", ";
  }
  return listString.substring(0, listString.length - 2);
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 0,
    justifyContent: 'space-between',
    marginLeft: 12,
    marginRight: 12,
    backgroundColor: 'white',
    paddingTop: 20,
    borderBottomWidth: 12,
    borderColor: '#D3D3D3'
  },
  date: {
    color: 'gray',
    fontSize: 12.5,
  },
  suggestionRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 0,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 8,
    width: Dimensions.get('window').width * 1,
  },
  suggestionImage: {
    backgroundColor: 'rgba(0, 0, 0, 0.075)',
    height: 200,
  },
  userImage: {
    marginRight: 12,
  },
  bioRow: {
    padding: 18
  },
  bioText: {
    fontSize: 16,
    fontWeight: '400',
    marginTop: 10
  },
  wordText: {
    fontSize: 14,
    fontWeight: '500',
    margin: 5
  },
  wordTextLarge: {
    fontSize: 16,
    fontWeight: '600',
    margin: 5,
  },
  nameText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22,
    textAlign: 'center'
  },
  infoRow: {
    // flexDirection: 'row',
    // justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 14,
    paddingBottom: 20,
    backgroundColor: '#F1F1F1'
  },
  section: {
    width: Dimensions.get('window').width / 2,
  },
  sectionItemText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22,
    textAlign: 'center'
  }
})

const Suggestion = ({ containerStyle, user }) => (
  <View style={[styles.container, containerStyle]}>
    <View style={styles.suggestionRow}>
      <View style={styles.userImage}>
        <Avatar
          rounded
          size="medium"
          source={{
            uri: user.avatar,
          }}
        />
      </View>
      <View>
        <Text style={styles.nameText}>{user.name}</Text>
        <Text>@{user.username}</Text>
      </View>
    </View>
    <View style={styles.bioRow}>
      <Text style={styles.bioText}>{user.bio}</Text>
    </View>
    <View style={styles.infoRow}>
      <Text style={styles.wordTextLarge}>{user.matchesInCommon} matches in common</Text>
      <Text style={styles.wordText}>{toListString('Mutual Interests: ', user.interests)}</Text>
      <Text style={styles.wordText}>{toListString('Skills: ', user.skills)}</Text>
    </View>
    {/* <View style={styles.infoRow}>
      <View style={styles.section}>
        <Text style={styles.subtitleText}>Mutual Interests:</Text>
        {
          user.interests.map(interest => {
            interestCount++
            return <Text key={interestCount} style={styles.sectionItemText}>{interest}</Text>
          })
        }
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitleText}>Skills You Want:</Text>
        {
          user.skills.map(skill => {
            skillCount++
            return <Text key={skillCount} style={styles.sectionItemText}>{skill}</Text>
          })
        }
      </View>
    </View> */}
  </View>
)

Suggestion.propTypes = {
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    matchesInCommon: PropTypes.number.isRequired,
    interests: PropTypes.arrayOf(PropTypes.string).isRequired,
    skills: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
}

Suggestion.defaultProps = {
  containerStyle: {},
}

export default Suggestion
