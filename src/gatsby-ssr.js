import React from "react"

const knownOptions = {
  clickmap: `boolean`,
  trackLinks: `boolean`,
  accurateTrackBounce: `boolean`,
  trackHash: `boolean`,
  webvisor: `boolean`,
}

exports.onRenderBody = (
  { setPostBodyComponents },
  pluginOptions
) => {
  if (process.env.NODE_ENV === `production`) {
    let ymCreateOptions = {}
    for (const option in knownOptions) {
      if (typeof pluginOptions[option] === knownOptions[option]) {
        ymCreateOptions[option] = pluginOptions[option]
      }
    }

    return setPostBodyComponents([
      <script
        key={`gatsby-plugin-yandex-metrica`}
        dangerouslySetInnerHTML={{
          __html: `
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(${pluginOptions.trackingId}, "init", ${JSON.stringify(ymCreateOptions)});
          `
        }}
      />,
      <noscript><div><img src={`https://mc.yandex.ru/watch/${pluginOptions.trackingId}`} style={{ position: "absolute", left: "-9999px" }} alt="" /></div></noscript>
    ])
  }

  return null
}
