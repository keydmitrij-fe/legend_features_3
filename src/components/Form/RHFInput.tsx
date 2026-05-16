import { Form, Input } from 'antd';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

interface RHFInputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  type?: 'password' | 'email' | 'tel';
}

const RHFInput = <T extends FieldValues>({
  label,
  name,
  control,
  type,
}: RHFInputProps<T>) => {
  const { field, fieldState } = useController({ name, control });

  return (
    <Form.Item
      label={label}
      validateStatus={fieldState.error ? 'error' : ''}
      name={String(name)}
      help={fieldState.error?.message}
    >
      <Input {...field} type={type} />
    </Form.Item>
  );
};

export default RHFInput;
