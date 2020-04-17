// In src/prismic-configuration.js
export const linkResolver = doc => {
  // URL for a blog type
  if (doc.type === "post") {
    return `/blog/${doc.uid}`
  }
  // URL for a page type
  if (doc.type === "page") {
    return `/${doc.uid}`
  }
  // Backup for all other types
  return "/"
}
