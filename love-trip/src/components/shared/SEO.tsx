import React from 'react'
import { Helmet } from 'react-helmet-async'
interface SEOProps {
  title: string
  description: string
  image: string
}

const SEO = ({ title, description, image }: SEOProps) => {
  return (
    <Helmet>
      <title>LoveTrip</title>
    </Helmet>
  )
}

export default SEO
