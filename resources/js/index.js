//MaterializeCSS Initialization
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);
});

//setupProjects
const TweakList = document.querySelector('.tweaks');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const authorDetails = document.querySelector('.author-details');

const setupUI = (user) => {
  if (user) {
    // Set Author Details inside Form!
    const authorD = `
    <input type="text" id="author" class="author-details" placeholder="This Submission Created by:" value="${user.email}">
    `;
    authorDetails.innerHTML = authorD;

    // Show User Email
    const accountD = `
    <div>Email: ${user.email} </div>
    `;
    accountDetails.innerHTML = accountD;

    // toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    // toggle user elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
}

const setupTweakList = (data) => {
  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const tweak = doc.data();
      const li = `
        <li>
        <div class="card-panel">
              <div class="row center-align">
                  <h6 class="col s6"><span class="underline">Tweak</span> <br />${tweak.title}</h6>
                  <h6 class="col s6"><span class="underline">Description</span> <br />${tweak.content}</h6>
                  <h6 class="col s6"><span class="underline">Repo</span> <br />${tweak.repo}</h6>
                  <h6 class="col s6"><span class="underline">IOS Version</span> <br />${tweak.iosVersion}</h6>
                  <h6 class="col s12"><span class="underline">Author</span> <br />${tweak.author}</h6>
              </div>
          </div>
        </li>
      `;
      html += li
    });
    TweakList.innerHTML = html;
  } else {
    TweakList.innerHTML =' <h6 class="center-align">Either theres no content to display or you cant connect to firebase!</h6>'
  }

}
