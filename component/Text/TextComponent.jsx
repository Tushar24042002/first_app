import React from 'react';
import { Text } from 'react-native';

const TextComponent = ({ type = 'paragraph', children }) => {
  let style;

  switch (type) {
    case 'h1':
      style = { fontSize: 32, fontWeight: 'bold' };
      break;
    case 'h2':
      style = { fontSize: 28, fontWeight: 'bold' };
      break;
    case 'h3':
      style = { fontSize: 24, fontWeight: 'bold' };
      break;
    case 'h4':
      style = { fontSize: 20, fontWeight: 'bold' };
      break;
    case 'h5':
      style = { fontSize: 16, fontWeight: 'bold' };
      break;
    case 'h6':
      style = { fontSize: 14, fontWeight: 'bold' };
      break;
    default:
      style = { fontSize: 16 };
      break;
  }

  return <Text style={style}>{children}</Text>;
};

export default TextComponent;
