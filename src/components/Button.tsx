import { Pressable, Text, StyleSheet } from 'react-native';
import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'default' | 'small';
  childs: string | React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
}

export default function Button({
  variant = 'primary',
  size = 'default',
  childs,
  onPress,
  disabled = false,
}: ButtonProps) {
  const isDisabled = disabled || !onPress;
  const variantStyles = variants[variant];
  const sizeStyles = sizes[size];

  return (
    <Pressable
      style={[
        styles.base,
        sizeStyles.container,
        variantStyles.container,
        isDisabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={isDisabled}
    >
      {typeof childs === 'string' ? (
        <Text style={[styles.text, sizeStyles.text, variantStyles.text, isDisabled && styles.disabledText]}>
          {childs}
        </Text>
      ) : (
        childs
      )}
    </Pressable>
  );
}

const sizes = {
  default: {
    container: { paddingVertical: 14, minHeight: 54 },
    text: { fontSize: 16 },
  },
  small: {
    container: { paddingVertical: 8, paddingHorizontal: 14, minHeight: 40 },
    text: { fontSize: 14 },
  },
};

const variants = {
  primary: {
    container: { backgroundColor: '#007AFF' },
    text: { color: '#fff', fontWeight: '700' },
  },
  secondary: {
    container: { backgroundColor: '#E5E5EA' },
    text: { color: '#000', fontWeight: '700' },
  },
  danger: {
    container: { backgroundColor: '#FF3B30' },
    text: { color: '#fff', fontWeight: '700' },
  },
  outline: {
    container: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#007AFF' },
    text: { color: '#007AFF', fontWeight: '700' },
  },
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    textAlign: 'center',
  },
  disabledText: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
});
