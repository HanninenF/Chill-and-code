import React from 'react';
import Button, { type ButtonProps, type ButtonVariant } from './Button';

type LevelButtonProps = Omit<ButtonProps, 'variant'> & {
  level: Extract<ButtonVariant, 'city' | 'beach' | 'park'>;
};

export default function LevelButton({ level, ...props }: LevelButtonProps) {
  return <Button variant={level} {...props} />;
}
