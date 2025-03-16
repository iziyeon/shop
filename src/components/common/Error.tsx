interface ErrorProps {
  message: string;
}

const Error = ({ message }: ErrorProps) => (
  <div className="text-center text-red-500 my-10">
    <p className="text-xl font-bold">Error</p>
    <p>{message}</p>
  </div>
);

export default Error;
