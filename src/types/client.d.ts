interface HomeLayoutProps extends React.PropsWithChildren {
  footer: React.ReactNode;
  header: React.ReactNode;
}

interface DonateLayoutProps extends React.PropsWithChildren {
  footer: React.ReactNode;
  header: React.ReactNode;
}

// components

interface HeroProps {
  title: string;
  image: string;
  description: string;
  links?: Array<{ href: string; label: string }>;
}

interface ButtonProps {
  title: string;
  withIcon?: boolean;
  withShadow?: boolean;
  withBorder?: boolean;
  onClick?: () => void;
  iconClassName?: string;
  titleClassName?: string;
  shadowClassName?: string;
  containerClassName?: string;
}

// card components

interface SupportCardProps {
  index: number;
  delay: number;
  visible: boolean;
  support: SupportType;
}

interface DiscoverCardProps {
  index: number;
  delay: number;
  visible: boolean;
  discover: DiscoverType;
}

interface ScrollableType {
  sections: Array<{ id: string; label: string; component: React.ElementType }>;
}

type CombinedPost = Pick<
  SelectPost,
  "title" | "slug" | "content" | "updatedAt"
> & { tags: SelectTag[] };

type CombinedPostArray = CombinedPost[];
