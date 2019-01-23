import React from 'react'
import PropTypes from 'prop-types'

const Services = ({ data }) => (
  <div className="columns">
    {data.map(price => (
      <div>{price.icontext}</div>
    ))}
  </div>
)

Services.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      icon: PropTypes.string,
      icontext: PropTypes.array,
    })
  ),
}

export default Services
