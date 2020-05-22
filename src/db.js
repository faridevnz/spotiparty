import firebase from 'firebase/app'
import 'firebase/firestore'

export const db = firebase
   .initializeApp({ projectId: 'spotiparty-a24ed' })
   .firestore()

const { TimeStamp, GeoPoint } = firebase.firestore
export { TimeStamp, GeoPoint }
