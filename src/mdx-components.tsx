import type { MDXComponents } from 'mdx/types';
import Image, { type ImageProps } from 'next/image';
import Link from 'next/link';

// Global component map for all MDX content. Required by @next/mdx in the App Router.
const components: MDXComponents = {
  img: ({ alt = '', ...props }) => (
    <Image
      alt={alt}
      sizes="100vw"
      width={1200}
      height={630}
      style={{ width: '100%', height: 'auto' }}
      {...(props as ImageProps)}
    />
  ),
  a: ({ href = '', children, ...rest }) => {
    const isInternal = href.startsWith('/') || href.startsWith('#');
    if (isInternal) {
      return (
        <Link href={href} {...rest}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  },
};

export function useMDXComponents(): MDXComponents {
  return components;
}
