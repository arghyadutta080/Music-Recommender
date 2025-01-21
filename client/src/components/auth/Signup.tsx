import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpForm, signUpSchema } from "../../lib/schema/auth";
import { Link, useNavigate } from "react-router-dom";
import { registerWithEmail } from "../../api";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpForm) => {
    setIsLoading(true);
    try {
      // Handle signup logic here
      const response = await registerWithEmail({
        username: data.username,
        password: data.password,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      navigate("/auth/login");
    }
  };
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-md w-full">
        {/* <h2 className="text-3xl font-bold text-center mb-8">
            Create an account
          </h2> */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              {...register("username")}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Create a password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              {...register("confirmPassword")}
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 text-black font-medium py-2 px-4 rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? "Creating account..." : "Signup for free"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="login"
            className="font-medium text-green-600 hover:text-green-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
