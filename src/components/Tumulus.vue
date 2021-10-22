<template>
  <Layout>
      <div class="text-container">
        <h1>About us</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error doloremque omnis animi, eligendi magni a voluptatum, vitae, consequuntur rerum illum odit fugit assumenda rem dolores inventore iste reprehenderit maxime! Iusto.</p>
        <g-image :src="require(`!!assets-loader!!@images/background.png`)" fit="contain"/>
      </div>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'About us'
  }
}
</script>

<style scoped>
.text-container {
    max-width: 1044px;
    width: 100%;
    padding: 0 3rem;
    margin: 0 auto
}
</style>