import { StarIcon } from "@heroicons/react/24/outline"
import { StarIcon as StartIconSolid } from "@heroicons/react/24/solid"

import clsx from "clsx"
export default function Estrella({ status }: { status: string }) {
    return (
        <button
            className={clsx(
                'inline-flex items-center rounded-full px-2 py-1 text-xs',
                {
                    'bg-gray-100 text-gray-500': status === 'no',
                    'bg-green-500 text-white': status === 'yes',
                }
            )}
        >
            {status === 'no' ? (
                <>
                <StarIcon className="w-4 text-gray-500" />
                </>
            ) :
                <>
                <StartIconSolid className="w-4 text-white" />
                </>
            }
        </button>
    )
}