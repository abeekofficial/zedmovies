export default function Skeleton() {
  return (
    <div className="flex w-72 flex-col gap-4">
      <div className="bg-gray-700 animate-pulse h-64 rounded-md w-full"></div>
      <div className="bg-gray-700 animate-pulse h-5 w-64 rounded-md text-center"></div>
    </div>
  );
}
