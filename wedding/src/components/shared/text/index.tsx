import React from 'react'

const Text = ({ children }: { children: string }) => {
  const message = children.split('\n').map((string, index, array) => {
    return (
      <React.Fragment key={index}>
        {string}
        {index === array.length - 1 ? null : <br />}
      </React.Fragment>
    )
  })
  return <div>{message}</div>
}

export default Text
