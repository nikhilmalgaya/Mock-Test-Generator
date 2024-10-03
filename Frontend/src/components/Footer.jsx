import React from 'react'

function Footer({user}) {
  return (
      <div>Footer
          {user && <>name:{user.displayName}</>}
    </div>
  )
}

export default Footer
