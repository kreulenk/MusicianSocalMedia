import uuid from 'uuid';

import getUserInfo from './utils/getUserInfo';
import shrinkImageAsync from './utils/shrinkImageAsync';
import uploadPhoto from './utils/uploadPhoto';
import uploadAudio from './utils/uploadAudio'

const firebase = require('firebase');
// Required for side-effects
require('firebase/firestore');

const collectionName = 'soundmatch-c4d7e';

class Fire {
  constructor() {
    firebase.initializeApp({
      apiKey: "AIzaSyAmbWTFTBZFN0yXWU69MCk5m1vbG7gTc54",
      authDomain: "soundmatch-c4d7e.firebaseapp.com",
      databaseURL: "https://soundmatch-c4d7e.firebaseio.com",
      projectId: "soundmatch-c4d7e",
      storageBucket: "soundmatch-c4d7e.appspot.com",
      messagingSenderId: "249268608379"
    });
    // Some nonsense...
    firebase.firestore().settings({ timestampsInSnapshots: true });

    // Listen for auth
    firebase.auth().onAuthStateChanged(async user => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }
    });
  }

  // Download Data
  getPaged = async ({ size, start }) => {
    let ref = this.collection.orderBy('timestamp', 'desc').limit(size);
    try {
      if (start) {
        ref = ref.startAfter(start);
      }

      const querySnapshot = await ref.get();
      const data = [];
      querySnapshot.forEach(function(doc) {

          if (doc.exists) {
          const post = doc.data() || {};

          // Reduce the name
          const user = post.user || {};
          let name = post.name; //Place where username would be placed
          if (!name) {
            name = user.deviceName;
          }
          if (!name) {
            name = 'Metro Boomin'
          }
          const reduced = {
            key: doc.id,
            name: name.trim(),
            ...post,
          };
          data.push(reduced);
        }
      });

      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      return { data, cursor: lastVisible };
    } catch ({ message }) {
      alert(message);
    }
  };

  // Upload Photo
  uploadPhotoAsync = async uri => {
    const path = `${collectionName}/${this.uid}/${uuid.v4()}.jpg`;
    return uploadPhoto(uri, path);
  };

  // Upload Audio
  uploadAudioAsync = async uri => {
      const path = `${collectionName}/${this.uid}/${uuid.v4()}.cat`;
      return uploadAudio(uri, path);
  };

  post = async ({ name, text, image: imageUri, audio: audioURI }) => {
    try {
      if (imageUri) {
        const { uri: reducedImage, width, height } = await shrinkImageAsync(
          imageUri,
        );

        const remoteUri = await this.uploadPhotoAsync(reducedImage);
        this.collection.add({
          text,
          uid: this.uid,
          timestamp: this.timestamp,
          image: remoteUri,
          user: getUserInfo(),
          name: name,
        });
      } else if(audioURI) { // If the user is trying to play an audio sample
        const remoteUri = await this.uploadAudioAsync(audioURI);
        this.collection.add({
            text,
            uid: this.uid,
            timestamp: this.timestamp,
            audio: remoteUri,
            user: getUserInfo(),
            name: name,
        })
      }
      else
      {
        this.collection.add({
          text,
          uid: this.uid,
          timestamp: this.timestamp,
          user: getUserInfo(),
          name: name,
        });
      }
    } catch ({ message }) {
      alert(message);
    }
  };

  get ref() {
    return firebase.database().ref('messages');
  }

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  };

  on = callback =>
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  // send the message to the Backend
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      this.append(message);
    }
  };

  append = message => this.ref.push(message);

  // Helpers
  get collection() {
    return firebase.firestore().collection(collectionName);
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
  get timestamp() {
    return Date.now();
  }
}

Fire.shared = new Fire();
export default Fire;
