
const COLOR_PALETTE = [
  "bg-red-700 text-white",
  "bg-blue-700 text-white",
  "bg-green-700 text-white",
  "bg-purple-700 text-white",
  "bg-yellow-600 text-white",
  "bg-pink-600 text-white",
  "bg-indigo-700 text-white",
  "bg-gray-900 text-white",
  "bg-orange-600 text-white",
  "bg-teal-700 text-white",
  "bg-emerald-700 text-white",
  "bg-lime-700 text-white",
  "bg-sky-700 text-white",
  "bg-fuchsia-700 text-white",
  "bg-violet-700 text-white",
];

// Returns a consistent color from COLOR_PALETTE for a given category string.
export function getCategoryColor(category: string) {
  let hash = 0;
  for (let i = 0; i < category.length; i++) {
    hash = (hash + category.charCodeAt(i)) % COLOR_PALETTE.length;
  }
  return COLOR_PALETTE[hash];
}
