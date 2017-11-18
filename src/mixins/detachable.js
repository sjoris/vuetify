import Bootable from './bootable'

export default {
  mixins: [Bootable],

  data: () => ({
    targetNode: {}
  }),

  props: {
    target: {
      type: String,
      default: '[data-app]'
    },
    contentClass: {
      default: ''
    }
  },

  mounted () {
    this.initDetach()
  },

  beforeDestroy () {
    if (!this.$refs.content) return

    // IE11 Fix
    try {
      this.$refs.content.parentNode.removeChild(this.$refs.content)
    } catch (e) {}
  },

  methods: {
    initDetach () {
      if (this._isDestroyed) return

      const app = document.querySelector(this.target)

      if (!app) {
        return console.warn(`Unable to find <target> ${this.target}, ensure that the target exists in the DOM`)
      }

      // If child has already been removed, bail
      if (!this.$refs.content) return

      app.insertBefore(
        this.$refs.content,
        app.firstChild
      )

      this.targetNode = app
    }
  }
}
