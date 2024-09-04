// ** React Imports
import { Fragment, useEffect, memo, ReactNode } from 'react';

// ** Third Party Components
import classnames from 'classnames';

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux';
// Ajusta esto según cómo hayas definido tus tipos de estado y despachador
import { handleContentWidth, handleMenuCollapsed, handleMenuHidden } from '@store/layout';

// ** ThemeConfig
import themeConfig from '@configs/themeConfig';

// ** Styles
import 'animate.css/animate.css';
import { AppDispatch, RootState } from '@src/redux/store';

interface RouteMeta {
  contentWidth?: 'full' | 'boxed';
  menuCollapsed?: boolean;
  menuHidden?: boolean;
  className?: string;
  appLayout?: boolean;
}

interface LayoutWrapperProps {
  children: ReactNode;
  routeMeta?: RouteMeta;
}

const LayoutWrapper = (props: LayoutWrapperProps) => {
  // ** Props
  const { children, routeMeta } = props;

  // ** Store Vars
  const dispatch = useDispatch<AppDispatch>();
  const store = useSelector((state: RootState) => state);

  const navbarStore = store.navbar;
  const layoutStored = store.layout.layout;
  const contentWidth = store.layout.contentWidth;

  // ** Vars
  const appLayoutCondition =
    (layoutStored === 'horizontal' && !routeMeta) ||
    (layoutStored === 'horizontal' && routeMeta && !routeMeta.appLayout);
  const Tag = appLayoutCondition ? 'div' : Fragment;

  // ** Clean Up Function
  const cleanUp = () => {
    if (routeMeta) {
      if (routeMeta.contentWidth && routeMeta.contentWidth === store.layout.contentWidth) {
        dispatch(handleContentWidth(themeConfig.layout.contentWidth));
      }
      if (routeMeta.menuCollapsed && routeMeta.menuCollapsed === store.layout.menuCollapsed) {
        dispatch(handleMenuCollapsed(!store.layout.menuCollapsed));
      }
      if (routeMeta.menuHidden && routeMeta.menuHidden === store.layout.menuHidden) {
        dispatch(handleMenuHidden(!store.layout.menuHidden));
      }
    }
  };

  // ** ComponentDidMount
  useEffect(() => {
    if (routeMeta) {
      if (routeMeta.contentWidth && routeMeta.contentWidth !== store.layout.contentWidth) {
        dispatch(handleContentWidth(routeMeta.contentWidth));
      }
      if (routeMeta.menuCollapsed && routeMeta.menuCollapsed !== store.layout.menuCollapsed) {
        dispatch(handleMenuCollapsed(routeMeta.menuCollapsed));
      }
      if (routeMeta.menuHidden && routeMeta.menuHidden !== store.layout.menuHidden) {
        dispatch(handleMenuHidden(routeMeta.menuHidden));
      }
    }
    return () => cleanUp();
  }, [routeMeta, dispatch, store.layout]);

  return (
    <div
      className={classnames('app-content content overflow-hidden', {
        [routeMeta?.className ?? '']: routeMeta?.className,
        'show-overlay': navbarStore.query.length,
      })}
    >
      <div className='content-overlay'></div>
      <div className='header-navbar-shadow' />
      <div
        className={classnames({
          'content-wrapper': routeMeta && !routeMeta.appLayout,
          'content-area-wrapper': routeMeta && routeMeta.appLayout,
          'container-xxl p-0': contentWidth === 'boxed',
        })}
      >
        <Tag {...(appLayoutCondition ? { className: 'content-body' } : {})}>{children}</Tag>
      </div>
    </div>
  );
};

export default memo(LayoutWrapper);
