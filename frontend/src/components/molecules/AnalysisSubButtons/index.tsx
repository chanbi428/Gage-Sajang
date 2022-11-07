import React from 'react';
import styled from 'styled-components';
import { cs1, cs2, cs3 } from '../../../data/cs';
import { useNavigate } from 'react-router-dom';

interface AnalysisSubButtonsProps {
  tab: number;
  subCategory: number;
}

const AnalysisSubButtons = ({ tab, subCategory }: AnalysisSubButtonsProps) => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      {tab === 1 &&
        cs1.map((e: string, i: number) => (
          <SubButton
            key={`cs1-${i + 1}`}
            onClick={() =>
              navigate(`/analysis?mainCategory=1&subCategory=${i + 1}`, {
                replace: true,
              })
            }
            active={subCategory === i + 1}
          >
            {e}
          </SubButton>
        ))}
      {tab === 2 &&
        cs2.map((e: string, i: number) => (
          <SubButton
            key={`cs2-${i + 1}`}
            onClick={() =>
              navigate(`/analysis?mainCategory=2&subCategory=${i + 1}`, {
                replace: true,
              })
            }
            active={subCategory === i + 1}
          >
            {e}
          </SubButton>
        ))}
      {tab === 3 &&
        cs3.map((e: string, i: number) => (
          <SubButton
            key={`cs3-${i + 1}`}
            onClick={() =>
              navigate(`/analysis?mainCategory=3&subCategory=${i + 1}`, {
                replace: true,
              })
            }
            active={subCategory === i + 1}
          >
            {e}
          </SubButton>
        ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  align-content: flex-start;
  padding-right: 10px;
  height: 0;
  flex-grow: 1;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #2f3542;
    border-radius: 6px;

    background-clip: padding-box;
    border: 0px solid transparent;
  }
  &::-webkit-scrollbar-track {
    background-color: grey;
    border-radius: 6px;
    box-shadow: inset 0px 0px 5px white;
  }
`;

interface SubButtonProps {
  active?: boolean;
}

const SubButton = styled.button<SubButtonProps>`
  width: 6.5rem;
  height: 2.5rem;
  font-size: 0.9rem;
  border-radius: 8px;
  border: ${({ active, theme }) =>
    active ? `2px solid ${theme.darkColor}` : '1px solid darkgray'};
  color: ${({ active, theme }) => (active ? theme.darkColor : '#000')};
  font-family: 'Pretendard-Regular';
  letter-spacing: 2px;
  background: transparent;
  &:hover {
    cursor: pointer;
    border: ${({ theme }) => `2px solid ${theme.darkColor}`};
  }
`;

export default AnalysisSubButtons;
