import styled from "styled-components";

// Screen size breakpoints in pixels
export const MOBILE = {
  min: 0,
  max: 767
}

export const TABLET = {
  min: 768,
  max: 1024
}

export const DESKTOP = {
  min: 1025,
  max: Infinity
}

export const Red = "#b20d30"
export const Brown = "#a44200"
export const Blue = "#2274a5"

export const Paragraph = styled.p`
  font-weight: 400;
  font-style: normal;
  margin: 0;
  padding-bottom: 10px;
  font-size: 20px;
  line-height: 14px;

  @media (min-width: ${TABLET.min}px) {
    font-size: 24px;
  }
`;

export const H1 = styled.h1 `
  font-family: "Ewert", serif;
  font-weight: 400;
  font-style: normal;
  margin: 0;
  padding-bottom: 10px;
  font-size: 40px;

  @media (min-width: ${TABLET.min}px) {
    font-size: 80px;
  }
`

export const H2 = styled.h2`
  font-weight: 700;
  margin: 0;
  padding-bottom: 10px;
  font-size: 20px;

  @media (min-width: ${TABLET.min}px) {
    font-size: 30px;
  }
`;

export const H3 = styled.h3`
  font-weight: 500;
  margin: 0;
  padding-bottom: 10px;
  font-size: 16px;

  @media (min-width: ${TABLET.min}px) {
    font-size: 24px;
  }
`;

export const H4 = styled.h4`
  font-weight: 500;
  margin: 0;
  padding-bottom: 10px;
  font-size: 18px;
`;

// export const Link = styled.a`
//   text-decoration: none;

//   &:hover {
//     color: ${Colors.alabaster};
//   }
// `
