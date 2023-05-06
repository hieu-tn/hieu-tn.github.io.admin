import React from "react"
import App, { AppContext, AppProps } from "next/app"
import Head from "next/head"
import Layout from "@components/Layout"
import { getMetadata } from "@lib/metadata.lib"
import { IMetadata } from "@models/common.models"
import "@styles/main.scss"


MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)
  const metadata: IMetadata = getMetadata()
  appProps.pageProps.metadata = metadata

  return appProps
}

export default function MyApp({Component, pageProps}: AppProps) {
  const {siteURL, title, description, keywords, author} = pageProps.metadata

  return (
    <>

      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        <title>{ title }</title>
        <meta name="description" content={ description }/>
        <meta name="keywords" content={ keywords }/>
        <meta name="author" content={ author }/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content={ title }/>
        <meta property="og:url" content={ siteURL }/>
        <meta property="og:image" content={ siteURL + "/images/logo.jpg" }/>

        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png"/>
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png"/>
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png"/>
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png"/>
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png"/>
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png"/>
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png"/>
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png"/>
        <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/manifest.json"/>
        <meta name="msapplication-TileColor" content="#ffffff"/>
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png"/>
        <meta name="theme-color" content="#ffffff"/>

      </Head>

      <Layout metadata={ pageProps.metadata }>
        <Component { ...pageProps } />
      </Layout>

    </>
  )
}
