import { StaticImport } from "next/dist/shared/lib/get-img-props";

type Product = {
    title: String,
    imgUrl: string | StaticImport,
    price: number,
}

export default Product;