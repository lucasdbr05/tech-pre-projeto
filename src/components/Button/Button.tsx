

type propsButton = {
    isLoading: boolean;
    isValid: boolean;
    text: String;
}

export default function Button({ isLoading, isValid, text }: propsButton) {


    return (
        <button
            type="submit"
            disabled={!isValid || isLoading}
            className={`w-1/2 h-[12%] py-2 bg-primary rounded-md 
            transition-all ${!isValid || isLoading ? "opacity-50 cursor-not-allowed" : "hover:scale-105 duration-100 ease-in cursor-pointer"} `}>
            {isLoading ? (
                <div className="flex flex-row h-full w-full items-center justify-evenly">
                    <div
                        className="flex flex-row h-4 w-4 animate-spin rounded-full border-4 border-solid 
                    border-current border-e-transparent align-[-0.125em] text-surface 
                    motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                        role="status">
                    </div>
                    <p className="w-9/12 text-lg">Carregando...</p>
                </div>
            )
                :
                <>
                    {text}
                </>
            }
        </button>
    );

}