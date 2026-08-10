interface Props {
  isInvalid?: boolean;
  maxLines?: number;
  multiLine?: boolean;
}

export const useIOSModifiers = ({
  isInvalid,
  maxLines = 5,
  multiLine,
}: Props) => {
  return { invalidBorderModifiers, multiLineModifiers };
};
