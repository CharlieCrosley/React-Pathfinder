import styled, { keyframes, css } from "styled-components";

const visitedAnimationKeyframes = keyframes`
    0% {
      transform: scale(0.7);
      background-color: rgba(0, 0, 66, 0.75);
    }
  
    50% {
      background-color: rgba(17, 104, 217, 0.75);
    }
  
    75% {
      transform: scale(1.1);
      background-color: rgba(0, 217, 159, 0.75);
    }
  
    100% {
      transform: scale(1);
      background-color: rgba(0, 190, 218, 0.75);
    }
`;

const placeWallKeyframes = keyframes`
    0% {
      transform: scale(1);
    }
  
    75% {
      transform: scale(1.1);
    }
  
    100% {
      transform: scale(1);
    }
`;

const shortestPathKeyframes = keyframes`
    0% {
      transform: scale(0.6);
      background-color: rgb(255, 254, 106);
    }
  
    50% {
      transform: scale(1.2);
      background-color: rgb(255, 254, 106);
    }
  
    100% {
      transform: scale(1);
      background-color: rgb(255, 254, 106);
    }
`;

const placeWallAnimation = css`
    animation-name: ${placeWallKeyframes};
    animation-duration: 0.3s;
    animation-timing-function: ease-out;
    animation-fill-mode: backwards;
    background-color: rgb(12, 53, 71);
`;

export const visitedAnimation = css`
    animation-name: ${visitedAnimationKeyframes};
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
    animation-delay: ${(props) => props.visitedAnimationDelay};
`;

const shortestPathAnimation = css`
    animation-name: ${visitedAnimationKeyframes}, ${shortestPathKeyframes};
    animation-duration: 1s, 1.5s;
    animation-timing-function: linear, ease-out;
    animation-fill-mode: forwards, forwards;
    animation-delay: ${(props) => props.visitedAnimationDelay},
        ${(props) => props.shortestPathAnimationDelay};
`;

export const GridNode = styled.div.attrs((props) => ({
    style: {
        className: "node " + (props.isWall ? "node-wall" : ""),
    },
}))`
    position: relative;
    width: 24px;
    height: 24px;
    min-width: 24px;
    border: 1px solid rgb(175, 216, 248);

    /* stop nodes dragging when holding click */
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
`;

export const StartIcon = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    display: ${({ show }) => (show ? "flex" : "none")};
    right: 1px;
    font-size: 22px;
    cursor: grab;
`;

export const FinishIcon = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    display: ${({ show }) => (show ? "flex" : "none")};
    top: 1px;
    left: 1px;
    font-size: 20px;
    cursor: grab;
`;
