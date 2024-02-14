import addDelimiter from '@/utils/addDelimiter';
import Text from './Text';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { memo } from 'react';
interface CreditScoreProps {
  score: number;
  width?: number;
  height?: number;
}

const CreditScoreChart = ({
  score,
  width = 100,
  height = 100,
}: CreditScoreProps) => {
  return (
    <Container width={width} height={height}>
      <div style={{ width, height, backgroundColor: 'red' }} />
      <Text bold={true} css={textStyles} typography="t6">
        {addDelimiter(score)}
      </Text>
    </Container>
  );
};
const Container = styled.div<{ width: number; height: number }>(
  ({ width, height }) => ({
    position: 'relative',
    width,
    height,
  })
);

const textStyles = css`
  position: absolute;
  bottom: 25%;
  transform: translateX(-50%);
  left: 50%;
`;

export default memo(CreditScoreChart);
