// listenForAuthStatus
// getData
auth.onAuthStateChanged(user => {
  if (user) {
    setupUI(user);
  } else {
    db.collection('tweaks').onSnapshot(snapshot => {
      setupTweakList(snapshot.docs);
    });
    setupUI();
  }
})

// New Tweak Form
const newTweakForm = document.querySelector('#newTweak-form');
newTweakForm.addEventListener('submit', (e) => {
  e.preventDefault();

  db.collection('tweaks').add({
    title: newTweakForm['title'].value,
    content: newTweakForm['content'].value,
    repo: newTweakForm['repo'].value,
    iosVersion: newTweakForm['iosVersion'].value,
    author: newTweakForm['author'].value,
  }).then(() => {
    //Close and reset
    const modal = document.querySelector('#modal-newTweak');
    M.Modal.getInstance(modal).close();
    newTweakForm.reset();
  }).catch(err => {

  })
})

// logoutUsers
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
});

// passwordlessSignin
// set actionCodeSettings
const passwordLessAuth = document.querySelector('#passwordLessAuthForm');

var actionCodeSettings = {
  // URL you want to redirect back to. The domain for this URL
  // must be whitelisted in the Firebase Console.
  'url': 'https://iishnoii.github.io/tweakst0re/', // Here we redirect back to this same page.
  'handleCodeInApp': true // This must be true.
};

// sendEmailVerification
document.querySelector('.semail').addEventListener('click', (e) => {

  const email = passwordLessAuth['PWLAemail'].value;

  auth.sendSignInLinkToEmail(email, actionCodeSettings).then(function() {
    window.localStorage.setItem('emailForSignin', email);
    alert('Check your email!');
  })
})

//Verify Email!
function handleSignIn() {
  if (auth.isSignInWithEmailLink('https://iishnoii.github.io/tweakst0re/')) {
    var email = window.localStorage.getItem('emailForSignin');
    if (!email) {
      email = window.prompt('Please verify your email address.');
    }
    if (email) {
      auth.signInWithEmailLink(email, 'https://iishnoii.github.io/tweakst0re/').then(cred => {
        if (history && history.replaceState) {
          window.history.replaceState({}, document.title, window.location.href.split('?')[0]);
        }
      })
    }
  }
}

window.onload(handleSignIn);
