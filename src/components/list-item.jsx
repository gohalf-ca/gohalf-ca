export default function List_Item(props){

    let name = props.name;
    let amount = props.amount;
    

    return(
        <div
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow"
    >

        <div className="flex justify-between items-center">
            <div className="space-y-1">
                <h3 className="font-medium text-gray-900 text-xl">{name}</h3>
            </div>
            <div className="flex items-center gap-3">
                <span className="text-2xl font-semibold">
                    $ {amount.toFixed(2)}
                </span>
                <div className="text-red-500 h-8 w-8 relative">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="absolute inset-0"
                    >
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                </div>
            </div>
        </div>
    </div>
    )
}