<template>
    <div class="m-site-wrapper">
        <div class="m-site-header">
            <div class="m-logo">
                <a href="https://archaeologydataservice.ac.uk/">
                    <img src="@/theme/images/HSDS_blue_and_black.svg" alt="Archaeology Data Service" />
                    <span>Archaeology Data Service</span>
                </a>
            </div>

            <div class="m-hamburger">
                <button class="hamburger" type="button">
                    <span class="hamburger-box">
                        <span class="hamburger-inner"></span>
                    </span>
                </button>
            </div>

            <nav class="m-navigation" aria-label="Main navigation">
                <div class="menu-main-navigation-container">
                    <ul id="menu-main-navigation" class="site-navigation">
                        <li class="current-menu-item">
                            <router-link to="/">Search data</router-link>
                        </li>
                        <li>
                            <a href="https://archaeologydataservice.ac.uk/deposit-data/">Deposit data <em>ADS-easy</em></a>
                        </li>
                        <li>
                            <a href="https://archaeologydataservice.ac.uk/help-guidance/">Help &amp; guidance</a>
                        </li>
                        <li>
                            <a href="https://archaeologydataservice.ac.uk/news-events/">News &amp; events</a>
                        </li>
                        <li>
                            <a href="https://archaeologydataservice.ac.uk/blog/">Blog</a>
                        </li>
                        <li>
                            <a href="https://archaeologydataservice.ac.uk/about/">About</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div class="m-navigation-mobile">
                <ul id="menu-main-navigation" class="site-navigation">
                    <li>
                        <a href="https://archaeologydataservice.ac.uk/search-data/">Search data</a>
                    </li>
                    <li>
                        <a href="https://archaeologydataservice.ac.uk/deposit-data/">Deposit data <em>ADS-easy</em></a>
                    </li>
                    <li>
                        <a href="https://archaeologydataservice.ac.uk/help-guidance/">Help &amp; guidance</a>
                    </li>
                    <li>
                        <a href="https://archaeologydataservice.ac.uk/news-events/">News &amp; events</a>
                    </li>
                    <li>
                        <a href="https://archaeologydataservice.ac.uk/blog/">Blog</a>
                    </li>
                    <li>
                        <a href="https://archaeologydataservice.ac.uk/about/">About</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

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

  const newNavWrap = document.createElement('div')
  newNavWrap.classList.add('m-navigation-mobile')
  insertAfter(newNavWrap, document.querySelector('.m-navigation'))

  const newNav = document.querySelector('.m-navigation .site-navigation').cloneNode(true)
  newNav.classList.add('site-navigation')
  document.querySelector('.m-navigation-mobile').prepend(newNav)

  let menuOpen = false

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
  const query = matchMedia('(min-width: 767.5px)');

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

onMounted(() => {
    main()
})
</script>

<style>
.m-site-header {
    background: #fff;
    box-shadow: 0 0 6px rgba(0,0,0,.15);
    display: flex;
    margin: 0 auto;
    padding-right: 10vw;
    position: fixed!important;
    max-width: 90vw;
    z-index: 15
}

@media(min-width: 1500px) {
    .m-site-header {
        padding-right:calc(50vw - 600px);
        width: calc(50vw + 600px)
    }
}

@media(max-width: 1150px) {
    .m-site-header {
        padding-right:5vw;
        width: 95vw
    }
}

@media(max-width: 767px) {
    .m-site-header {
        background:transparent;
        box-shadow: none
    }
}

.m-logo {
    z-index: 501
}

.m-logo img {
    background: #fff;
    border-right: 1px solid #eee;
    min-width: 12.9375rem;
    padding-right: 25px
}

@media(max-width: 1150px) {
    .m-logo img {
        min-width:11.9375em
    }
}

@media(max-width: 767px) {
    .m-logo img {
        border-right:0;
        box-shadow: 0 0 6px rgba(0,0,0,.15);
        min-width: 129px;
        padding-right: 13px
    }
}

.m-logo span {
    display: none
}

.m-logo a {
    display: block
}

