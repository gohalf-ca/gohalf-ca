export default function List_Item(props){

    const {name, amount, negative} = props;
    
    

    return(
        <div
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow"
    >

        <div className="flex justify-between items-center">
            <div className="space-y-1">
                <h3 className="font-medium text-gray-900 text-xl">{name}</h3>
            </div>
            <div className="flex items-center gap-3">
                <span className={negative ? "text-2xl font-semibold text-red-500": "text-2xl font-semibold text-green-500"}>
                  <span className="text-3xl">{negative ? "-" : "+"}</span>  $ {amount.toFixed(2)}
                </span>
            </div>
        </div>
    </div>
    )
}