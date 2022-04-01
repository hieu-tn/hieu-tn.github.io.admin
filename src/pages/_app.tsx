import React from 'react'
import App, { AppContext, AppProps } from 'next/app'
import Head from 'next/head'
import Layout from '@components/Layout'
import { getMetadata } from '@lib/metadata.lib'
import { IMetadata } from '@models/common.models'
import '@styles/main.scss'


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
        <title>{title}</title>
        <meta name="description" content={description}/>
        <meta name="keywords" content={keywords}/>
        <meta name="author" content={author}/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content={title}/>
        <meta property="og:url" content={siteURL}/>
        <meta property="og:image" content={siteURL + '/images/logo.jpg'}/>
      </Head>

      <Layout metadata={pageProps.metadata}>
        <Component {...pageProps} />
      </Layout>

    </>
  )
}
