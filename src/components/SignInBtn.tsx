import { googleSignIn } from "@/lib/authClient";
import { Button } from "./ui/button";

const SignInBtn = () => {
	return (
		<Button
			type="button"
			size="sm"
			onClick={googleSignIn}
			className="bg-green-600 hover:bg-green-700 shadow-md shadow-green-100"
		>
			Login
		</Button>
	);
};

export default SignInBtn;
