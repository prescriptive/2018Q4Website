// -- The Link Resolver
// This function will be used to generate links to Prismic documents
// As your project grows, you should update this function according to your routes

exports.linkResolver = function linkResolver(doc) {
  // Route for bages
  if (doc.type === "pa") {
    return "/" + doc.uid
  }

  if (doc.type === "blog_post") {
    return "/blog/" + doc.uid
  }

  // Homepage route fallback
  return "/"
}
