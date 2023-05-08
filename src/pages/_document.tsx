import React from "react"
import Document, { DocumentContext, Head, Html, Main, NextScript } from "next/document"


export interface IDocument {}

export default class MyDocument extends Document<IDocument> {
  static async getInitialProps(ctx: DocumentContext) {
    const originalRenderPage = ctx.renderPage

    // Run the React rendering logic synchronously
    ctx.renderPage = () =>
      originalRenderPage({
        // Useful for wrapping the whole react tree
        enhanceApp: (App) => App,
        // Useful for wrapping in a per-page basis
        enhanceComponent: (Component) => Component,
      })

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  makeClasses(): string {
    const {page} = this.props.__NEXT_DATA__
    let classes = "page page-"
    switch (page) {
      case "/home":
        classes += "home"
    }
    return classes
  }

  render() {
    return (
      <Html>
        <Head/>
        <body className={ this.makeClasses() }>
          <Main/>
          <NextScript/>
        </body>
      </Html>
    )
  }
}
