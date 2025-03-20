import menu from '../../assets/menu.png';
import close from '../../assets/close.png';
import React, { FC, useEffect } from 'react';
import { openMenu, createLinks } from './menuSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Link } from '../../../../types';

const Menu: FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.menu.isOpen);
  const menuLinks = useSelector((state: RootState) => state.menu.links);
  const links = [
    { id: 1, link: '/', name: 'Homepage' },
    { id: 2, link: '/cart', name: 'Cart' },
  ];
  useEffect(() => {
    dispatch(createLinks(links));
  }, [dispatch]);
  console.log(isOpen);
  return (
    <div>
      <button onClick={() => dispatch(openMenu(isOpen))}>
        {isOpen === false ? (
          <img src={menu} alt='Menu' width={20} height={20} />
        ) : (
          <img src={close} alt='close' width={15} height={15} />
        )}
      </button>
      <div className='bg-[#DB162F] text-white absolute left-0 top-12'>
        {Object.values(menuLinks).map((link: Link) => (
          <a key={link.id} href={link.link}>
            {link.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Menu;
