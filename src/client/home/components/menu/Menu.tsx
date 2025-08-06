import menu from '../../assets/menu.png';
import close from '../../assets/close.png';
import React, { FC, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { openMenu, createLinks } from './menuSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Links } from '../../../../types';
import CartIcon from '../../../cart/CartIcon';
import { Link } from 'react-router-dom';

const Menu: FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.menu.isOpen);
  const menuLinks = useSelector((state: RootState) => state.menu.links);
  const links = [
    { id: 1, link: '/', name: 'Homepage' },
    { id: 2, link: '/menu', name: 'Menu' },
    { id: 3, link: '/cart', name: 'Cart' },
  ];
  useEffect(() => {
    if (Object.keys(menuLinks).length === 0) dispatch(createLinks(links));
  }, [dispatch, menuLinks]);
  //   console.log(isOpen);
  return (
    <>
      <div>
        <motion.button
          whileTap={{ rotate: 540, scale: 0.5 }}
          onClick={() => dispatch(openMenu(isOpen))}
        >
          {isOpen === false ? (
            <img src={menu} alt='Menu' width={20} height={20} />
          ) : (
            <img src={close} alt='close' width={15} height={15} />
          )}
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              transition={{ type: 'tween' }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className='bg-[#DB162F] text-white absolute left-0 top-16 w-full h-[calc(100vh-3rem)] flex flex-col gap-8 items-start justify-center z-10 px-4 overflow-hidden'
            >
              {Object.values(menuLinks).map((link: Links) => (
                <div className='flex flex-row justify-between gap-4 hover:underline'>
                  {link.name === 'Cart' ? (
                    <CartIcon />
                  ) : (
                    <Link
                      key={link.id}
                      to={link.link}
                      onClick={() => dispatch(openMenu(isOpen))}
                    >
                      {link.name}
                    </Link>
                  )}
                  {/* <a key={link.id} href={link.link}>
              {link.name}
            </a> */}
                  {/* {link.icon ? (
              <img src={cart} width={20} height={20} alt='Cart'></img>
            ) : (
              <></>
            )} */}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Menu;
