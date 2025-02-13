import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface MobileNavProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ open, setOpen }) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-col overflow-y-auto bg-gray-800 pb-12">
              <div className="flex px-4 pb-2 pt-5">
                <motion.button
                  type="button"
                  className="-m-2.5 inline-flex items-center justify-center rounded-md text-gray-400"
                  onClick={() => setOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </motion.button>
              </div>
              <div className="mt-2">
                <div className="space-y-2 px-2">
                  <Link
                    to="/"
                    className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-600"
                    onClick={() => setOpen(false)}
                  >
                    قوانین اصلی
                  </Link>
                  <Link
                    to="/job-rules"
                    className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-600"
                    onClick={() => setOpen(false)}
                  >
                    قوانین شغل ها
                  </Link>
                  <Link
                    to="/robbery-rules"
                    className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-600"
                    onClick={() => setOpen(false)}
                  >
                    قوانین رابری
                  </Link>
                  <Link
                    to="/gang-rules"
                    className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-600"
                    onClick={() => setOpen(false)}
                  >
                    قوانین گنگ ها
                  </Link>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default MobileNav;
