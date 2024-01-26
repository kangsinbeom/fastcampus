import classNames from 'classnames/bind'
import styles from './styles.module.scss'
import Section from '../../shared/section'

const cx = classNames.bind(styles)

const ImageGallery = ({ images }: { images: string[] }) => {
  return (
    <>
      <Section title="사진첩">
        <ul className={cx('wrap-images')}>
          {images.map((src, index) => (
            <li key={index} className={cx('wrap-image')}>
              <picture>
                <source srcSet="" type="image/webP" />
                <img src="" alt="" />
              </picture>
            </li>
          ))}
        </ul>
      </Section>
      {/* <ImageViewer images={images} open /> */}
    </>
  )
}

export default ImageGallery
