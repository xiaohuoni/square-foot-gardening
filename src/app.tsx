import type {
  NavBarListItem,
  NavBarProps,
  ResponseError,
  TabBarListItem,
  TabBarProps,
  TitleListItem,
} from 'alita';
import {
  AppOutline,
  EyeFill,
  EyeOutline,
  MessageFill,
  MessageOutline,
} from 'antd-mobile-icons';

export const request = {
  errorHandler: (error: ResponseError) => {
    // 集中处理错误
    console.log(11111111);
    console.log(error);
  },
};

const titleList: TitleListItem[] = [
  {
    pagePath: '/',
    title: '首页',
  },
  {
    pagePath: '/q',
    title: '消息',
  },
];
const navList: NavBarListItem[] = [
  {
    pagePath: '/',
    navBar: {},
  },
  {
    pagePath: '/q',
    navBar: {},
  },
];
const navBar: NavBarProps = {
  navList,
  fixed: false,
  onLeftClick: () => {
    // router.goBack();
  },
};
const tabList: TabBarListItem[] = [
  {
    pagePath: '/',
    text: '设计',
    icon: <AppOutline />,
    // iconPath: ListGary,
    // selectedIconPath: ListBlue,
    title: '设计',
    iconSize: '',
    badge: '',
  },
  {
    pagePath: '/q',
    text: '消息',
    // @ts-ignore
    icon: (active: boolean) => (active ? <MessageFill /> : <MessageOutline />),
    // iconPath: SetGary,
    // selectedIconPath: SetBlue,
    title: '消息',
    iconSize: '',
    badge: '',
  },
  {
    pagePath: '/vision',
    text: '视觉',
    // @ts-ignore
    icon: (active: boolean) => (active ? <EyeFill /> : <EyeOutline />),
    // iconPath: SetGary,
    // selectedIconPath: SetBlue,
    title: '视觉',
    iconSize: '',
    badge: '',
  },
];

const tabBar: TabBarProps = {
  color: `#999999`,
  selectedColor: '#FF4500',
  borderStyle: 'white',
  position: 'bottom',
  list: tabList,
};

export const mobileLayout = {
  documentTitle: 'sfg',
  navBar,
  tabBar,
  titleList,
  // customHeader:<div>asdasdassaasd</div>
};

export async function getKeepAlive(keepaliva: any[]) {
  console.log('getKeepAlive');
  console.log(keepaliva);
  return [/./];
}
