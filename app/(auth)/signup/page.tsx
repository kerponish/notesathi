import Link from "next/link";
import RegisterFormZod from "../_components/SignupFormZod";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[#f5f2ff] flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-[#faf8ff] rounded-[32px] overflow-hidden shadow-sm grid md:grid-cols-2">
        {/* Left Side */}
        <div className="bg-[#f7f4ff] p-10 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#463acc] mb-10">
              Notesathi
            </h1>

            <div className="space-y-4">
              <h2 className="text-5xl font-bold leading-tight text-[#1B1B1F]">
                Elevate your <br />
                learning journey
              </h2>

              <p className="text-gray-500 leading-relaxed max-w-md">
                Join thousands of students and educators transforming the way
                they capture and share knowledge.
              </p>
            </div>
          </div>

          {}
          <div className="mt-10">
            <img
              src="/images/book.png"
              alt="Book"
              className="w-full max-w-md rounded-2xl"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="bg-white flex items-center justify-center p-10">
          <div className="w-full max-w-md">
            {/* Heading */}
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-[#1B1B1F]">
                Create an account
              </h2>

              <p className="text-gray-500 mt-2">Start Learning today</p>
            </div>

            {/* Google Button */}
            <button className="w-full border border-gray-300 rounded-xl py-3 flex items-center justify-center gap-3 hover:bg-gray-50 transition">
              <img src="/images/google.png" alt="Google" className="w-5 h-5" />

              <span className="font-medium text-gray-700">
                Continue with Google
              </span>
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-gray-200"></div>

              <span className="text-xs uppercase text-gray-400">Or Email</span>

              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Register Form */}
            <RegisterFormZod />

            {/* Login Link */}
            <p className="text-center text-sm text-gray-500 mt-8">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#5B4DFF] font-semibold hover:underline"
              >
                Log in
              </Link>
            </p>

            {/* Terms */}
            <p className="text-center text-xs text-gray-400 mt-6 leading-relaxed">
              By signing up, you agree to our{" "}
              <span className="underline cursor-pointer">Terms of Service</span>{" "}
              and{" "}
              <span className="underline cursor-pointer">Privacy Policy</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
