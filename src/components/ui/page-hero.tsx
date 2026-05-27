import Image from 'next/image';

type Props = {
  src: string;
  alt: string;
  eyebrow: string;
  title: string;
  description?: string;
  height?: 'sm' | 'md' | 'lg';
};

const heights = {
  sm: 'h-56 md:h-72',
  md: 'h-72 md:h-96',
  lg: 'h-80 md:h-[28rem]',
};

export function PageHero({ src, alt, eyebrow, title, description, height = 'md' }: Props) {
  return (
    <div className={`relative w-full ${heights[height]} overflow-hidden border-b border-border`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
      <div className="relative z-10 h-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-end pb-10 md:pb-14">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">
            {eyebrow}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">{title}</h1>
          {description && (
            <p className="text-text-2 leading-relaxed">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
