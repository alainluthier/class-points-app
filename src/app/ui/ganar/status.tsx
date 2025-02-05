import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function CheckStatus({ status,texto,hidden }: { status: string,texto:string, hidden:boolean }) {
  return (
    <button
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': status === 'no',
          'bg-green-500 text-white': status === 'yes',
        },
        {
          'visibility: visible': hidden == true,
          'visibility: hidden': hidden == false,
        }
      )}
    >
      {status === 'no' ? (
        <>
          {texto}
          <XMarkIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'yes' ? (
        <>
          {texto}
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </button>
  );
}
