import fetch from 'isomorphic-fetch'
import Head from 'next/dist/next-server/lib/head'
import React from 'react'
import Footer from '../../components/Footer'
import Markdown from '../../components/Markdown'
import Nav from '../../components/nav/Nav'
import PageWrapper from '../../components/PageWrapper'
import getBaseUrl from '../../components/utils/getBaseUrl'
import ApiLink from '../../components/ApiLink'
import { Typography } from '@material-ui/core'
import { useTheme } from '@material-ui/styles'
import { PRODUCT_NAME } from '../../constants'
import { populatePlaceholders } from '../../components/utils/markdownUtils'

export default function Guide({ notFound, markdown, navData, guide }) {
  if (notFound) {
    return <Typography>Page not found.</Typography>
  }

  const theme = useTheme()

  let pageTitle

  navData.some(section => {
    return section.items.some(page => {
      if ((page.as || '').endsWith(guide)) {
        pageTitle = page.text
        return true
      }
    })
  })

  return (
    <PageWrapper
      centerStyle={{ paddingTop: theme.spacing(4) }}
      nav={<Nav navData={navData} aboveAdornments={[<ApiLink key="link" />]} />}
    >
      <Head>
        <title>
          {PRODUCT_NAME} Documentation {pageTitle ? `- ${pageTitle}` : ''}
        </title>
      </Head>
      <Markdown source={markdown} toc />
      <Footer navData={navData} guide={guide} />
    </PageWrapper>
  )
}

Guide.getInitialProps = async function({ req, query, version }) {
  const baseUrl = getBaseUrl(req)
  let { guide } = query

  // guide will come in as single string, or with a version prepended (e.g. v1.2.3/overview)
  if (typeof guide === 'string') {
    guide = decodeURIComponent(guide).split('/')
  }

  if (Array.isArray(guide)) {
    if (guide.length > 1) {
      version = guide[0]
      guide = guide[1]
    } else {
      guide = guide[0]
    }
  }

  try {
    const [navData, content] = await Promise.all([
      fetch(`${baseUrl}/api/guides?version=${version}`)
        .then(res => res.json())
        .catch(e => console.log('error', e)),
      fetch(`${baseUrl}/api/guides/${guide}?version=${version}`)
        .then(res => res.text())
        .catch(e => console.log('error', e)),
    ])

    return {
      markdown: populatePlaceholders(content),
      navData,
      guide,
    }
  } catch (e) {
    return {
      notFound: true,
    }
  }
}
