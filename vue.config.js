module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/sass/_globals.scss";
          @import "@/assets/sass/_variables.scss";
        `
      }
    }
  }
}
