export default function ErrorFallback({ error, resetErrorBoundary }: any) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center bg-gray-100 p-6 text-center"
    >
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Oops! Something went wrong.
        </h2>
        <p className="text-gray-700 text-sm mb-6">
          {error.message || "An unexpected error occurred."}
        </p>
        <button
          onClick={resetErrorBoundary}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
