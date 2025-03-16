export interface CategoryParams {
  category: string;
}

export interface ProductParams {
  id: string;
}

export interface RouteParams {
  category?: string;
  id?: string;
}

export interface NavigationProps {
  to: string;
  children: React.ReactNode;
}

export interface BreadcrumbItem {
  label: string;
  path: string;
}
