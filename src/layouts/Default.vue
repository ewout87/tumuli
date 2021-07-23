<template>
  <div class="layout">
    <div class="navbar">
        <div class="logo">
          <g-link class="nav__link" to="/">
            <g-image src="~/assets/images/icon.png" alt="Logo" width="50" height="50"/>
          </g-link>
          <div class="sitename">
            <p>Bezoek onze<br><strong>Tumuli</strong></p>
          </div>
        </div>
        <nav>
            <ul class="menu">
              <li class="menu-item"><g-link class="menu-link" to="/about/">About us</g-link></li>
              <li class="menu-item"><a></a></li>
            </ul>
        </nav>
      </div>
      <slot></slot>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

