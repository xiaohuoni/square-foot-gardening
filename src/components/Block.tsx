import type { FC, ReactNode } from 'react';

interface Props {
  title?: string;
  padding?: string;
  background?: string;
  children?: ReactNode;
}

export const DemoBlock: FC<Props> = (props) => {
  return (
    <div style={{ marginBottom: '12px' }}>
      {props.title && (
        <div
          style={{
            padding: '12px 12px 8px',
            color: ' #697b8c',
            fontSize: '14px',
          }}
        >
          {props.title}
        </div>
      )}
    </div>
  );
};

DemoBlock.defaultProps = {
  padding: '0',
  background: 'var(--adm-color-background)',
};
