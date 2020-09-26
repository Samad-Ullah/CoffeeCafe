const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.confirmNewAdmin = functions.https.onCall((data,context) =>{
     // add new user and add custom claims
     return admin.auth().getUserByEmail(data.email).then(user =>{
         return admin.auth().setCustomUserClaims(user.uid,{
             admin: true

         });
     }).then(()=>{
         return{
             message: ` Success ${data.email} has been made an admin`
         }
     }).catch(err =>{
         return err;
     });
});

