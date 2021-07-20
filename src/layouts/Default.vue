<template>
  <div class="layout">
    <nav class="navbar">
        <div class="logo">
          <g-link class="nav__link" to="/">
            <g-image src="~/assets/images/icon.png" alt="Logo" width="50" height="50"/>
          </g-link>
          <div class="sitename">
            <p>Gallo-Romeinse<br><strong>Tumuli</strong></p>
          </div>
        </div>
      </nav>
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

