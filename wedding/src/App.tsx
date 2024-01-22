import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './App.module.scss'
import FullScreenMessage from './components/shared/fullScreenMessage'

const cx = classNames.bind(styles)

function App() {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  // fetching wedding data
  useEffect(() => {
    setIsLoading(true)
    fetch('http://localhost:8888/wedding')
      .then((res) => {
        if (res.ok === false) {
          throw new Error('청첩장 정보를 불러오지 못했습니다.')
        }
        return res.json()
      })
      .then((data) => {
        setData(data)
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false))
  }, [])
  if (isLoading) {
    return <FullScreenMessage type="loading" />
  }

  if (isError) {
    return <FullScreenMessage type="error" />
  }
  return (
    <div className={cx('container')}>
      <div>{JSON.stringify(data)}</div>
    </div>
  )
}

export default App
