# kwai-vite

The [vite](https://vitejs.dev/) version of [kwai-ui](https://https://github.com/fbraem/kwai-ui).

**Note** : At the moment only the nl locale (Dutch) is supported.

Installation
------------

+ You need npm to generate the website.
+ Clone this repository and install all dependencies using npm.
+ Copy `/config/config.dist.yaml` to `/config/config.yaml` and update it 
  according to your configuration.
+ The theme that is included is for our judo club. You can create your own,
  and change the @theme alias in `vite.config.js`.
+ Run `npm run dev` to test the website
+ Run `npm run build` to build the website. Upload the dist folder to your
  host.
