import { DemoBlock } from '@/components/Block';
import { getItem, setItem } from '@/utils/l';
import { Content, Page } from '@alita/flow';
import { AppLauncher } from '@capacitor/app-launcher';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { setPageNavBar, useLocation } from 'alita';
import {
  Button,
  Card,
  ErrorBlock,
  Image,
  List,
  Modal,
  Popup,
  Swiper,
  Toast,
} from 'antd-mobile';
import { MoreOutline, RightOutline } from 'antd-mobile-icons';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { query } from './service';
interface VisionPageProps {}
const LOCAL_KEY = 'sfg-local-list-key';
const openPortfolioPage = async (url: string) => {
  await AppLauncher.openUrl({ url });
};
const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 10,
    allowEditing: true,
    saveToGallery: true,
    resultType: CameraResultType.Base64,
    promptLabelCancel: '取消',
    promptLabelHeader: '视觉',
    promptLabelPhoto: '相册',
    promptLabelPicture: '拍照',
  });

  // image.webPath will contain a path that can be set as an image src.
  // You can access the original file using image.path, which can be
  // passed to the Filesystem API to read the raw data of the image,
  // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
  return image.base64String?.toString();
};

const VisionPage: FC<VisionPageProps> = () => {
  const [img, setImg] = useState<any>();
  const [swiperItem, setSwiperItem] = useState<any>(0);
  const [showPop, setShowPop] = useState(false);
  const [loading, setLoading] = useState<any>(false);
  const [data, setData] = useState<any>({});
  const [show, setShow] = useState<any>([]);
  const location = useLocation();

  const init = async () => {
    const local: any = await getItem(LOCAL_KEY);
    if (local && local[Object.keys(local)[0] as any]) {
      const thisShow = local[Object.keys(local)[0] as any];
      setImg(`data:image/jpeg;base64,${thisShow?.img}`);
      setShow(thisShow);
      setData(local);
    }
  };
  useEffect(() => {
    init();
    setPageNavBar({
      pagePath: location.pathname,
      navBar: {
        rightContent: <MoreOutline onClick={() => setShowPop(true)} />,
      },
    });
  }, []);
  return (
    <Page>
      {img && (
        <>
          <Image src={img} height={200} fit="cover" />
          <DemoBlock />
        </>
      )}
      <Content>
        {!show?.result && (
          <ErrorBlock
            fullPage
            title={<span>很高兴认识你</span>}
            description={<span>点击下方的按钮试试吧</span>}
          />
        )}
        {show && show?.result && (
          <>
            <Swiper
              defaultIndex={swiperItem}
              onIndexChange={(index) => setSwiperItem(index)}
            >
              {show?.result?.map((i: any, index: any) => (
                <Swiper.Item key={index}>
                  <Image src={i?.baike_info?.image_url} fit="contain" />
                </Swiper.Item>
              ))}
            </Swiper>
            {show?.result && (
              <Card
                extra={<RightOutline />}
                style={{ borderRadius: '16px' }}
                title={
                  <span
                    onClick={() => {
                      openPortfolioPage(
                        'https://baike.baidu.com/item/' +
                          show?.result[swiperItem]?.name,
                      );
                    }}
                  >
                    {show?.result[swiperItem]?.name +
                      show?.result[swiperItem]?.score}
                  </span>
                }
              >
                {show?.result[swiperItem]?.baike_info?.description}
              </Card>
            )}
          </>
        )}
      </Content>

      <Button
        block
        onClick={async () => {
          setLoading(true);
          try {
            let img = await takePicture();
            setImg(`data:image/jpeg;base64,${img}`);
            // 原生平台需要 encode
            if (Capacitor.isNativePlatform()) {
              img = encodeURIComponent(img || '');
            }
            Toast.show({
              icon: 'loading',
              content: '让我来看看这是什么呢',
              maskClickable: false,
              duration: 0,
            });
            const dd = await query({
              image: img,
              baike: 3,
            });
            // 原生和 web 的返回结构不同
            const res = dd?.data ?? dd;
            if (res && res?.result && res?.result?.[0]) {
              const newData = {
                result: res?.result,
                img,
                name: res?.result?.[0]?.name,
                time: new Date().getTime(),
              };
              setData((oldData) => {
                oldData[newData.name] = newData;
                setItem(LOCAL_KEY, JSON.stringify(oldData));
                return oldData;
              });
              setShow(newData);
            }
          } catch (error) {
            console.log(error);
            Modal.alert({
              content: '遇到了点问题，我找不到相关信息',
              onConfirm: () => {},
            });
          } finally {
            setLoading(false);
            Toast.clear();
          }
        }}
        loading={loading}
        color="primary"
        size="large"
      >
        点我提交
      </Button>
      {showPop && (
        <Popup
          visible={showPop}
          onMaskClick={() => {
            setShowPop(false);
          }}
          position="right"
          bodyStyle={{ width: '60vw' }}
        >
          <List>
            <List.Item key={-2}>安全标题</List.Item>
            {Object.keys(data).map((item, index) => (
              <List.Item
                key={index}
                onClick={() => {
                  setShow(data[item]);
                  setSwiperItem(0);
                  setShowPop(false);
                  setImg(`data:image/jpeg;base64,${data[item]?.img}`);
                }}
              >
                {item}
              </List.Item>
            ))}
          </List>
          <Button
            block
            onClick={() => {
              setItem(LOCAL_KEY, JSON.stringify([]));
              setData({});
              setShow({});
              setShowPop(false);
              setImg('');
            }}
            color="primary"
            size="large"
          >
            清空记录
          </Button>
        </Popup>
      )}
    </Page>
  );
};

export default VisionPage;
