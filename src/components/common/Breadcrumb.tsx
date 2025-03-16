import { Link } from 'react-router-dom';
import type { BreadcrumbItem } from '@/types/route';

interface Props {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: Props) => {
  return (
    <nav className="flex mb-4" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={item.path} className="flex items-center">
            {index > 0 && <span className="mx-2">/</span>}
            {index === items.length - 1 ? (
              <span className="text-gray-500">{item.label}</span>
            ) : (
              <Link to={item.path} className="hover:text-blue-500">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
