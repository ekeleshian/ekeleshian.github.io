import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import profilePic from './Keleshian-Liz.jpg'
import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
        }}
      >
        <img
          src={profilePic}
          alt={`Elizabeth Keleshian`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
          }}
        />
        <p>
          Written by <strong>Elizabeth Keleshian</strong>, who is making a career U-turn in San Francisco.{' '}
          <a href="https://twitter.com/_mathlizard">
            You should follow her on Twitter
          </a>
        </p>
      </div>
    )
  }
}

export default Bio
