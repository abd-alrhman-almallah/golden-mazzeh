import AuthLayout from "../../components/Auth/AuthLayout";
import RegisterForm from "../../components/Auth/RegisterForm";
import { brand } from "../../data/brand";

function Register() {
  return (
    <AuthLayout
      title="Create Your Account"
      subtitle={`Join ${brand.name} to book your stay and enjoy a more personal experience.`}
    >
      <RegisterForm />
    </AuthLayout>
  );
}

export default Register;