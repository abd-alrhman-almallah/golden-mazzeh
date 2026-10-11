import AuthLayout from "../../components/Auth/AuthLayout";
import LoginForm from "../../components/Auth/LoginForm";
import { brand } from "../../data/brand";

function Login() {
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle={`Sign in to your ${brand.name} account to manage your stays.`}
    >
      <LoginForm />
    </AuthLayout>
  );
}

export default Login;