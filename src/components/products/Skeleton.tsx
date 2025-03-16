const Skeleton = () => {
  return (
    <div className="card bg-base-100 shadow-xl animate-pulse">
      <div className="px-4 pt-4">
        <div className="h-48 bg-gray-200 rounded-xl" />
      </div>
      <div className="card-body">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-6 bg-gray-200 rounded w-1/4 mt-2" />
        <div className="card-actions justify-end">
          <div className="h-10 bg-gray-200 rounded w-32" />
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
