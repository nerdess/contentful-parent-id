import { useMemo } from 'react';
import { Paragraph, Spinner } from '@contentful/f36-components';
import { FieldAppSDK } from '@contentful/app-sdk';
import { /* useCMA, */ useAutoResizer, useSDK } from '@contentful/react-apps-toolkit';
import useGetLinkedToEntries from '../hooks/useGetLinkedToEntries';

const Result = ({ id, isLoading }: { id: string, isLoading: boolean }) => {

  const sdk = useSDK<FieldAppSDK>();

  if (!!id && id !== sdk.field.getValue()) {
    sdk.field.setValue(id);
  }

  if (!sdk.field.getValue() && isLoading) {
    return <Spinner variant="default" />
  }

  if (!!sdk.field.getValue()) {
    return <Paragraph>Linked entry id: {sdk.field.getValue()}</Paragraph>;
  };

  return <Paragraph>No linked entry found</Paragraph>


};

const Field = () => {

  useAutoResizer();
  const sdk = useSDK<FieldAppSDK>();
  const id = useMemo(() => sdk.ids.entry, [sdk.ids.entry]);

  const {
    isLoading,
    entries,
  } = useGetLinkedToEntries(id);

  const linkedToId = entries[0]?.sys.id;

  return (
    <Result id={linkedToId} isLoading={isLoading} />
  );

};

export default Field;
