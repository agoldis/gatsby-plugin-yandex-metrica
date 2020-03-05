exports.onRouteUpdate = function ({ location }, {trackingId}) {
  if (process.env.NODE_ENV === `production` && typeof ym === `function`) {
    if (
      location &&
      typeof window.ym !== `undefined`
    ) {
      return
    }

    // wrap inside a timeout to make sure react-helmet is done with it's changes (https://github.com/gatsbyjs/gatsby/issues/9139)
    // reactHelmet is using requestAnimationFrame so we should use it too: https://github.com/nfl/react-helmet/blob/5.2.0/src/HelmetUtils.js#L296-L299
    const sendPageView = () => {
      window.ym('hit', trackingId, (
        location
          ? location.pathname + location.search + location.hash
          : undefined
      ))
    }

    if (`requestAnimationFrame` in window) {
      requestAnimationFrame(() => {
        requestAnimationFrame(sendPageView)
      })
    } else {
      // simulate 2 rAF calls
      setTimeout(sendPageView, 32)
    }
  }
}
