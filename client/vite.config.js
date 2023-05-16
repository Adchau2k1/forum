// vite.config.js
export default {
    // other config options ...
    optimizeDeps: {
        exclude: ['fsevents'], // exclude fsevents from dependency optimization
    },
}
