
/**
 * app.main
 */
const main = async (err) => {
  if (err) {
    // handle hmr errors
    console.error(err);
  }

  // application code
  mobileNavigation();
  mobileSubnavigation();
};

const mobileNavigation = function () {

  /* Mobile menu */

  var newNavWrap = document.createElement('div')
  newNavWrap.classList.add('m-navigation-mobile')
  insertAfter(newNavWrap, document.querySelector('.m-navigation'))

  var newNav = document.querySelector('.m-navigation .site-navigation').cloneNode(true)
  newNav.classList.add('site-navigation')
  document.querySelector('.m-navigation-mobile').prepend(newNav)

  var menuOpen = false

  document.querySelector('.hamburger').addEventListener('click', function () {

    if (menuOpen) { // Hide
      this.classList.remove('is-active')
      menuOpen = false
      document.querySelector('.m-navigation-mobile').classList.remove("is-visible")
      document.querySelector('.m-navigation-mobile').classList.add("is-hidden")
      document.querySelector('body').classList.remove("has-mobile-menu-open")
    } else { // Show
      this.classList.add('is-active')
      menuOpen = true
      document.querySelector('.m-navigation-mobile').style.visibility = 'visible'
      document.querySelector('.m-navigation-mobile').style.zIndex = 300
      document.querySelector(".m-navigation-mobile").classList.remove("is-hidden")
      document.querySelector(".m-navigation-mobile").classList.add("is-visible")
      document.querySelector('.m-navigation-mobile').style.opacity = 1
      document.querySelector('body').classList.add("has-mobile-menu-open")
    }

  }, false)

  // fix for mobile overlay not hiding on screen size increase beyond mobile
  var query = matchMedia('(min-width: 767.5px)');

  query.addEventListener('change', function () {
    if (menuOpen) {
      document.querySelector('.hamburger').classList.remove('is-active')
      menuOpen = false
      document.querySelector('.m-navigation-mobile').classList.remove("is-visible")
      document.querySelector('.m-navigation-mobile').classList.add("is-hidden")
      document.querySelector('body').classList.remove("has-mobile-menu-open")
    }
  })

}

const insertAfter = function (newNode, existingNode) {
  existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling)
}

const mobileSubnavigation = function () {
  let toggles = document.querySelectorAll('.m-subnavigation .toggle, .m-index-subnavigation .toggle')
  toggles.forEach(function (toggle) {
    toggle.addEventListener('click', function (event) {
      const div = event.target.closest('.m-subnavigation, .m-index-subnavigation')
      div.classList.toggle('is-open')
    })
  })
}

export default main;


