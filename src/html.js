import React from "react"
import PropTypes from "prop-types"



export default function HTML(props) {

  function gtmBodyDelay(){
      return(
        <div
        dangerouslySetInnerHTML={{
          __html: `
          <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KWP5GHG"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
              `,
        }}
      />
      )
  }
  return (
    <html {...props.htmlAttributes}>
      <head>
      <script
      dangerouslySetInnerHTML={{
        __html: `
        setTimeout(function() {(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-KWP5GHG');}, 5000)
            `,
      }}
    />
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
      {gtmBodyDelay()}
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
