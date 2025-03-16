import { useEffect } from 'react';

interface Props {
  title: string;
  description: string;
}

export const Helmet = ({ title, description }: Props) => {
  return (
    <>
      <title>{title} - React Shop</title>
      <meta name="description" content={description} />
    </>
  );
};

export default Helmet;
