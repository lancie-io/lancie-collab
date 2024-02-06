import { cn } from '@/lib/utils';
import React, { ElementType, FC, HTMLAttributes } from 'react';

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: React.ReactNode;
  semi?: boolean;
  mega?: boolean;
}

const HeadingTag: FC<{
  as: ElementType<HTMLAttributes<HTMLHeadingElement>>;
  semi: boolean;
  mega: boolean;
  props: HTMLAttributes<HTMLHeadingElement>;
}> = ({ as: Component, props, mega, semi }) => {
  const { className, ...rest } = props;
  return (
    <Component
      className={cn(
        'text-2xl font-bold',
        className,
        mega && 'tracking-[-0.04em] font-extrabold leading-[1.1]',
        semi && 'font-semibold'
      )}
      {...rest}
    />
  );
};

const Title: FC<TitleProps> = ({
  children,
  as = 'h1',
  semi = false,
  mega = false,
  ...props
}) => {
  return (
    <HeadingTag
      as={as}
      props={{ children, ...props }}
      semi={semi}
      mega={mega}
    />
  );
};

export default Title;
