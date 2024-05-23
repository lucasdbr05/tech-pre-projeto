import styles from "./input.module.css";
type props = {
    error: string | undefined;
    value: string;
    handleChange: any;
    name: string
};

export default function Input({ error, value, handleChange, name }: props) {


    return(
        <>  
        <div className="w-[58%] flex flex-row items-center justify-between">
            <h3>{name}:</h3>
            <h3 className="text-error text-sm py-1 min-h-[28px]">{error && error}</h3>
        </div>
            <input type={name === "senha" ? 'password' : name} name={name} onChange={handleChange}
                value={value} placeholder={`${name}: `}
                className={`${styles.input} border-2 outline-none 
                ${error && error ? "border-error focus:border-error"
                        : "border-primary focus:border-primary"} `} />
        </>

    );
}