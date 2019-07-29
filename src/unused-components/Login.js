// import * as React from 'react';
// import {
//     FirebaseAuthProvider,
//     FirebaseAuthConsumer,
// } from '@react-firebase/auth';
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
// import { Google2 } from 'styled-icons/icomoon/Google2';




// //TODO: Add Errors
// //TODO: Fix Logout-Modal-Open Bug

// function Login2() {
//     const [open, setOpen] = React.useState(false);
//     const provider = new firebase.auth.GoogleAuthProvider();


//     function handleClickOpen() {
//         setOpen(true);
//     }
//     function handleClose() {
//         setOpen(false);
//     }


//     //Google API Sign in     //TODO: Facebook and Github essentially work the same,
//                                     // atleast add these Providers at some point
//     function googleSignIn(){
//         firebase.auth().signInWithPopup(provider).then(function(result){
//             let token = result.credential.accesToken;
//             let user = result.user;            
//         }).catch(function(error){
//             let errorCode = error.code;
//             let errorMessage = error.message;
//             let email = error.email
//             let credential = error.credential
//             console.log(credential);
//             console.log(email);
//             console.log(errorMessage);
//             console.log(errorCode);
            
//         })

//     }

//     return (
//         <div>
//             <FirebaseAuthProvider firebase={firebase}>
//                 <div>
//                     <FirebaseAuthConsumer>
//                         {({ isSignedIn, firebase }) => {
//                             if (isSignedIn === true) {
//                                 return (
//                                     <Button onClick={() => {
//                                         firebase
//                                             .app()
//                                             .auth()
//                                             .signOut();
//                                     }}>
//                                         Logout
//                                   </Button>
//                                 )
//                             } else {
//                                 return (
//                                     <div>
//                                         <Button onClick={handleClickOpen}>
//                                             Login
//                                 </Button>
//                                         <Dialog
//                                             open={open}
//                                             onClose={handleClose}
//                                             aria-labelledby='form-dialog-title'
//                                         >
//                                             <DialogTitle id="form-dialog-title">Login</DialogTitle>
//                                             <DialogContent>
//                                                 <DialogContentText>
//                                                     Please Enter Your Email and Password
                                                    
//                                                    <div id='provider-container'>
//                                                     <Google2 size = '25'  className='google-signin' onClick = {googleSignIn} />
//                                                     </div>  
//                                         </DialogContentText>
//                                                 <Input type="email" id="email" name="email">Email</Input>

//                                                 <Input type="password" id="password" name="pass">Password</Input>

//                                             </DialogContent>
//                                             <DialogActions>
//                                                 <Button onClick={handleClose} color="primary">
//                                                     Cancel
//                                       </Button>
//                                                 <Button onClick={() => {
//                                                     firebase
//                                                         .app()
//                                                         .auth()
//                                                         .signInWithEmailAndPassword(document.getElementById('email').value,
//                                                             document.getElementById('password').value);


//                                                 }}>
//                                                     Login
//                                 </Button>
//                                             </DialogActions>
//                                         </Dialog>
//                                     </div>

//                                 );
//                             }
//                         }}
//                     </FirebaseAuthConsumer>
//                 </div>
//             </FirebaseAuthProvider>
//         </div>
//     );
// }


// export default Login2
