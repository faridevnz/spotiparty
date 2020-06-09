import firebase from 'firebase/app'
import 'firebase/firestore'

export const db = firebase.initializeApp({ projectId: 'spotiparty-4a110' }).firestore()

const { TimeStamp, GeoPoint } = firebase.firestore
export { TimeStamp, GeoPoint }
