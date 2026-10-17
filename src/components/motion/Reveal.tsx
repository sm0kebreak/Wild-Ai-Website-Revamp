import React from 'react';

interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  delay?: number;
  as?: React.ElementType;
}

/** Renders its children immediately. Page scroll does not fade or delay them. */
const Reveal = ({ as, delay: _delay, style, children, ...rest }: RevealProps) => {
  const Tag = (as ?? 'div') as React.ElementType;
  return (
    <Tag style={style} {...rest}>
      {children}
    </Tag>
  );
};

export default Reveal;
