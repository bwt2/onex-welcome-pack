import image from "@/assets/login-1.jpg";

const LoginDecor = () => {
    return (
        <div className="absolute h-full w-1/2 top-0 left-0">
            <img src={image} className="w-full h-full object-cover"></img>
        </div>
    )
}

export default LoginDecor;