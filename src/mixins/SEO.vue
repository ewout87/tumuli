<static-query>
  query {
    metadata {
      siteName
      siteDescription
      siteUrl
    }
  }
</static-query>

<script>
export default {
  metaInfo () {
    const siteUrl = this.$static.metadata.siteUrl
    const image = this.$page.tumuli.edges.node.image
    const imagePath = (image && `${siteUrl}${image.src}`) || ''

    return {
      title: this.$page.tumuli.edges.node.title,
      meta: [
        { key: 'description', name: 'description', content: this.$static.metadata.siteDescription },
        { key: 'og:url', property: 'og:url', content: siteUrl },
        {
          key: 'og:title',
          property: 'og:title',
          content: this.$page.tumuli.edges.node.title
        },
        {
          key: 'og:type',
          property: 'og:type',
          content: 'article'
        },
        {
          key: 'og:description',
          property: 'og:description',
          content: this.$page.tumuli.edges.node.title
        },
        {
          key: 'og:image',
          property: 'og:image',
          content: imagePath
        },
        {
          key: 'og:image:width',
          property: 'og:image:width',
          content: (image && image.size.width) || ''
        },
        {
          key: 'og:image:height',
          property: 'og:image:height',
          content: (image && image.size.height) || ''
        },
      ],
    }
  }
}
</script>