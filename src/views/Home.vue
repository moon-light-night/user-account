<template>
  <div>
    <div class="page-title">
      <h3>Profile</h3>
    </div>

    <div class="row">
      <div>
        <ul>
          <h4 id="name"></h4>
          <br />
          <h4 id="email"></h4>
          <br />
          <h4 id="tel"></h4>
          <br />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
export default {
  data() {
    return {
      snapshot: '',
      childSnapshot: '',
    }
  },
  mounted() {
    firebase
      .database()
      .ref('/')
      .once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          const childData = childSnapshot.val()
          const user = firebase.auth().currentUser.uid
          document.getElementById('name').innerHTML =
            'User name - ' + childData[user].info.name
          document.getElementById('email').innerHTML =
            'User email - ' + childData[user].info.email
          document.getElementById('tel').innerHTML =
            'User phone number - ' + childData[user].info.tel
        })
      })
  },
}
</script>

<style lang="scss" scoped></style>
