import vue from 'rollup-plugin-vue';
import buble from 'rollup-plugin-buble';
import url from 'postcss-url';
import autoprefixer from 'autoprefixer';
import uglify from 'rollup-plugin-uglify-es';

export default {
  input: 'src/index.js',
  output: {
    name: 'VueLinkList',
    exports: 'named',
  },
  plugins: [
    vue({
      css: true,
      compileTemplate: true,
      style: {
        postcssPlugins: [
          url({ url: 'inline' }),
          autoprefixer()
        ]
      }
    }),
    buble(),
    uglify({
      compress: {
        unused: true,
        dead_code: true
      }
    })
  ],
};
