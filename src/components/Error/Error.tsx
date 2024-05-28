

export default function Error({ error }: { error: String }){

    return(
        <div className="bg-error w-full rounded-lg text-lg font-semibold flex items-center justify-center">
            <h2>{error}</h2>
        </div>
    );
}

