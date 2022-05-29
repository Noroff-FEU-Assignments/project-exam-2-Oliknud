import { React, useEffect }from 'react'

function NotFound() {

  useEffect(() => {
    document.title = "Holidaze | Not found"
  })

  return (
    <div>Not Found</div>
  )
}

export default NotFound