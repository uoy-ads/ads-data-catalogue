<template>
  <div class="m-site-footer">
    <div class="main-footer max-w-screen-xl mx-auto">
      <div class="logos ml-base">
        <ul>
          <li>
            <a href="https://www.york.ac.uk/">
              <img src="https://archaeologydataservice.ac.uk/app/uploads/2022/06/logo-uoy.svg"
              style="width: 150px"
              alt="University of York logo"/>
            </a>
          </li>
          <li>
            <a href="http://doi.org/10.17616/R3MW23">
              <img src="https://archaeologydataservice.ac.uk/app/uploads/2022/06/logo-re3data-color.svg"
              style="width: 198px"
              alt="re3data.org logo" />
            </a>
          </li>
          <li>
            <a href="https://www.coretrustseal.org/why-certification/certified-repositories/">
              <img src="https://archaeologydataservice.ac.uk/app/uploads/2022/06/logo-core-trust-seal-color.png"
              alt="CoreTrustSeal logo" />
            </a>
          </li>
          <li>
            <a href="https://www.worlddatasystem.org/">
              <img src="https://archaeologydataservice.ac.uk/app/uploads/2022/06/logo-wds-color.jpg"
              alt="World Data System logo" />
            </a>
          </li>
        </ul>
      </div>
      <div class="social ml-base">
        <h3>Follow us</h3>
        <ul>
          <li><a href="https://www.facebook.com/archaeology.data.service/"><i class="fa-brands fa-facebook"></i></a></li>
          <li><a href="https://bsky.app/profile/ads-update.bsky.social"><i class="fa-brands fa-bluesky"></i></a></li>
          <li><a href="https://www.instagram.com/archaeologydataservice/?hl=en"><i class="fa-brands fa-instagram"></i></a>
          </li>
          <li><a href="https://www.linkedin.com/company/archaeology-data-service/"><i
                class="fa-brands fa-linkedin"></i></a></li>
        </ul>
      </div>
    </div>

    <div class="footer-navigation">

      <div class="max-w-screen-xl mx-auto">

        <nav aria-label="Footer navigation" >
          <div class="menu-footer-navigation-container">
            <ul id="menu-footer-navigation" class="menu">
              <li>
                <a href="https://www.york.ac.uk/about/legal-statements/">University of York legal statements</a>
              </li>
              <li>
                <a href="https://archaeologydataservice.ac.uk/terms-and-conditions/">Terms and conditions</a>
              </li>
              <li>
                <a href="https://archaeologydataservice.ac.uk/cookie-policy/">Cookie policy</a>
              </li>
              <li>
                <a href="https://archaeologydataservice.ac.uk/privacy/">Privacy policy</a>
              </li>
              <li>
                <a href="https://archaeologydataservice.ac.uk/accessibility/">Accessibility</a>
              </li>
              <li>
                <a href="https://archaeologydataservice.ac.uk/contact/">Contact</a>
              </li>
              <li>
                <a href="https://ariadne-infrastructure.github.io/docs/Portal_User_Guide/Section-1_What" target="_blank">ADS Catalogue user guide</a>
              </li>
              <li>
                <router-link to="/about">Disclaimer</router-link>
              </li>
            </ul>
          </div>
        </nav>

        <div class="legal">
          &copy; Archaeology Data Service {{ year }}
          <p>The Archsearch portal reuses e-infrastructure constructed within the EU-funded ARIADNE and ARIADNEplus project.</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { $computed } from 'vue/macros';
const year = $computed(() => new Date().getFullYear());
</script>

<style>
.m-site-footer {
  background: #f0f0f0;
}

.m-site-footer .main-footer {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 2rem;
  align-items: flex-end;
  padding: 1.2rem 0 2rem;
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
}

.m-site-footer .logos {
  grid-column: 1 / 3;
}

.m-site-footer .logos ul {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  align-items: center;
  @media (max-width: 767px) {
    flex-wrap: wrap;
  }
}

.m-site-footer .logos ul li {
  padding-right: 1.5rem;
  @media (max-width: 1150px) {
    padding-right: 0.9rem;
  }
  @media (max-width: 767px) {
    width: 33.333333%;
  }
}

.m-site-footer .logos li:first-child {
  border-right: 1px solid #d8d8d8;
  display: inline-block;
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin-right: 1.5rem;
  @media (max-width: 1150px) {
    margin-right: 0.9rem;
  }
  @media (max-width: 767px) {
    border-right: 0;
    border-bottom: 1px solid #d8d8d8;
    display: inline-block;
    width: 100%;
    margin-bottom: 1rem;
    padding-right: 0;
  }
}

.m-site-footer .logos img {
  width: 100px;
  mix-blend-mode: multiply;
}

.m-site-footer .re3data img {
  width: 198px;
}

.m-site-footer .logos a {
  transition: all 0.2s;
}

.m-site-footer .logos a:hover img {
  opacity: 0.8;
}

.m-site-footer .social h3 {
  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: 500;
  @media (max-width: 1150px) {
    font-size: 1rem;
  }
  color: #5f5f5f;
}

.m-site-footer .social ul {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
}

.m-site-footer .social a {
  font-size: 3.1rem;
  margin-right: 1.2rem;
  color: #333;
  display: block;
  transition: all .2s;
}

.m-site-footer .social a:hover {
  transform: scale(1.05);
  color: #c00;
}

.m-site-footer .footer-navigation {
  color: #f0f0f0;
  padding: 2em;

  background: rgba(0, 0, 0, 0.9);
}

.m-site-footer .footer-navigation a:hover {
  color: white;
}

.m-site-footer .footer-navigation ul {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
}

.m-site-footer .footer-navigation li {
  margin-right: 1rem;
}

.m-site-footer .legal {
  opacity: 0.5;
}

</style>
