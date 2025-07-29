interface SupportType {
  title: string;
  bgColor: string;
  buttonText: string;
  description: string;
  href: string;
  titleHighlight: string;
}

interface DiscoverType {
  title: string;
  content: string;
}

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
