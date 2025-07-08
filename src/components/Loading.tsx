import { ClipLoader } from "react-spinners";

function Loading(){
    return(
    <div className="flex items-center justify-center mt-5">
        <p><ClipLoader size={80} color="oklch(0.79 0.11 251.8)"/></p>
    </div>
    );
}

export default Loading;