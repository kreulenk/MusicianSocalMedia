import uuid from 'uuid';

import getUserInfo from './utils/getUserInfo';
import shrinkImageAsync from './utils/shrinkImageAsync';
import uploadPhoto from './utils/uploadPhoto';

const firebase = require('firebase');
// Required for side-effects
require('firebase/firestore');

const collectionName = 'snack-SJucFknGX';

class Fire {
  constructor() {
    firebase.initializeApp({
      apiKey: "AIzaSyCLfKxr4dmaN2jeNaOQ3T3wxAOB5-4tkcA",
      authDomain: "chat-app-c6352.firebaseapp.com",
      databaseURL: "https://chat-app-c6352.firebaseio.com",
      projectId: "chat-app-c6352",
      storageBucket: "chat-app-c6352.appspot.com",
      messagingSenderId: "337661148506"
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

          const name = user.deviceName;
          const reduced = {
            key: doc.id,
            name: (name || 'Secret Duck').trim(),
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

  // Upload Data
  uploadPhotoAsync = async uri => {
    const path = `${collectionName}/${this.uid}/${uuid.v4()}.jpg`;
    return uploadPhoto(uri, path);
  };

  post = async ({ text, image: localUri }) => {
    try {
      if (localUri) {
        const { uri: reducedImage, width, height } = await shrinkImageAsync(
          localUri,
        );

        const remoteUri = await this.uploadPhotoAsync(reducedImage);
        this.collection.add({
          text,
          uid: this.uid,
          timestamp: this.timestamp,
          imageWidth: width,
          imageHeight: height,
          image: remoteUri,
          user: getUserInfo(),
        });
      }
      else
      {
        this.collection.add({
          text,
          uid: this.uid,
          timestamp: this.timestamp,
          user: getUserInfo(),
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
