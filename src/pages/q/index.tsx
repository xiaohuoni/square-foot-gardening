import { MessagesList } from '@/components/MessagesList';
import { Content, Page } from '@alita/flow';
import { sendOpenAI } from 'alita';
import { Button, ErrorBlock, Form, TextArea } from 'antd-mobile';
import { useEffect, useState, type FC } from 'react';
interface QPageProps {}
const LOCAL_KEY = 'sfg-local-key';
const system = '你是虎博士，一位从事农业生产工作50年的植物学博士';
const QPage: FC<QPageProps> = () => {
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hiddenBusy, setHiddenBusy] = useState(true);
  const [form] = Form.useForm();
  useEffect(() => {
    const local = localStorage.getItem(LOCAL_KEY);
    if (local) {
      setList(JSON.parse(local));
    }
  }, []);
  return (
    <Page>
      <Form
        form={form}
        layout="horizontal"
        onFinish={async ({ q }) => {
          setLoading(true);
          setHiddenBusy(true);
          const mesage = [
            {
              role: 'user',
              content: q,
            },
          ];
          // @ts-ignore
          const result = await sendOpenAI(mesage, system);
          if (result.choices[0]!.message?.content) {
            form.resetFields();
            setList((list) => {
              const n = [result.choices[0]!.message, ...mesage, ...list];
              localStorage.setItem(LOCAL_KEY, JSON.stringify(n));
              return n;
            });
          } else {
            setHiddenBusy(false);
          }
          setLoading(false);
        }}
        footer={
          <Button
            block
            type="submit"
            color="primary"
            size="large"
            loading={loading}
          >
            提交
          </Button>
        }
      >
        {/* <Form.Header>水平布局表单</Form.Header> */}
        <Form.Item
          name="q"
          label="交流"
          help="我是虎博士，一位从事农业生产工作50年的植物学博士"
        >
          <TextArea
            placeholder="你想对我说什么呢"
            maxLength={300}
            rows={4}
            readOnly={loading}
            showCount
          />
        </Form.Item>
      </Form>
      <div hidden={hiddenBusy}>
        <ErrorBlock status="busy" />
      </div>
      <Content>
        <MessagesList messages={list} />
      </Content>
    </Page>
  );
};

export default QPage;
