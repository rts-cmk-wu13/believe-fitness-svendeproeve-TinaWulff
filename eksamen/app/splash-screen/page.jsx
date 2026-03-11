import { getAllAssets } from "../lib/dal"

export default async function Slider() {

const assets = await getAllAssets()
console.log("assets:", assets)

return (
null
)

}