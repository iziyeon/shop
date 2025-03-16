import { NavLink } from 'react-router-dom';

const navItems = [
  { name: 'Fashion', path: '/fashion' },
  { name: 'Accessories', path: '/accessories' },
  { name: 'Digital', path: '/digital' }
];

export default function Navigation() {
  return (
    <nav className="bg-gray-100 dark:bg-gray-700">
      <div className="container mx-auto">
        <ul className="flex space-x-8">
          {navItems.map(item => (
            <li key={item.path}>
              <NavLink 
                to={item.path}
                className={({ isActive }) =>
                  `block py-4 text-gray-600 dark:text-gray-300 hover:text-primary
                   ${isActive ? 'text-primary dark:text-primary' : ''}`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
