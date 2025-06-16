import react from "react";


interface SelectorProps {
    defaultTiles: string[];
    userDisplayedTiles: string[];
    addTileToUserDisplayedTiles: (tile: string) => void;
    closeSelector: () => void;
}


export default function TileSelector({defaultTiles, userDisplayedTiles, addTileToUserDisplayedTiles, closeSelector}: SelectorProps) {

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#1a1f3c] p-6 rounded-xl w-[300px] max-h-[80vh] overflow-y-auto text-white">
            <h2 className="text-lg mb-4">Add Widget</h2>
            <ul className="space-y-2">
              {defaultTiles.map(tile => {
                const isAdded = userDisplayedTiles.includes(tile);
                return (
                  <li
                    key={tile}
                    onClick={() => {
                      if (!isAdded) {
                          addTileToUserDisplayedTiles(tile)
                      }
                    }}
                    className={`cursor-pointer px-3 py-2 rounded ${
                      isAdded ? "bg-gray-700 text-gray-400 cursor-not-allowed" : "bg-white text-black hover:bg-green-200"
                    }`}
                  >
                    {tile}
                  </li>
                );
              })}
            </ul>
            <button onClick={closeSelector} className="mt-4 w-full bg-red-500 rounded py-2">
              Cancel
            </button>
          </div>
        </div>
    );
}
