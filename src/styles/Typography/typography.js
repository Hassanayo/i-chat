import styled from "styled-components";
import colors from "../Colors/colors";

export const Semibold16 = styled.h3`
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: ${({ color }) => color ?? colors.richBlack};
`;
export const Regular16 = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: ${({ color }) => color ?? colors.navyGrey};
`;
export const Regular14 = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: ${({ color }) => color ?? colors.navyGrey};
`;
export const Regular12 = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: ${({ color }) => color ?? colors.navyGrey};
  display: flex;
  align-items: center;
`;
export const FlexBox = styled.div`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  gap: ${({ gap }) => gap};
  flex-direction: ${({ flexDirection }) => flexDirection};
`;
