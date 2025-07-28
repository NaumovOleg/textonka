import { build } from 'esbuild';
import esbuildPluginTsc from 'esbuild-plugin-tsc';

build({
  entryPoints: ['./src/handler.ts'],
  bundle: true,
  minify: true,
  minifyIdentifiers: false,
  keepNames: true,
  platform: 'node',
  sourcemap: true,
  // target: 'node20',
  outdir: './lambdas',
  entryNames: '[name]',
  target: 'esnext',
  format: 'cjs',
  loader: { '.ts': 'ts' },
  plugins: [esbuildPluginTsc()],

  // external: ['pg', 'sqlite3', 'tedious', 'mysql', 'mysql2', 'oracledb'],
  //   external: ['mock-aws-s3', '@mapbox'],
}).catch((_err) => {
  process.exit(1);
});
