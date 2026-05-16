import { defineConfig } from 'vite';
import viteHTMLMinify from 'vite-plugin-html-minify';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  root: './',
  
  // Desactiva por completo la búsqueda automática de la carpeta pública
  publicDir: false,

  plugins: [
    viteHTMLMinify({
      isMinify: true,
      minifyJS: true,
      minifyCSS: true,
      removeComments: true,
      collapseWhitespace: true
    }),
    viteStaticCopy({
      targets: [
        { src: 'faro.png', dest: './' },
        { src: 'faro.svg', dest: './' },
        { src: 'menucel.svg', dest: './' },
        { src: 'UnCorazon.mp3', dest: './' }
      ]
    })
  ],

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'esbuild',
    rollupOptions: {
      input: {
        main: './index.html',
      },
      output: {
        compact: true,
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    cssMinify: true,
    cssCodeSplit: false
  },

  server: {
    port: 3000,
    open: true,
  },
});