import { Content } from "./content";

type MainProps = {
  params: {
    contact_id: string;
  };
};

export default function Main(props: MainProps) {
  const { contact_id } = props.params;
  console.log({ contact_id });

  return <Content contact_id={contact_id} />;
}
