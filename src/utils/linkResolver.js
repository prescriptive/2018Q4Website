const linkResolver = doc => {
  console.log(doc.type)
  console.log(doc.uid)
  // Route for blog posts
  if (doc.type === "blog_post") {
    return "/blog/" + doc.uid
  }

  // Homepage route fallback
  return "/"
}

module.exports = linkResolver
