import { Table } from 'antd';
import { FC } from 'react';
import { User } from '../../types/usersTypes.ts';
import { ColumnsType } from 'antd/es/table';

const columns: ColumnsType<User> = [
  {
    title: 'Имя пользователя',
    dataIndex: 'username',
  },
  {
    title: 'Email пользователя',
    dataIndex: 'email',
  },
  {
    title: 'Дата регистрации',
    dataIndex: 'date',
  },
  {
    title: 'Статус блокировки',
    dataIndex: 'isBlocked',
  },
  {
    title: 'Роли',
    dataIndex: 'roles',
  },
  {
    title: 'Номер телефона',
    dataIndex: 'phoneNumber',
  },
];

const UsersPage: FC = () => {
  return (
    <Table<User>
      columns={columns}
      rowKey={(record) => record.id}
      // dataSource={data}
      // pagination={tableParams.pagination}
      // loading={loading}
      // onChange={handleTableChange}
      bordered
    />
  );
};

export default UsersPage;
