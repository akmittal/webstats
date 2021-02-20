// tailwind.config.js
module.exports = {
    purge: {
        enabled: process.env.NODE_ENV === 'production',
        // classes that are generated dynamically, e.g. `rounded-${size}` and must
        // be kept
        safeList: [],
        content: [
          './index.html',
          './src/**/*.tsx',
          './src/**/*.jsx',
          // etc.
        ],
      },
    // ...
    // rest of the config
    plugins: [require('@tailwindcss/ui')],
  }