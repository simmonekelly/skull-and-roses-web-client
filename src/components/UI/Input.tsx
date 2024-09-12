import React from "react";
import styled from "styled-components";
// import TextField from '@mui/material/TextField';

type InputProps = {
  handleOnChange: (value: string) => void;
  placeholderText: string;
};

export const Input: React.FC<InputProps> = ({
  handleOnChange,
  placeholderText,
}) => {
  return (
    <StyledInput
      placeholder={placeholderText}
      onChange={(e) => handleOnChange(e.target.value)}
    />
  );
};

const StyledInput = styled.input`
  border: 1px solid rgba(178, 13, 48, 0.5);
  padding: 10px;
  border-radius: 4px;
`;

// export const Input: React.FC = () => {
//   return (
//     <TextField id="outlined-basic" label="Outlined" variant="outlined" />

//   );
// };
