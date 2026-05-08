import React from 'react';
import Button, { type ButtonProps } from './Button';

type PrimaryButtonProps = Omit<ButtonProps, 'variant'>;

export default function PrimaryButton({
  label,
  state,
  ...props
}: PrimaryButtonProps) {
  return <Button label={label} state={state} variant="primary" {...props} />;
}
