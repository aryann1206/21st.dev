
export const Landing = () => {
    return (
        <div className="flex h-screen bg-blue-900">

            <div className="w-[20%] bg-blue-300 p-4 flex flex-col gap-4">
                <input
                    placeholder="Describe your UI..."
                    className="w-full h-32 bg-black text-white px-4 py-2 rounded-md outline-none"
                />

                <button
                    onClick={() => alert("hii")}
                    className="bg-black text-white py-2 rounded-md hover:bg-gray-800 cursor-pointer transition"
                >
                    Generate your component
                </button>
                <p>try an example:</p>
                <p className="border rounded border-black bg-black text-white">mark a card </p>
                <p className="border rounded border-black">mark a login page </p>
                <p className="border rounded border-black">mark a landing page </p>
                <p className="border rounded border-black">mark a cart component </p>
            </div>

            <div className="w-[60%] bg-white text-center p-6 rounded shadow-md flex items-center justify-center">
                preview panel
            </div>

            <div className="w-[20%] bg-blue-200 flex items-center justify-center font-weight: 1000">
                Gallery-comming soon
            </div>

        </div>
    );
}
