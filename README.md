# gatsby-plugin-yandex-metrica

Easily add Yandex Metrica to your Gatsby site.

## Install

```
npm install --save gatsby-plugin-yandex-metrica
```

## Usage

In gatsby-config.js file:

```js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-yandex-metrica`,
      options: {
        trackingId: "YOUR_YANDEX_METRICA_TRACKING_ID",
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        trackHash: true,

        // Detailed recordings of user activity on the site: mouse movement, scrolling, and clicks.
        webvisor: true,
      }
    }
  ]
}
```
