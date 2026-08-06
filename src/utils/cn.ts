
import { extendTailwindMerge } from 'tailwind-merge';
import {
  cx,
  tv as tvBase,
  type CnOptions,
  type TV,
  type TWMergeConfig
} from 'tailwind-variants';

export const twMergeConfig: TWMergeConfig = {
  classGroups: {
    'opacity': [{ opacity: ['disabled'] }],
    'border-w': [{ border: ['field-width'] }],
  },
};

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: twMergeConfig.classGroups,
  },
});


export function cn(...args: CnOptions) {
  const merged = cx(args);

  if (!merged) {
    return merged;
  }

  return twMerge(merged);
}

/**
 * HeroUI Native `tv` with {@link twMergeConfig} merged on every call.
 *
 * @see https://www.tailwind-variants.org/docs/config#advanced-custom-tv-wrapper
 */
export const tv: TV = (options, config) =>
  tvBase(options, {
    ...config,
    twMerge: config?.twMerge ?? true,
    twMergeConfig: {
      ...config?.twMergeConfig,
      classGroups: {
        ...config?.twMergeConfig?.classGroups,
        ...twMergeConfig.classGroups,
      },
    },
  });
