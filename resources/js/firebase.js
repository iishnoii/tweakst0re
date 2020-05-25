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

// signupForm
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // getUserInput
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // signupUsers
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    const modal = document.querySelector('#modal-signup');

    M.Modal.getInstance(modal).close();
    signupForm.reset();
    });
  });

  // logoutUsers
  const logout = document.querySelector('#logout');
  logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
  });

  // loginUsers
  const loginForm = document.querySelector('#login-form');
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // getUserInput
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {

      //Close Login Modal
      const modal = document.querySelector('#modal-login');
      M.Modal.getInstance(modal).close();
      loginForm.reset();
    });
  })
