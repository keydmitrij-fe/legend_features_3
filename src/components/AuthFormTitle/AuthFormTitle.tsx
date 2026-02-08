import { FC } from 'react';
import { Typography } from 'antd';

type AuthFormTitleProps = {
  title: string;
  description: string;
};

const AuthFormTitle: FC<AuthFormTitleProps> = (props) => {
  const { title, description } = props;

  return (
    <>
      <Typography.Title level={2}>{title}</Typography.Title>
      <Typography.Paragraph>{description}</Typography.Paragraph>
    </>
  );
};

export default AuthFormTitle;
