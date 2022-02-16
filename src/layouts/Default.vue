<template>
  <div class="layout">
    <div class="navbar">
        <div class="logo">
          <g-link class="nav__link" to="/">
            <g-image src="~/assets/images/icon.png" alt="Logo" width="50" height="50"/>
          </g-link>
          <div class="sitename">
            <p>Ontdek onze<br><strong>Tumuli</strong></p>
          </div>
        </div>
        <ul class="menu">
          <li class="menu-item"></li>
          <li class="menu-item"></li>
          <li class="menu-item"></li>
        </ul>
      </div>
      <Sidebar/>
      <slot></slot>
      <button class="button button-scroll" @click.prevent="scrollToTop()"></button>
      <Footer/>
  </div>
</template>

<script>
import Burger from '~/components/Burger.vue'
import Footer from '~/components/Footer.vue'
import Sidebar from '~/components/Sidebar.vue'
import Likes from '~/components/Likes.vue'

export default {
 name: 'app',
 components: {
   Burger,
   Sidebar,
   Footer,
   Likes
 },
 methods: {
   scrollToTop() {
     window.scroll({top: 0, left: 0, behavior: 'smooth'});
   }
 }
}
</script>

<static-query>
query {
  metadata {
    siteName
    siteDescription
    siteUrl
  }
}
</static-query>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Jost&family=Open+Sans&family=Roboto:wght@700&display=swap');

  body {
    font-family: 'Jost', Sans-serif;
    margin:0;
    padding:0;
    line-height: 1.2rem;
    color: rgba(0,0,0,0.8);
  }

  h2 {
    line-height: 1.2;
  }

  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-flow: row wrap;
    background: #add19e;
    padding: 1rem 0;
  }
  
  select,
  input {
    font-family: 'Jost', sans-serif;
    font-size: 1rem;
    background-color: transparent;
    border: 0px solid;
    border: 1px solid rgba(0,0,0,0.8);
    letter-spacing: 2px;
    margin-bottom: 1rem;
    padding: .5rem 1.5rem;
  }

  input:focus {
    outline: none;
    border: 1px solid rgb(216, 122, 0);
  }

  .button {
    font-family: 'Jost', sans-serif;
    font-size: 1rem;
    letter-spacing: 2px;
    background-color: transparent;
    border: none;
    border-radius: 0;
  }

  .button.button-scroll {
    font-size: 1.5rem;
    position: sticky;
    bottom: 3rem;
    border-radius: 100%;
    width: 50px;
    height: 50px;
    display: block;
    padding: 0;
    margin-right: 1.5rem;
  }

  .logo {
    display: flex;
    flex-flow: row wrap;
    text-align: center;
    align-self: center;
    margin-left: 1rem;
  }

  .sitename {
    font-family: 'Roboto', sans-serif;
    text-transform: uppercase;
    font-weight: bolder;
    text-align: center;
    line-height: 1.5rem;
  }
      
  .sitename p {
    margin: 0;
    color: #fff;
    letter-spacing: 2px;
  }
      
  .sitename strong {
    font-size: 2rem;
    line-height: 1.5rem;
  }

  .menu {
    display: flex; 
    margin-right: 1rem;
  }

  .menu-item {
    list-style: none;
  }

  .menu-item + .menu-item {
    margin-left: 2rem;
  }

  .menu-link {
    text-decoration: none;
    color: #fff;
    transform: uppercase;
    font-size: 1.2rem;
    letter-spacing: 2px;
  }

  .tumulus {
    width: 300px;
    height: 300px;
    border-radius: 100%;
    text-align: center;
    list-style-type: none;
    cursor: pointer;
    position: relative;
    transition: all 0.5s ease;
    -webkit-transition: all 0.5s ease-out;
    -moz-transition: all 0.5s ease-out;
    -o-transition: all 0.5s ease-out;
    border-bottom: 1px solid transparent;
    overflow: hidden;
    margin: 0 1.5rem;
  }

  .tumulus-overlay {
    background: rgba(0, 0, 0, 0);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    color: #fff;
    visibility: hidden;
    text-align: center;
    transition: all 1s ease;
  }

  .list {
    padding-left: 1.5rem;
    padding-right: 1.5rem;;
    display: flex;
    margin-top: 120px;
    justify-content: space-between;
  }

  .list-item {
    display: flex;
    flex-wrap: nowrap;
    transition: all .5s ease;
    overflow: hidden;
    height: 0;
  }

  .list-item:nth-child(2){
    transition-delay: .15s;
  }

  .list-item:nth-child(3){
    transition-delay: .3s;
  }

  .list-item:nth-child(4){
    transition-delay: .45s;
  }

  .list-icon {
    margin-right: .5rem;
  }

  .tumulus:hover .tumulus-overlay {
    background: rgba(0, 0, 0, .5);
    visibility: visible;
  }

  .tumulus:hover .list-item {
    height: 2rem;
  }

  .inner-wide {
    max-width: 1240px;
    width: 100%;
    margin: 3rem auto;
  }

  .background {
    width: 100%;
    height: 150px;
    background-size: 100%;
    background-position: center bottom -50px;
    background-repeat: no-repeat;
  }

  .button {
    background-color: rgb(216, 122, 0);
    color: #fff;
    padding: .5rem 3rem .5rem 1.5rem;
    margin: 0 auto;
    text-align: center;
    font-size: 1.2rem;
    position: relative;
  }

  .button::after {
    color: #fff;
    display: inline-block;
    height: 1.2rem;
    width: 1.2rem;
    font-family: "Font Awesome 5 Free"; 
    font-weight: 900; 
    font-size: 1.2rem;
    content: "\f105";
    position: absolute;
    top: .8rem;
    right: 1.5rem;
    transition: all .5s ease;
  }

  .button:hover::after {
    right: 1rem;
  }

  .button-scroll:after {
    font-size: 2rem;
    content: "\f106";
    top: .4rem;
    right: 1rem;
  }

  .button-scroll:hover::after {
    top: 0;
    right: 1rem;
  }

  .center {
    text-align: center;
    margin: 0 auto;
  }
</style>