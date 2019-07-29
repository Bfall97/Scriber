// import * as React from 'react';
// import {
//         FirebaseAuthProvider,
//         FirebaseAuthConsumer,
//     } from '@react-firebase/auth';
// import * as firebase from 'firebase/app';
// import 'firebase/auth';
// import './firebaseConfig';
// import Button from "@material-ui/core/Button";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import Input from "@material-ui/core/Input";

// //UI-Material to make it look good

// //TODO: Add other sign up/ sign in providers
// //TODO: Add Errors / Change to Notifications (Material UI)
// //TODO: Fix error on first try bug

// function SignUp() {
//     const [open, setOpen] = React.useState(false);

//     function handleClickOpen() {
//         setOpen(true);
//     }
//     function handleClose() {
//         setOpen(false);

//     }

//     return (
//       <div>
//           <FirebaseAuthProvider firebase = {firebase}>
//               <div>
//                   <FirebaseAuthConsumer>
//                       {({ isSignedIn, firebase }) =>{
//                           if(isSignedIn === true){
//                               return(
//                             //return nothing because user is signed in
//                                 null

//                               )
//                           }else{
//                               return(
//                                 <div>
//                                 <Button onClick={handleClickOpen}>
//                                       Sign Up
//                                 </Button>
//                                 <Dialog
//                                     open={open}
//                                     onClose={handleClose}
//                                     aria-labelledby='form-dialog-title'
//                                 >
//                                  <DialogTitle id="form-dialog-title">Login</DialogTitle>
//                                     <DialogContent>
//                                         <DialogContentText>
//                                         Please Enter Your Email and Choose a Password
//                                         </DialogContentText>
//                                         <Input type="email" id="email" name="email">Email</Input>

//                                         <Input type="password" id="password" name="pass">Password</Input>

//                                     </DialogContent>
//                                 <DialogActions>
//                                      <Button onClick={handleClose} color="primary">
//                                             Cancel
//                                       </Button>
//                                  <Button  onClick={() => {
//                                     firebase
//                                       .app()
//                                       .auth()
//                                       .createUserWithEmailAndPassword(document.getElementById("email").value,
//                                         document.getElementById("password").value).catch(function(error){
//                                              // Handle Errors here.
//                                             var errorCode = error.code;
//                                             var errorMessage = error.message;
//                                             // [START_EXCLUDE]
//                                             if (errorCode == 'auth/weak-password') {
//                                                 alert('The password is too weak.');
//                                             } else {
//                                                 alert(errorMessage);
//                                             }
//                                             console.log(error);
//                                         }).then(function(){
//                                             if (firebase.auth().currentUser){
//                                                 firebase.auth().currentUser.sendEmailVerification().then(function(){
//                                                     alert('Verification Email Sent.')
//                                                 }).catch(function(error) {
//                                                     console.log(error);
//                                                     alert('An Error Occured');
//                                                 });
//                                             }
//                                         })

//                                   }}>
//                                     Sign Up
//                                 </Button>
//                                  </DialogActions>
//                                 </Dialog>
//                                 </div>

//                               );
//                           }
//                       }}
//                   </FirebaseAuthConsumer>
//               </div>
//           </FirebaseAuthProvider>
//       </div>
//     );
// }

// export default SignUp