.m-logo a:hover {
    animation: bounce-hover .4s ease-in-out 1;
    animation-fill-mode: both
}

.m-hamburger {
    background: #333;
    display: none;
    position: fixed;
    right: 5vw;
    z-index: 500
}

@media(max-width: 767px) {
    .m-hamburger {
        display:block!important;
        transform: scale(.7);
        transform-origin: top right
    }
}

.m-hamburger .hamburger {
    padding: 18px 15px 15px
}

.m-hamburger .hamburger .hamburger-inner {
    bottom: 0;
    top: auto;
    transition-delay: .13s;
    transition-duration: .13s;
    transition-timing-function: cubic-bezier(.55,.055,.675,.19)
}

.m-hamburger .hamburger .hamburger-inner:after {
    top: -24px;
    transition: top .2s cubic-bezier(.33333,.66667,.66667,1) .2s,opacity .1s linear
}

.m-hamburger .hamburger .hamburger-inner:before {
    transition: top .12s cubic-bezier(.33333,.66667,.66667,1) .2s,transform .13s cubic-bezier(.55,.055,.675,.19)
}

.m-hamburger .hamburger.is-active .hamburger-inner {
    transform: translate3d(0,-12px,0) rotate(-45deg);
    transition-delay: .22s;
    transition-timing-function: cubic-bezier(.215,.61,.355,1)
}

.m-hamburger .hamburger.is-active .hamburger-inner:after {
    opacity: 0;
    top: 0;
    transition: top .2s cubic-bezier(.33333,0,.66667,.33333),opacity .1s linear .22s
}

.m-hamburger .hamburger.is-active .hamburger-inner:before {
    top: 0;
    transform: rotate(-90deg);
    transition: top .1s cubic-bezier(.33333,0,.66667,.33333) .16s,transform .13s cubic-bezier(.215,.61,.355,1) .25s
}

/*!
 * Hamburgers
 * @description Tasty CSS-animated hamburgers
 * @author Jonathan Suh @jonsuh
 * @site https://jonsuh.com/hamburgers
 * @link https://github.com/jonsuh/hamburgers
 */
.hamburger {
    padding: 15px 15px;
    display: inline-block;
    cursor: pointer;
    transition-property: opacity,filter;
    transition-duration: .15s;
    transition-timing-function: linear;
    font: inherit;
    color: inherit;
    text-transform: none;
    background-color: transparent;
    border: 0;
    margin: 0;
    overflow: visible;
    outline: 0
}

.hamburger:hover {
    opacity: .7
}

.hamburger-box {
    width: 36px;
    height: 26px;
    display: inline-block;
    position: relative
}

.hamburger-inner {
    display: block;
    top: 50%;
    margin-top: -1px
}

.hamburger-inner,.hamburger-inner::after,.hamburger-inner::before {
    width: 36px;
    height: 2px;
    background-color: #fff;
    border-radius: 0;
    position: absolute;
    transition-property: transform;
    transition-duration: .15s;
    transition-timing-function: ease
}

.hamburger-inner::after,.hamburger-inner::before {
    content: "";
    display: block
}

.hamburger-inner::before {
    top: -12px
}

.hamburger-inner::after {
    bottom: -12px
}

.m-navigation {
    clear: right;
    flex-grow: 1;
    font-size: 1.4vw
}

@media(min-width: 1500px) {
    .m-navigation {
        font-size:21px
    }
}

@media(max-width: 1150px) {
    .m-navigation {
        font-size:1.5vw
    }
}

@media(max-width: 767px) {
    .m-navigation {
        display:none
    }
}

.m-navigation .menu-main-navigation-container {
    height: 100%
}

.m-navigation ul {
    display: flex;
    height: 100%;
    justify-content: space-around;
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%
}

.m-navigation li {
    align-items: center;
    display: flex;
    margin-left: .9em;
    position: relative
}

@media(max-width: 1150px) {
    .m-navigation li {
        margin-left:.9em
    }
}

