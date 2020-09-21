import "../scss/gitalk.scss"

import Gitalk from "gatsby-plugin-gitalk"
import Layout from "../components/layout"
import Main from "../components/main"
import Pagination from "../components/pagination"
import Post from "../components/post"
import React from "react"
import Sidebar from "../components/sidebar"
import { graphql } from "gatsby"

const BlogPostTemplate = ({ data, pageContext }) => {
  const post = data.markdownRemark
  const { previous, next } = pageContext

  return (
    <Layout
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
      socialImage={post.frontmatter.image}
    >
      <Sidebar toc={post.tableOfContents} />
      <Main>
        <Post post={post} />
        <Pagination
          prevLink={previous && previous.fields.slug}
          prevText={previous && "← " + previous.frontmatter.title}
          nextLink={next && next.fields.slug}
          nextText={next && next.frontmatter.title + " →"}
        />
        <div
          style={{
            paddingLeft: `35px`,
            paddingRight: `35px`,
          }}
        >
          <Gitalk
            options={{
              id: pageContext.slug,
              title: post.frontmatter.title,
            }}
          />
        </div>
      </Main>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $dateFormat: String) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      excerpt(pruneLength: 160)
      html
      tableOfContents(absolute: false, maxDepth: 3)
      fields {
        date(formatString: $dateFormat)
      }
      frontmatter {
        title
        description
        tags
        image
      }
    }
  }
`