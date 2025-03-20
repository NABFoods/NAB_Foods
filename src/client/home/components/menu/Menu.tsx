import menu from '../../assets/menu.png';
import close from '../../assets/close.png';
import React, { FC, useEffect } from 'react';
import { openMenu, createLinks } from './menuSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Link } from '../../../../types';
import CartIcon from '../../../cart/CartIcon';

const Menu: FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.menu.isOpen);
  const menuLinks = useSelector((state: RootState) => state.menu.links);
  const links = [
    { id: 1, link: '/', name: 'Homepage' },
    { id: 2, link: '/cart', name: 'Cart' },
  ];
  useEffect(() => {
    if (Object.keys(menuLinks).length === 0) dispatch(createLinks(links));
  }, [dispatch, menuLinks]);
  //   console.log(isOpen);
  return (
    <div>
      <button onClick={() => dispatch(openMenu(isOpen))}>
        {isOpen === false ? (
          <img src={menu} alt='Menu' width={20} height={20} />
        ) : (
          <img src={close} alt='close' width={15} height={15} />
        )}
      </button>

      {isOpen && (
        <div className='bg-[#DB162F] text-white absolute left-0 top-12 w-full h-[calc(100vh-3rem)] flex flex-col gap-8 items-start justify-center z-10 px-4 overflow-hidden'>
          {Object.values(menuLinks).map((link: Link) => (
            <div className='flex flex-row justify-between gap-4'>
              {link.name === 'Cart' ? (
                <CartIcon />
              ) : (
                <a
                  key={link.id}
                  href={link.link}
                  onClick={() => dispatch(openMenu(isOpen))}
                >
                  {link.name}
                </a>
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
        </div>
      )}
    </div>
  );
};

export default Menu;
