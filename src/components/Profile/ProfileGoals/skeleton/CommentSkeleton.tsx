const CommentSkeleton = () => (
  <div className="border-t dark:border-gray-700 pt-3 animate-pulse">
    <div className="flex gap-2">
      <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full" />
      <div className="flex-1">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
          <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/4" />
        </div>
      </div>
    </div>
  </div>
);

export default CommentSkeleton;
