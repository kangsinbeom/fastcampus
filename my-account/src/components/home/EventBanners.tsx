import withSuspense from '@shared/hocs/withSuspense';
import useEventBanners from './hooks/useEventBanners';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import Flex from '@shared/Flex';
import Text from '@shared/Text';
import { css } from '@emotion/react';
import Skeleton from '../shared/Skeleton';
import Image from 'next/image';

const EventBanners = () => {
  const { data } = useEventBanners();
  console.log(data);
  return (
    <div style={{ padding: 24 }}>
      <Swiper spaceBetween={8}>
        {data?.map((banner) => {
          return (
            <SwiperSlide key={banner.id}>
              <Link href={banner.link}>
                <Flex
                  justify="space-between"
                  style={{ backgroundColor: banner.backgroundColor }}
                  css={bannerStyles}
                >
                  <Flex direction="column">
                    <Text bold={true}>{banner.title}</Text>
                    <Text typography="t6">{banner.subTitle}</Text>
                  </Flex>
                  <Image src={banner.iconUrl} width={40} height={40} alt="" />
                </Flex>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
const bannerStyles = css`
  padding: 24px;
  border-radius: 8px;
`;

export const BannerSkeleton = () => {
  return (
    <div style={{ padding: 24 }}>
      <Skeleton width="100%" height={100} style={{ borderRadius: 8 }} />
    </div>
  );
};

export default withSuspense(EventBanners, {
  fallback: <BannerSkeleton />,
});
