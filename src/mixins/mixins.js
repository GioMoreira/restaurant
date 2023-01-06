export default {
    methods: {
        isDesktop() {
            const width = window.innerWidth;
            return width > 767;
          },
          isSmallScreen() {
            const width = window.innerWidth;
            return width < 767;
          }
    },
}