.m-navigation li.current-menu-item:after,.m-navigation li.current-page-ancestor:after,.m-navigation li.is-current:after {
    background: #333;
    content: "";
    height: .15em;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%
}

.m-navigation a {
    display: block;
    @apply text-primary;
    font-weight: 900;
    position: relative
}

.m-navigation li.current-menu-item a,.m-navigation li.current-page-ancestor a,.m-navigation li.is-current a {
    color: #333;
    cursor: default
}

.m-navigation li.current-menu-item a:hover,.m-navigation li.current-page-ancestor a:hover,.m-navigation li.is-current a:hover {
    color: #333
}

.m-navigation a:hover,.m-navigation a:hover em {
    color: #333
}

.m-navigation a em {
    @apply text-primary;
    border-radius: 3px;
    font-size: .8rem;
    font-size: .6rem;
    font-style: normal;
    font-weight: 500;
    font-weight: 900;
    left: -2px;
    padding: 1px 4px;
    position: absolute;
    text-transform: uppercase;
    top: -11px;
    transition: all .2s
}

@media(max-width: 1150px) {
    .m-navigation a em {
        font-size:1rem;
        font-size: .6rem
    }
}

.m-navigation li.current-menu-item a em,.m-navigation li.current-page-ancestor a em,.m-navigation li.is-current a em {
    color: #333;
    cursor: default
}

.m-navigation .current-menu-item a,.m-navigation .current-page-ancestor a,.m-navigation .is-current a {
    color: #333
}

.m-navigation-mobile {
    align-items: center;
    background: rgba(0,0,0,.8);
    display: flex;
    font-size: 44px;
    height: 100%;
    justify-content: center;
    left: 0;
    margin: 0;
    max-height: 100%;
    opacity: 0;
    overflow: auto;
    padding: 0;
    position: fixed;
    text-align: center;
    top: 0;
    visibility: hidden;
    width: 100%;
    z-index: -100
}

@media(max-width: 767px) {
    .m-navigation-mobile.is-visible {
        display:flex;
        opacity: 1;
        visibility: visible;
        z-index: 300
    }
}

.m-navigation-mobile.is-hidden {
    display: none
}

@media(max-width: 767px) {
    body.has-mobile-menu-open {
        overflow:hidden
    }
}

.m-navigation-mobile .site-navigation {
    list-style: none;
    margin: 0;
    padding: 0
}

.m-navigation-mobile .site-navigation a {
    color: #fff;
    display: inline-block;
    font-size: min(8vw,2.7rem);
    position: relative
}

.m-navigation-mobile .site-navigation li a span {
    background: transparent!important;
    margin-left: 9px
}

.m-navigation-mobile .site-navigation li {
    display: block;
    margin: 0;
    text-align: center
}

.m-navigation-mobile .site-navigation li.is-current a span {
    padding: 3px 4px 4px
}

.m-navigation-mobile .site-navigation>li>ul {
    display: none;
    margin: -7px 0 7px;
    padding: 0 20px
}

.m-navigation-mobile .site-navigation>li>ul>li {
    display: inline;
    margin: 0 6px
}

.m-navigation-mobile .site-navigation>li>ul>li>a {
    color: #fae100;
    font-size: 15px;
    padding: 6px 0 0
}

.m-navigation-mobile .site-navigation>li>ul>li>ul {
    padding: 0
}

.m-navigation-mobile a em {
    border-radius: 3px;
    color: #fff;
    font-size: .8rem;
    font-style: normal;
    font-weight: 500;
    font-weight: 600;
    padding: 1px 4px;
    position: absolute;
    right: -20px;
    text-transform: uppercase;
    top: -11px;
    transition: all .2s
}

@media(max-width: 1150px) {
    .m-navigation-mobile a em {
        font-size:1rem
    }
}

.m-site-wrapper {
    max-width: 80vw;
    margin: 0 auto
}

@media (min-width: 1500px) {
    .m-site-wrapper {
        max-width:1200px
    }
}

@media (max-width: 1150px) {
    .m-site-wrapper {
        max-width:90vw
    }
}
</style>
