<template>
  <div class="layout">
    <nav class="navbar">
        <div class="logo">
          <g-link class="nav__link" to="/">
            <img src="https://image.flaticon.com/icons/png/128/595/595601.png" alt="Logo" width="50" height="50">
          </g-link>
          <div class="sitename">
            <p>Gallo-Romeinse<br><strong>Tumuli</strong></p>
          </div>
        </div>
        <form class="search">
          <input type="text">
          <button><i class="fas fa-search"></i></button>
        </form>   
      </nav>
      <slot/>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

