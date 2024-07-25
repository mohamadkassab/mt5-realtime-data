import SignInForm from "../components/auth/SignInForm";
import LoginLayout from "../layouts/LoginLayout";
import LogoContainer from "../components/common/LogoContainer";

const SignIn = () => {
  return (
    <LoginLayout>
      <LogoContainer />
      <SignInForm />
    </LoginLayout>
  );
};
export default SignIn;
