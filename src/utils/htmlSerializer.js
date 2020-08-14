import React from "react"

// Sort and display the different slice options
const HtmlType = ({ item }) => {
  console.log(item)
  return item.content.map((element, index) => {
    const res = (() => {
      switch (element.type) {
        case "heading3":
          return <h3>{element.text}</h3>

        case "image":
          return <img src={element.url} />

        case "list-item":
          return <li>{element.text}</li>

        case "o-list-item":
          return <li>{element.text}</li>

        default:
          return
      }
    })()
    return res
  })
}
export const HtmlRender = ({ item }) => {
  return <HtmlType item={item} />
}

export default HtmlRender
