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
          <li class="menu-item"><Social/></li>
          <li class="menu-item"><Likes/></li>
          <li class="menu-item"><Burger/></li>
        </ul>
      </div>
      <Sidebar/>
      <slot></slot>
  </div>
</template>

<script>
import Burger from '~/components/Burger.vue'
import Social from '~/components/Social.vue'
import Sidebar from '~/components/Sidebar.vue'
import Likes from '~/components/Likes.vue'

export default {
 name: 'app',
 components: {
   Burger,
   Sidebar,
   Social,
   Likes
 },
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

  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-flow: row wrap;
    background: #add19e;
    padding: 1rem 0;
    height: 4rem;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
  }

  input {
    font-family: 'Jost', sans-serif;
    font-size: 1rem;
    background-color: transparent;
    border: 0px solid;
    border-bottom: 1px solid rgba(0,0,0,0.8);;
    letter-spacing: 2px;
    margin-bottom: 1rem;
  }

  input:focus {
    outline: none;
  }

  .button {
    font-family: 'Jost', sans-serif;
    font-size: 1rem;
    letter-spacing: 2px;
    background-color: transparent;
    border: none;
    border-radius: 0;
  }

  .logo {
    display: flex;
    flex: row wrap;
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
    margin-left: 1rem;
  }

  .menu-link {
    text-decoration: none;
    color: #fff;
    transform: uppercase;
    font-size: 1.2rem;
    letter-spacing: 2px;
  }
</style>