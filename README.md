# kwai-vite

> Kwai-vite is now part of [kwai](https://codeberg.org/zumuta/kwai).

Kwai-vite is part of the Kwai system. The ultimate goal of Kwai is to manage
a (sports)club. The focus is currently on judo sport (Kwai means Japanese), but
one day it will be possible to add other sports.

Kwai-vite is the successor of [kwai-ui](https://https://github.com/fbraem/kwai-ui).
Instead of Webpack, [vite](https://vitejs.dev/) is used. 

> Kwai is a greenfield project. As long as there is no official release,
> everything can change. Although there is still a lot to do, kwai is already
> used in production for our club but that is no guarantee that it will work
> for you...

Kwai-vite is a Single Page Application (SPA) written with [vue 3.x](https://vuejs.org/)
and [tailwindcss](https://tailwindcss.com/) as its main components.

Currently, only news, pages and trainings are supported.

**Note** : At the moment only the nl locale (Dutch) is supported.

# Installation
+ You need npm to generate the website.
+ Clone this repository and install all dependencies using npm.
+ Copy `/config/config.dist.toml` to `/config/config.toml` and update it 
  according to your configuration.
+ The theme that is included is for our judo club. You can create your own,
  and change the @theme alias in `vite.config.js`.
+ Run `npm run dev` to test the website
+ Run `npm run build` to build the website. Upload the dist folder to your
  host.

# Credits
+ [Pixabay](https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=984393) for free images.
+ [Font Awesome](https://fontawesome.com/) for free icons.
