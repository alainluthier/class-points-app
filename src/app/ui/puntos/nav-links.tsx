'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
  HomeIcon,
  CurrencyDollarIcon,
  CreditCardIcon,
  StarIcon
} from '@heroicons/react/24/outline';
// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  {name: 'Resumen', href: '/puntos', icon: HomeIcon },
  {name: 'Ganar Puntos', href: '/puntos/ganar', icon: CurrencyDollarIcon },
  {name: 'Estrellas',href: '/puntos/estrella',icon: StarIcon},
  {name: 'Gastar Puntos',href: '/puntos/gastar',icon: CreditCardIcon},
];
export default function NavLinks({role}:{role:string}) {
  const pathname = usePathname();
  return (
    <>      
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
              {
                'hidden': role=='Maestro' && link.name=='Estrellas'
              },
              {
                'hidden': role!='Maestro' && (link.name=='Ganar Puntos')
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
